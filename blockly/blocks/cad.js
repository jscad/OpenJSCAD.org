'use strict';

goog.provide('Blockly.Blocks.cad');

goog.require('Blockly.Blocks');


Blockly.Blocks['cad_sphere'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Sphere");
        this.appendValueInput("Radius")
            .setCheck("Number")
            .appendField("Radius");
        this.appendValueInput("Center")
            .setCheck("Boolean")
            .appendField("Center")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "Center");
        this.setPreviousStatement(true, 'cad_union');
        this.setNextStatement(true, 'cad_sphere');
        this.setColour(20);
        this.setTooltip('Create a sphere');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['cad_translate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Translate");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("X");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("Y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("Z");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ['cad_sphere', 'cad_cube']);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_scale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Scale");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("X");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("Y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("Z");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ['cad_sphere', 'cad_cube']);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_subtract'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Subtract");
        this.appendStatementInput("Object")
            .appendField("Object");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, 'cad_cube');
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_union'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Union");
        this.appendStatementInput("Object")
            .appendField("Shape");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ['cad_sphere', 'cad_cube']);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['cad_cube'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Cube");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("X");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("Y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("Z");
        this.appendValueInput("Center")
            .setCheck("Boolean")
            .appendField("Center")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "Center");
        this.setPreviousStatement(true, ['cad_union', 'cad_subtract']);
        this.setNextStatement(true, 'cad_sphere');
        this.setColour(20);
        this.setTooltip('Create a cube');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_rotate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Rotate")
            .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "Axis");
        this.appendValueInput("NAME")
            .appendField("Angle")
            .appendField(new Blockly.FieldAngle("0"), "Angle");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('rotate the shape along the x, y, or z axis.');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ['cad_sphere', 'cad_cube']);
        this.setHelpUrl('http://www.example.com/');
    }
};