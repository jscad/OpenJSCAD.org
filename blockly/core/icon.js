/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Object representing an icon on a block.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Icon');

goog.require('goog.dom');


/**
 * Class for an icon.
 * @param {Blockly.Block} block The block associated with this icon.
 * @constructor
 */
Blockly.Icon = function(block) {
  this.block_ = block;
};

/**
 * Does this icon get hidden when the block is collapsed.
 */
Blockly.Icon.prototype.collapseHidden = true;

/**
 * Height and width of icons.
 */
Blockly.Icon.prototype.SIZE = 17;

/**
 * Icon in base64 format.
 * @private
 */
Blockly.Icon.prototype.png_ = '';

/**
 * Bubble UI (if visible).
 * @type {Blockly.Bubble}
 * @private
 */
Blockly.Icon.prototype.bubble_ = null;

/**
 * Absolute X coordinate of icon's center.
 * @private
 */
Blockly.Icon.prototype.iconX_ = 0;

/**
 * Absolute Y coordinate of icon's centre.
 * @private
 */
Blockly.Icon.prototype.iconY_ = 0;

/**
 * Create the icon on the block.
 */
Blockly.Icon.prototype.createIcon = function() {
  if (this.iconGroup_) {
    // Icon already exists.
    return;
  }
  /* Here's the markup that will be generated:
  <g class="blocklyIconGroup">
    <image width="17" height="17"
     xlink:href="data:image/png;base64,iVBOR..."></image>
  </g>
  */
  this.iconGroup_ = Blockly.createSvgElement('g',
      {'class': 'blocklyIconGroup'}, null);
  var img = Blockly.createSvgElement('image',
      {'width': this.SIZE, 'height': this.SIZE},
      this.iconGroup_);
  img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.png_);

  this.block_.getSvgRoot().appendChild(this.iconGroup_);
  Blockly.bindEvent_(this.iconGroup_, 'mouseup', this, this.iconClick_);
  this.updateEditable();
};

/**
 * Dispose of this icon.
 */
Blockly.Icon.prototype.dispose = function() {
  // Dispose of and unlink the icon.
  goog.dom.removeNode(this.iconGroup_);
  this.iconGroup_ = null;
  // Dispose of and unlink the bubble.
  this.setVisible(false);
  this.block_ = null;
};

/**
 * Add or remove the UI indicating if this icon may be clicked or not.
 */
Blockly.Icon.prototype.updateEditable = function() {
  if (this.block_.isInFlyout || !this.block_.isEditable()) {
    Blockly.addClass_(/** @type {!Element} */ (this.iconGroup_),
                      'blocklyIconGroupReadonly');
  } else {
    Blockly.removeClass_(/** @type {!Element} */ (this.iconGroup_),
                         'blocklyIconGroupReadonly');
  }
};

/**
 * Is the associated bubble visible?
 * @return {boolean} True if the bubble is visible.
 */
Blockly.Icon.prototype.isVisible = function() {
  return !!this.bubble_;
};

/**
 * Clicking on the icon toggles if the bubble is visible.
 * @param {!Event} e Mouse click event.
 * @private
 */
Blockly.Icon.prototype.iconClick_ = function(e) {
  if (Blockly.dragMode_ == 2) {
    // Drag operation is concluding.  Don't open the editor.
    return;
  }
  if (!this.block_.isInFlyout && !Blockly.isRightButton(e)) {
    this.setVisible(!this.isVisible());
  }
};

/**
 * Change the colour of the associated bubble to match its block.
 */
Blockly.Icon.prototype.updateColour = function() {
  if (this.isVisible()) {
    var hexColour = Blockly.makeColour(this.block_.getColour());
    this.bubble_.setColour(hexColour);
  }
};

/**
 * Render the icon.
 * @param {number} cursorX Horizontal offset at which to position the icon.
 * @return {number} Horizontal offset for next item to draw.
 */
Blockly.Icon.prototype.renderIcon = function(cursorX) {
  if (this.collapseHidden && this.block_.isCollapsed()) {
    this.iconGroup_.setAttribute('display', 'none');
    return cursorX;
  }
  this.iconGroup_.setAttribute('display', 'block');

  var TOP_MARGIN = 5;
  var width = this.SIZE;
  if (this.block_.RTL) {
    cursorX -= width;
  }
  this.iconGroup_.setAttribute('transform',
      'translate(' + cursorX + ',' + TOP_MARGIN + ')');
  this.computeIconLocation();
  if (this.block_.RTL) {
    cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
  } else {
    cursorX += width + Blockly.BlockSvg.SEP_SPACE_X;
  }
  return cursorX;
};

/**
 * Notification that the icon has moved.  Update the arrow accordingly.
 * @param {number} x Absolute horizontal location.
 * @param {number} y Absolute vertical location.
 */
Blockly.Icon.prototype.setIconLocation = function(x, y) {
  this.iconX_ = x;
  this.iconY_ = y;
  if (this.isVisible()) {
    this.bubble_.setAnchorLocation(x, y);
  }
};

/**
 * Notification that the icon has moved, but we don't really know where.
 * Recompute the icon's location from scratch.
 */
Blockly.Icon.prototype.computeIconLocation = function() {
  // Find coordinates for the centre of the icon and update the arrow.
  var blockXY = this.block_.getRelativeToSurfaceXY();
  var iconXY = Blockly.getRelativeXY_(this.iconGroup_);
  var newX = blockXY.x + iconXY.x + this.SIZE / 2;
  var newY = blockXY.y + iconXY.y + this.SIZE / 2;
  if (newX !== this.iconX_ || newY !== this.iconY_) {
    this.setIconLocation(newX, newY);
  }
};

/**
 * Returns the center of the block's icon relative to the surface.
 * @return {!Object} Object with x and y properties.
 */
Blockly.Icon.prototype.getIconLocation = function() {
  return {x: this.iconX_, y: this.iconY_};
};
