var assert = require("assert");
var parser = require("../src/openscad-parser").parser;

function check(test, expected) {
    assert.equal(parse(test), expected);
}

function run(test){
    var f = new Function(parse(test));
    return f();
}

exports["test variable assigments"] = function() {
	check("x = 123;", "var x;\nx = 123;");
	check("x = 123.456;", "var x;\nx = 123.456;");
	check("x = 2e-1;", "var x;\nx = 0.2;");
	check("x = \"string\";", "var x;\nx = \"string\";");
	check("x = true;", "var x;\nx = true;");
	check("x = false;", "var x;\nx = false;");
}

exports["test echo"] = function() {
	check("echo(\"string\");", "console.log(\"ECHO: \" + \"string\");");
	check("echo(123);", "console.log(\"ECHO: \" + 123);");
	check("echo(123.456);", "console.log(\"ECHO: \" + 123.456);");
	check("echo(2e-1);", "console.log(\"ECHO: \" + 0.2);");
	check("echo(true);", "console.log(\"ECHO: \" + true);");
	check("echo(false);", "console.log(\"ECHO: \" + false);");
}

exports["test comments"] = function() {
	parse("// single line comment");
	parse("myvar = 10; // The rest of the line is a comment");
	parse("/* Multi-line comments \n can span multiple lines.*/");
}

exports["test operations"] = function() {
	check("x = 5 + 4;", "var x;\nx = 9;");
	check("x = 5 - 4;", "var x;\nx = 1;");
	check("x = 2 * 2;", "var x;\nx = 4;");
	check("x = 6 / 2;", "var x;\nx = 3;");
	check("x = 5 % 2;", "var x;\nx = 1;");

	check("x = 5 < 6;", "var x;\nx = true;");
	check("x = 5 <= 6;", "var x;\nx = true;");
	check("x = 5 > 6;", "var x;\nx = false;");
	check("x = 5 >= 6;", "var x;\nx = false;");
	check("x = true && true;", "var x;\nx = true;");
	check("x = true || false;", "var x;\nx = true;");


	check("x = +5;","var x;\nx = 5;");
	check("x = -5;","var x;\nx = -5;");
	check("x = +5 + -5;","var x;\nx = 0;");
}

exports["test Variables are set at compile-time, not run-time"] = function() {

	var openscad = "// The value of 'a' reflects only the last set value\na = 0;\necho(a);\na = 5;\necho(a);";

	var stdout = process.stdout;
	var stdoutLog = [];

	install_hook_to(stdout);

	stdout.hook('write', function(string, encoding, fd, write) {
	    stdoutLog.push(string);
	});
	try {
		run(openscad);
		assert.equal(stdoutLog.join(), "ECHO: 5\n,ECHO: 5\n");
	} finally {
		stdout.unhook('write');
	}


}

/* Useful function to temporarily override a method - used to record stdout
  via: http://stackoverflow.com/a/9624028/188624
*/
var install_hook_to = function(obj) {

    if (obj.hook || obj.unhook) {
        throw new Error('Object already has properties hook and/or unhook');
    }

    obj.hook = function(_meth_name, _fn, _is_async) {
        var self = this,
            meth_ref;

        // Make sure method exists
        if (! (Object.prototype.toString.call(self[_meth_name]) === '[object Function]')) {
            throw new Error('Invalid method: ' + _meth_name);
        }

        // We should not hook a hook
        if (self.unhook.methods[_meth_name]) {
            throw new Error('Method already hooked: ' + _meth_name);
        }

        // Reference default method
        meth_ref = (self.unhook.methods[_meth_name] = self[_meth_name]);

        self[_meth_name] = function() {
            var args = Array.prototype.slice.call(arguments);

            // Our hook should take the same number of arguments
            // as the original method so we must fill with undefined
            // optional args not provided in the call
            while (args.length < meth_ref.length) {
                args.push(undefined);
            }

            // Last argument is always original method call
            args.push(function() {
                var args = arguments;

                if (_is_async) {
                    process.nextTick(function() {
                        meth_ref.apply(self, args);
                    });
                } else {
                    meth_ref.apply(self, args);
                }
            });

            _fn.apply(self, args);
        };
    };

    obj.unhook = function(_meth_name) {
        var self = this,
            ref  = self.unhook.methods[_meth_name];

        if (ref) {
            self[_meth_name] = self.unhook.methods[_meth_name];
            delete self.unhook.methods[_meth_name];
        } else {
            throw new Error('Method not hooked: ' + _meth_name);
        }
    };

    obj.unhook.methods = {};
};

if(module === require.main) require("test").run(exports);
