import $ from 'jquery'
import { setUpEditor } from './ui-editor'
import { detectBrowser } from './detectBrowser'
import AlertUserOfUncaughtExceptions from './errorDispatcher'
import { createExamples } from './examples'

const me = document.location.toString().match(/^file:/) ? 'web-offline' : 'web-online'

const browser = detectBrowser()

var docUrl = undefined
var showEditor = true
var remoteUrl = './remote.pl?url='
// var remoteUrl = './remote.php?url='
var gProcessor = null
var gEditor = null
var gMemFs

function init () {
  docUrl = document.URL
  // Show all exceptions to the user:
  AlertUserOfUncaughtExceptions()
  // gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"))
  gEditor = setUpEditor()
// setupDragDrop()

  createExamples(me, {gMemFs, showEditor, gProcessor})
  //createOptions()
  //getOptions()


  $('#menu').height($(window).height()) // initial height

  $('#editFrame').height($(window).height())
  $(window).resize(function () { // adjust the relevant divs
    $('#menu').height($(window).height())
    $('#menuHandle').css({top: '45%'})
    $('#editFrame').height($(window).height())
  })
  setTimeout(function () {$('#menu').css('left', '-280px');}, 3000); // -- hide slide-menu after 3secs

  $('#menu').mouseleave(function () {
    $('#examples').css('height', 0); $('#examples').hide()
    $('#options').css('height', 0); $('#options').hide()
  })

  $('#editHandle').click(function () {
    if ($('#editFrame').width() == 0) {
      $('#editFrame').css('width', '40%')
      $('#editHandle').attr('src', 'imgs/editHandleIn.png')
    } else {
      $('#editFrame').css('width', '0px')
      $('#editHandle').attr('src', 'imgs/editHandleOut.png')
    }
  })

  // -- Examples
  $('#examplesTitle').click(function () {
    $('#examples').css('height', 'auto')
    $('#examples').show()
    $('#options').css('height', 0)
    $('#options').hide()
  })
  $('#examples').mouseleave(function () {
    $('#examples').css('height', 0)
    $('#examples').hide()
  })

  // -- Options
  $('#optionsTitle').click(function () {
    $('#options').css('height', 'auto')
    $('#options').show()
    $('#examples').css('height', 0)
    $('#examples').hide()
  })
  $('#options').mouseleave(function () {
    $('#options').css('height', 0)
    $('#options').hide()
  })
  // $('#optionsForm').submit(function() {
  //   // save to cookie
  //   $('#optionsForm').hide()
  //   return false
  // })
  $('#optionsForm').change(function () {
    // save to cookie
    saveOptions()
  })

  $('#plate').change(function () {
    if ($('#plate').val() == 'custom') {
      $('#customPlate').show()
    } else {
      $('#customPlate').hide()
    }
  })
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})

function loadExample (me) {
  if (me === 'web-online') { // we are online, fetch first example
    params = {}
    docTitle = ''
    if ((!docUrl.match(/#(https?:\/\/\S+)$/)) && (!docUrl.match(/#(examples\/\S+)$/))) {
      if (possibleParams = docUrl.split('&')) {
        // console.log(possibleParams)
        for (i = 0; i < possibleParams.length; ++i) {
          // console.log("looping over: "+possibleParams[i])
          if (match = possibleParams[i].match(/^.*#?param\[([^\]]+)\]=(.*)$/i)) {
            // console.log("matched parameter: key="+decodeURIComponent(match[1])+", val="+decodeURIComponent(match[2])+"")
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
          }
          else if (match = possibleParams[i].match(/^.*#?showEditor=false$/i)) {
            // console.log("not showing editor.")
            showEditor = false
            $('#editor').hide()
          }
          else if (match = possibleParams[i].match(/^.*#?fetchUrl=(.*)$/i)) {
            // console.log("matched fetchUrl="+match[1])
            urlParts = document.URL.match(/^([^#]+)#/)
            // derive an old-style URL for compatibility's sake
            docUrl = urlParts[1] + '#' + decodeURIComponent(match[1])
          }
          else if (match = possibleParams[i].match(/^.*#?title=(.*)$/i)) {
            // console.log("matched title="+decodeURIComponent(match[1]))
            docTitle = decodeURIComponent(match[1])
          }
        }
      // console.log(params,docUrl,docTitle)
      }
    }
    if (docUrl.match(/#(https?:\/\/\S+)$/)) { // remote file referenced, e.g. http://openjscad.org/#http://somewhere/something.ext
      var u = RegExp.$1
      var xhr = new XMLHttpRequest()
      xhr.open('GET', remoteUrl + u, true)
      if (u.match(/\.(stl|gcode)$/i)) {
        xhr.overrideMimeType('text/plain; charset=x-user-defined'); // our pseudo binary retrieval (works with Chrome)
      }
      gProcessor.setStatus('Fetching ' + u + " <img id=busy src='imgs/busy.gif'>")
      xhr.onload = function () {
        var data = JSON.parse(this.responseText)
        fetchExample(data.file, data.url)
        document.location = docUrl.replace(/#.*$/, '#'); // this won't reload the entire web-page
      }
      xhr.send()
    }
    else if (docUrl.match(/#(examples\/\S+)$/)) { // local example, e.g. http://openjscad.org/#examples/example001.jscad
      var fn = RegExp.$1
      fetchExample(fn)
      document.location = docUrl.replace(/#.*$/, '#')
    } else {
      // load content from local storage if found
      if (localStorage.editorContent && localStorage.editorContent.length) {
        putSourceInEditor(localStorage.editorContent, 'MyDesign.jscad')
        gProcessor.setJsCad(localStorage.editorContent, 'MyDesign.jscad')
      } else {
        fetchExample('examples/' + ex[0].file)
      }
    }
  } else {
    // load content from local storage if found
    if (localStorage.editorContent && localStorage.editorContent.length) {
      putSourceInEditor(localStorage.editorContent, 'MyDesign.jscad')
      gProcessor.setJsCad(localStorage.editorContent, 'MyDesign.jscad')
    } else {
      gProcessor.setJsCad(getSourceFromEditor(), 'example.jscad')
    }
  }
}
