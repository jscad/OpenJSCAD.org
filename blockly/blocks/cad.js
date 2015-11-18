﻿'use strict';

goog.provide('Blockly.Blocks.cad');

goog.require('Blockly.Blocks');


Blockly.Blocks['cad_sphere'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("sphere");
        this.appendValueInput("Radius")
            .setCheck("Number")
            .appendField("radius")
            .appendField(new Blockly.FieldTextInput("10"), "Radius");
        this.appendValueInput("Center")
            .setCheck("Boolean")
            .appendField("center")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "Center");
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ['cad_sphere', 'cad_cube']);
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ['cad_sphere', 'cad_cube']);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_subtract'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("subtract");
        this.appendStatementInput("Object")
            .appendField("shape");
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
            .appendField("union");
        this.appendStatementInput("Object")
            .appendField("shape");
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
            .appendField("rotate")
            .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "Axis");
        this.appendValueInput("NAME")
            .appendField("angle")
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
        this.setPreviousStatement(true, ['cad_union', 'cad_subtract']);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};