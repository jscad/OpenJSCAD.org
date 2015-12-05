Blockly.JavaScript['cad_model'] = function (block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME').trim();
    
    if (statements_name[0] === ".") {
        statements_name = statements_name.substr(1);
    }

    var code = "function main() {\n    return " + statements_name + ";\n}\n";
    return code;
};

Blockly.JavaScript['cad_cube'] = function (block) {
    var valueX = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var valueY = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var valueZ = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var checkbox_center = block.getFieldValue('Center') === 'TRUE';
    var code = "cube({size:[" + (valueX === "" ? 1 : valueX) + ", " + (valueY === "" ? 1 : valueY) + ", " + (valueZ === "" ? 1 : valueZ) + "], center: " + checkbox_center + "})";

    return code;
};

Blockly.JavaScript['cad_sphere'] = function (block) {
    var text_radius = block.getFieldValue('Radius');
    var radius = Blockly.JavaScript.valueToCode(block, 'Radius', Blockly.JavaScript.ORDER_ATOMIC);

    var checkbox_center = block.getFieldValue('Center') === 'TRUE';

    if (radius !== "") {
        text_radius = radius;
    }

    var code = "sphere({r:" + (text_radius === "" ? 1 : text_radius) + ", center:" + checkbox_center + "})";

    return code;
};

Blockly.JavaScript['cad_translate'] = function (block) {
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var text_x = block.getFieldValue('X');
    var text_y = block.getFieldValue('Y');
    var text_z = block.getFieldValue('Z');
    var code = "\n.translate([" + (value_x === "" ? 0 : value_x) + ", " + (value_y === "" ? 0 : value_y) + ", " + (value_z === "" ? 0 : value_z) + "])";

    //if (block.childBlocks_.length === 0 &&)
    return code;
};

Blockly.JavaScript['cad_scale'] = function (block) {
    var text_x = block.getFieldValue('X');
    var text_y = block.getFieldValue('Y');
    var text_z = block.getFieldValue('Z');
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "\n.scale([" + (text_x === "" ? 1 : text_x) + ", " + (text_y === "" ? 1 : text_y) + ", " + (text_z === "" ? 1 : text_z) + "])";
    return code;
};

Blockly.JavaScript['cad_rotate'] = function(block) {
    var dropdown_axis = block.getFieldValue('Axis');
    var angle_angle = block.getFieldValue('Angle');

    return "\n.rotate" + dropdown_axis + "(" + angle_angle + ")";
};
 
Blockly.JavaScript['cad_subtract'] = function (block) {
    var statements_object = Blockly.JavaScript.statementToCode(block, 'Object');
    var code = "\n.subtract(" + statements_object + ")";
    return code;
};

Blockly.JavaScript['cad_union'] = function (block) {
    var checkbox_toplevel = block.getFieldValue('TopLevel') === 'TRUE';

    //if (block.childBlocks_.length === 1 && block.childBlocks_[0].type === "controls_repeat_ext") {
    //    var arrayFunction = "function(){" + 
    //}
    var statements_object = Blockly.JavaScript.statementToCode(block, 'Object');

    return ".union(" + statements_object + ")";
};

Blockly.JavaScript['cad_cylinder'] = function (block) {
    var text_radius = block.getFieldValue('radius');
    var value_radius = Blockly.JavaScript.valueToCode(block, 'Radius', Blockly.JavaScript.ORDER_ATOMIC);
    var text_height = block.getFieldValue('Height');
    var value_height = Blockly.JavaScript.valueToCode(block, 'Height', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "cylinder({r:" + text_radius + ", h:" + text_height + "})";

    return code;
};

Blockly.JavaScript['cad_color'] = function (block) {
    var colour_color = block.getFieldValue('Color');


    var value_color = Blockly.JavaScript.valueToCode(block, 'Color', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_shape = Blockly.JavaScript.statementToCode(block, 'Shape');
    // TODO: Assemble JavaScript into code variable.

    var red = parseInt(colour_color.substr(1, 2), 16) / 255;
    var green = parseInt(colour_color.substr(3, 2), 16) / 255;
    var blue = parseInt(colour_color.substr(5, 2), 16) / 255;
    var rgb = [red, green, blue];

    var code = "color([" + red + ", " + green +  ", " + blue + "], " + statements_shape + ")";
    return code;
};

Blockly.JavaScript['cad_intersect'] = function (block) {
    var statements_shape = Blockly.JavaScript.statementToCode(block, 'Shape');
    // TODO: Assemble JavaScript into code variable.
    var code = "\n.intersect(" + statements_shape + ")";
    return code;
};

Blockly.JavaScript['cad_text'] = function (block) {
    var text_text = block.getFieldValue('Text');
    var value_width = Blockly.JavaScript.valueToCode(block, 'Width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'Height', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "extrudeText(\"" + text_text + "\", " + value_width + ", " + value_height + ")";

    return code;
};

Blockly.JavaScript['cad_cone'] = function (block) {
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = "cylinder({r1: " + value_radius + ", r2: 0, h: " + value_height + "})";

    return code;
};

Blockly.JavaScript['cad_torus'] = function (block) {
    var value_ri = Blockly.JavaScript.valueToCode(block, 'ri', Blockly.JavaScript.ORDER_ATOMIC);
    var value_ro = Blockly.JavaScript.valueToCode(block, 'ro', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "torus({ ri: " + (value_ri === "" ? 1 : value_ri) + ", ro: " + (value_ro === "" ? 4 : value_ro) + "})";
    return code;
};

Blockly.JavaScript['cad_linear_extrude'] = function (block) {
    var text_twist = block.getFieldValue('twist');

    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var value_shape = Blockly.JavaScript.valueToCode(block, 'shape', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "linear_extrude({height: " + (value_height === "" ? 1 : value_height) + ", twist: " + (text_twist === "" ? 0 : text_twist) + "}, " + (value_shape === "" ? "square()" : value_shape) + ")";

    return code;
};

Blockly.JavaScript['cad_rectangle'] = function (block) {
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "square([" + (value_width === "" ? 1 : value_width) + ", " + (value_height === "" ? 1 : value_height) + "])";

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['cad_circle'] = function (block) {
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.

    var code = "circle({r: " + (value_radius === "" ? 1 : value_radius) + "})";

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['cad_encapsulate'] = function (block) {
    var statements_child = Blockly.JavaScript.statementToCode(block, 'Child');
    // TODO: Assemble JavaScript into code variable.
    var code = "function(){ return "  + statements_child + ";}()";
    return code;
};

Blockly.JavaScript['cad_array'] = function (block) {
    var variable_index = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Index'), Blockly.Variables.NAME_TYPE);
    var value_index = Blockly.JavaScript.valueToCode(block, 'Index', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_contents = Blockly.JavaScript.statementToCode(block, 'Contents');
    // TODO: Assemble JavaScript into code variable.
    var code =
        "function() {\n"+
        "    var array = [];\n" +
        "    for (" + variable_index + " = 1; " + variable_index + " <= " + value_index + "; " + variable_index + "++) {\n" +
        "        array.push(" + statements_contents + ");\n" +
        "    }\n" + 
        "    return array;\n" + 
        "}()";
    return code;
};