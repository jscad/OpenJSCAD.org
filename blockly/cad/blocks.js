'use strict';

goog.provide('Blockly.Blocks.cad');

goog.require('Blockly.Blocks');

Blockly.Blocks['cad_text'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("text");
        this.appendValueInput("TextValue")
            .setCheck("String")
            .appendField(new Blockly.FieldTextInput("ABC"), "TextString");
        this.appendValueInput("Width")
            .setCheck("Number")
            .appendField("width")
            .appendField(new Blockly.FieldTextInput("2"), "width");
        this.appendValueInput("Height")
            .setCheck("Number")
            .appendField("height")
            .appendField(new Blockly.FieldTextInput("2"), "height");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_cube'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cube");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x")
            .appendField(new Blockly.FieldTextInput("10"), "X");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y")
            .appendField(new Blockly.FieldTextInput("10"), "Y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z")
            .appendField(new Blockly.FieldTextInput("10"), "Z");
        this.appendValueInput("Center")
            .setCheck("Boolean")
            .appendField("center")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "Center");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('Create a cube');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_sphere'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("sphere");
        this.appendValueInput("Radius")
            .setCheck("Number")
            .appendField("radius")
            .appendField(new Blockly.FieldTextInput("5"), "Radius");
        this.appendValueInput("Center")
            .setCheck("Boolean")
            .appendField("center")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "Center");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('Create a sphere');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_cylinder'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cylinder");
        this.appendValueInput("Radius")
            .setCheck("Number")
            .appendField("radius")
            .appendField(new Blockly.FieldTextInput("10"), "radius");
        this.appendValueInput("Height")
            .setCheck("Number")
            .appendField("height")
            .appendField(new Blockly.FieldTextInput("10"), "Height");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_cone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cone");
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("radius");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_torus'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("torus");
        this.appendValueInput("ri")
            .setCheck("Number")
            .appendField("inner radius");
        this.appendValueInput("ro")
            .setCheck("Number")
            .appendField("outer adius");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setColour(20);
        this.setTooltip('Create a torus (defaults: inner radius=1, outer radius=4)');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_linear_extrude'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("linear extrude");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.appendValueInput("twist")
            .setCheck("Number")
            .appendField("twist")
            .appendField(new Blockly.FieldAngle("0"), "Angle");
        this.appendValueInput("shape")
            .setCheck("Shape")
            .appendField("shape");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_translate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("translate");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x")
            .appendField(new Blockly.FieldTextInput("0"), "X");
        this.appendValueInput( "Y")
            .setCheck("Number")
            .appendField("y")
            .appendField(new Blockly.FieldTextInput("0"), "Y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z")
            .appendField(new Blockly.FieldTextInput("0"), "Z");
        this.setColour(65);
        this.setPreviousStatement(true, ["Operation", "Transform", "Solid"]);
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_scale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("scale");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x")
            .appendField(new Blockly.FieldTextInput("1"), "X");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y")
            .appendField(new Blockly.FieldTextInput("1"), "Y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z")
            .appendField(new Blockly.FieldTextInput("1"), "Z");
        this.setColour(65);
        this.setPreviousStatement(true, ["Operation", "Transform", "Solid"]);
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_subtract'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("subtract");
        this.appendStatementInput("Object");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_union'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("union");
        this.appendStatementInput("Object");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_intersect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("intersect");
        this.appendStatementInput("Shape");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_rotate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("rotate")
            .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "Axis");
        this.appendValueInput("NAME")
            .appendField("angle")
            .appendField(new Blockly.FieldAngle("0"), "Angle");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('rotate the shape along the x, y, or z axis.');
        this.setPreviousStatement(true, ["Operation", "Transform", "Solid"]);
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['cad_color'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("color");
        this.appendValueInput("Color")
            .appendField("value")
            .appendField(new Blockly.FieldColour("#ff0000"), "Color");
        this.appendStatementInput("Shape")
            .setCheck(["Solid", "Operation", "Modifier"]);
        this.setPreviousStatement(true, "Modifier");
        this.setNextStatement(true, "Transform");
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
 

Blockly.Blocks['cad_rectangle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("rectangle");
        this.appendValueInput("width")
            .setCheck("Number")
            .appendField("width");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.setOutput(true, "Shape");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_circle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("circle");
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("radius");
        this.setOutput(true, "Shape");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};