'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _editor = require('./editor');

var _uiDragDrop = require('./dragDrop/ui-drag-drop');

var _detectBrowser = require('./detectBrowser');

var _urlHelpers = require('./urlHelpers');

var _examples = require('./examples');

var _options = require('./options');

var _errorDispatcher = require('./errorDispatcher');

var _errorDispatcher2 = _interopRequireDefault(_errorDispatcher);

var _version = require('../jscad/version');

var _processor = require('../jscad/processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License

var me = document.location.toString().match(/^file:/) ? 'web-offline' : 'web-online'; // toggleAutoReload

var browser = (0, _detectBrowser.detectBrowser)();

var showEditor = true;
var remoteUrl = './remote.pl?url=';
// var remoteUrl = './remote.php?url='
var gProcessor = null;
var gEditor = null;

var gMemFs = []; // associated array, contains file content in source gMemFs[i].{name,source}
var gCurrentFiles = []; // linear array, contains files (to read)

var state = {
  memFs: [],
  currentFiles: []
};

function init() {
  // Show all exceptions to the user: // WARNING !! this is not practical at dev time
  (0, _errorDispatcher2.default)();

  (0, _urlHelpers.getUrlParams)(document.URL);

  gProcessor = new _processor2.default(document.getElementById('viewerContext'));
  gEditor = (0, _editor.setUpEditor)(undefined, gProcessor);
  //FIXME: temporary hack

  var _setupDragDrop = (0, _uiDragDrop.setupDragDrop)(me, { gMemFs: gMemFs, gProcessor: gProcessor, gEditor: gEditor }),
      toggleAutoReload = _setupDragDrop.toggleAutoReload,
      reloadAllFiles = _setupDragDrop.reloadAllFiles;

  (0, _examples.createExamples)(me);
  (0, _options.createOptions)();
  (0, _options.getOptions)();

  (0, _examples.loadInitialExample)(me, { gMemFs: gMemFs, gProcessor: gProcessor, gEditor: gEditor });

  (0, _jquery2.default)('#menu').height((0, _jquery2.default)(window).height()); // initial height

  (0, _jquery2.default)('#editFrame').height((0, _jquery2.default)(window).height());
  (0, _jquery2.default)(window).resize(function () {
    // adjust the relevant divs
    (0, _jquery2.default)('#menu').height((0, _jquery2.default)(window).height());
    (0, _jquery2.default)('#menuHandle').css({ top: '45%' });
    (0, _jquery2.default)('#editFrame').height((0, _jquery2.default)(window).height());
  });
  setTimeout(function () {
    (0, _jquery2.default)('#menu').css('left', '-280px');
  }, 3000); // -- hide slide-menu after 3secs

  (0, _jquery2.default)('#menu').mouseleave(function () {
    (0, _jquery2.default)('#examples').css('height', 0);(0, _jquery2.default)('#examples').hide();
    (0, _jquery2.default)('#options').css('height', 0);(0, _jquery2.default)('#options').hide();
  });

  (0, _jquery2.default)('#editHandle').click(function () {
    if ((0, _jquery2.default)('#editFrame').width() === 0) {
      (0, _jquery2.default)('#editFrame').css('width', '40%');
      (0, _jquery2.default)('#editHandle').attr('src', 'imgs/editHandleIn.png');
    } else {
      (0, _jquery2.default)('#editFrame').css('width', '0px');
      (0, _jquery2.default)('#editHandle').attr('src', 'imgs/editHandleOut.png');
    }
  });

  // -- Examples
  (0, _jquery2.default)('#examplesTitle').click(function () {
    (0, _jquery2.default)('#examples').css('height', 'auto');
    (0, _jquery2.default)('#examples').show();
    (0, _jquery2.default)('#options').css('height', 0);
    (0, _jquery2.default)('#options').hide();
  });
  (0, _jquery2.default)('#examples').mouseleave(function () {
    (0, _jquery2.default)('#examples').css('height', 0);
    (0, _jquery2.default)('#examples').hide();
  });

  function onLoadExampleClicked(e) {
    if (showEditor) {
      // FIXME test for the element
      (0, _jquery2.default)('#editor').show();
    } else {
      (0, _jquery2.default)('#editor').hide();
    }
    var examplePath = e.currentTarget.dataset.path;
    (0, _examples.fetchExample)(examplePath, undefined, { gMemFs: gMemFs, gProcessor: gProcessor, gEditor: gEditor });
  }
  document.querySelectorAll('.example').forEach(function (element) {
    element.addEventListener('click', onLoadExampleClicked);
  });

  // -- Options
  (0, _jquery2.default)('#optionsTitle').click(function () {
    (0, _jquery2.default)('#options').css('height', 'auto');
    (0, _jquery2.default)('#options').show();
    (0, _jquery2.default)('#examples').css('height', 0);
    (0, _jquery2.default)('#examples').hide();
  });
  (0, _jquery2.default)('#options').mouseleave(function () {
    (0, _jquery2.default)('#options').css('height', 0);
    (0, _jquery2.default)('#options').hide();
  });
  // $('#optionsForm').submit(function() {
  //   // save to cookie
  //   $('#optionsForm').hide()
  //   return false
  // })
  (0, _jquery2.default)('#optionsForm').change(function () {
    // save to cookie
    saveOptions();
  });

  (0, _jquery2.default)('#plate').change(function () {
    if ((0, _jquery2.default)('#plate').val() == 'custom') {
      (0, _jquery2.default)('#customPlate').show();
    } else {
      (0, _jquery2.default)('#customPlate').hide();
    }
  });

  // about/ licence section
  (0, _jquery2.default)('.navlink.about').click(function (e) {
    (0, _jquery2.default)('#about').show();
    return false;
  });
  (0, _jquery2.default)('.okButton').click(function (e) {
    (0, _jquery2.default)('#about').hide();return false;
  });

  // dropzone section
  var dropZoneText = browser === 'chrome' && me === 'web-online' ? ', or folder with jscad files ' : '';
  document.getElementById('filedropzone_empty').innerHTML = 'Drop one or more supported files\n       ' + dropZoneText + '\n       here (see <a style=\'font-weight: normal\' href=\'https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide#support-of-include\' target=_blank>details</a>)\n       <br>or directly edit OpenJSCAD or OpenSCAD code using the editor.';

  document.getElementById('reloadAllFiles').onclick = reloadAllFiles;
  document.getElementById('autoreload').onclick = function (e) {
    var toggle = document.getElementById('autoreload').checked;
    toggleAutoReload(toggle);
  };

  // version number displays
  var footerContent = 'OpenJSCAD.org ' + _version.version + ', MIT License, get your own copy/clone/fork from <a target=_blank href="https://github.com/Spiritdude/OpenJSCAD.org">GitHub: OpenJSCAD</a>';
  document.getElementById('footer').innerHTML = footerContent;

  var versionText = 'Version ' + _version.version;
  document.getElementById('menuVersion').innerHTML = versionText;
  document.getElementById('aboutVersion').innerHTML = versionText;
}

document.addEventListener('DOMContentLoaded', function (event) {
  init();
});