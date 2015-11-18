Blockly.JavaScript['cad_cube'] = function (block) {
    var valueX = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var valueY = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var valueZ = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var checkbox_center = block.getFieldValue('Center') == 'TRUE';
    var code = "cube({size:[" + (valueX === "" ? 1 : valueX) + ", " + (valueY === "" ? 1 : valueY) + ", " + (valueZ === "" ? 1 : valueZ) + "], center: " + checkbox_center + "})";

    return code;
};

Blockly.JavaScript['cad_sphere'] = function (block) {
    var radius = Blockly.JavaScript.valueToCode(block, 'Radius', Blockly.JavaScript.ORDER_ATOMIC);
    var checkbox_center = block.getFieldValue('Center') == 'TRUE';

    var code = "sphere({r:" + (radius === "" ? 1 : radius) + ", center:" + checkbox_center + "})";

    return code;
};

Blockly.JavaScript['cad_translate'] = function (block) {
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "\n.translate([" + (value_x === "" ? 0 : value_x) + ", " + (value_y === "" ? 0 : value_y) + ", " + (value_z === "" ? 0 : value_z) + "])";
    return code;
};

Blockly.JavaScript['cad_scale'] = function (block) {
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "\n.scale([" + (value_x === "" ? 1 : value_x) + ", " + (value_y === "" ? 1 : value_y) + ", " + (value_z === "" ? 1 : value_z) + "])";
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