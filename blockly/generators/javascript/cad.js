Blockly.JavaScript['cad_cube'] = function (block) {
    var textX = block.getFieldValue('X');
    var textY = block.getFieldValue('Y');
    var textZ = block.getFieldValue('Z');
    var valueX = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var valueY = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var valueZ = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var checkbox_center = block.getFieldValue('Center') == 'TRUE';
    var code = "cube({size:[" + (textX === "" ? 1 : textX) + ", " + (textY === "" ? 1 : textY) + ", " + (textZ === "" ? 1 : textZ) + "], center: " + checkbox_center + "})";

    return code;
};

Blockly.JavaScript['cad_sphere'] = function (block) {
    var text_radius = block.getFieldValue('Radius');
    var radius = Blockly.JavaScript.valueToCode(block, 'Radius', Blockly.JavaScript.ORDER_ATOMIC);
    var checkbox_center = block.getFieldValue('Center') == 'TRUE';

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
    var code = "\n.translate([" + (text_x === "" ? 0 : text_x) + ", " + (text_y === "" ? 0 : text_y) + ", " + (text_z === "" ? 0 : text_z) + "])";
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
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    return "\n.rotate" + dropdown_axis + "(" + angle_angle + ")";
};
 


Blockly.JavaScript['cad_subtract'] = function (block) {
    var statements_object = Blockly.JavaScript.statementToCode(block, 'Object');
    var code = "\n.subtract(" + statements_object + ")";
    return code;
};

Blockly.JavaScript['cad_union'] = function (block) {
    var statements_object = Blockly.JavaScript.statementToCode(block, 'Object');
    var code = "\n.union(" + statements_object + ")";
    return code;
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
    var text_textstring = block.getFieldValue('TextString');
    var value_textvalue = Blockly.JavaScript.valueToCode(block, 'TextValue', Blockly.JavaScript.ORDER_ATOMIC);
    var text_width = block.getFieldValue('width');
    var value_width = Blockly.JavaScript.valueToCode(block, 'Width', Blockly.JavaScript.ORDER_ATOMIC);
    var text_height = block.getFieldValue('height');
    var value_height = Blockly.JavaScript.valueToCode(block, 'Height', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "extrudeText('" + text_textstring + "', " + text_width + ", " + text_height + ")";
    return code;
};