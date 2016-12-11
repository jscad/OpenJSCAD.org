import $ from 'jquery'
import { setUpEditor } from './ui-editor'
import { detectBrowser } from './detectBrowser'
import { createExamples } from './examples'
import { createOptions, getOptions } from './options'
import AlertUserOfUncaughtExceptions from './errorDispatcher'


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
  createOptions()
  getOptions()

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

  // about/ licence section
  $('.navlink').click(function (e) {
    $('#about').show()
    return false
  })
  $('.okButton').click(function (e) {
    $('#about').hide(); return false;
  })
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})
