const html = require('bel')

/* if (me === 'web-online') {
  var wrap = 26
  var colp = 100 / Math.floor(examples.length / wrap + 1) + '%'
  var src = '<table width=100%><tr><td widthx=' + colp + ' valign=top>'
  for (var i = 0; i < examples.length; i++) {
    if (examples[i].wrap) {
      src += '</td><td class="examplesSeparator" widthx=' + colp + ' valign=top>'
    }
    if (examples[i].spacing) src += '<p/>'
    src += `<li><a class='example' data-path=${'examples/' + examples[i].file} href='#'> + ${examples[i].title} </a>
`
    if (examples[i].type) src += ' <span class=type>(' + examples[i].type + ')</span></a>'
    if (examples[i].new) src += ' <span class=newExample>new</span></a>'
  }
  src += '</td></tr></table>'*/

module.exports = function help (state, i18n) {

  // <td widthx=' + ${colp} + ' valign=top>
  const exampleElems = require('./examples')(state, i18n)
  return html`
    <span id='help' style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <h3>Documentation:</h3>
        <a class="navlink" href="https://openjscad.org/dokuwiki/doku.php" target="_blank">User Guide / Documentation <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">How to program with OpenJSCAD: online, offline & CLI</span>
        <br/>
        <a class="navlink" href="https://jscad.xyz/forum" rel="publisher" target="_blank">Recent Updates <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">Announcements of recent developments</span>
        <br/>
        <a class="navlink" href="https://jscad.xyz/forum" target="_blank">Google+ Community <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">Discuss with other users &amp; developers</span>
      </div>
      <div>
        <h3>Examples:</h3>
        <table>
          ${exampleElems}
        </table>
      </div>
    </span>
  `
}
