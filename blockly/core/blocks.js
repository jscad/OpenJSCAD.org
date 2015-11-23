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
 * @fileoverview Name space for the Blocks singleton.
 * @author spertus@google.com (Ellen Spertus)
 */
'use strict';

goog.provide('Blockly.Blocks');


/**
 * Unique ID counter for created blocks.
 * @private
 */
Blockly.Blocks.uidCounter_ = 0;

/**
 * Generate a unique ID.  This will be locally or globally unique, depending on
 * whether we are in single user or realtime collaborative mode.
 * @return {string}
 */
Blockly.Blocks.genUid = function() {
  var uid = (++Blockly.Blocks.uidCounter_).toString();
  if (Blockly.Realtime.isEnabled()) {
    return Blockly.Realtime.genUid(uid);
  } else {
    return uid;
  }
};
