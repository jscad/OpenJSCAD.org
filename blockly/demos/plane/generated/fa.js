// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof planepage == 'undefined') { var planepage = {}; }


planepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Plane_rows">ردیف: %1</span><span id="Plane_getRows">ردیف\u200Cها (%1)</span><span id="Plane_rows1">اولین ردیف کلاس: %1</span><span id="Plane_getRows1">اولین کلاس ردیف\u200Cها (%1)</span><span id="Plane_rows2">دومین کلاس ردیف: %1</span><span id="Plane_getRows2">دومین کلاس ردیف\u200Cها (%1)</span><span id="Plane_seats">صندلی\u200Cها: %1</span><span id="Plane_placeholder">؟</span><span id="Plane_setSeats">صندلی\u200Cها =</span></div>';
};


planepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = planepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><a href="https://developers.google.com/blockly/">Blockly</a>&rlm; &gt; <a href="../index.html">Demos</a>&rlm; &gt; <span id="title">محاسبه\u200Cگر صندلی\u200Cهای هواپیما</span> &nbsp; ';
  var iLimit37 = opt_ijData.maxLevel + 1;
  for (var i37 = 1; i37 < iLimit37; i37++) {
    output += ' ' + ((i37 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i37) + '</span>' : (i37 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i37) + '">' + soy.$$escapeHtml(i37) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i37) + '">' + soy.$$escapeHtml(i37) + '</a>');
  }
  output += '</h1></td><td class="farSide"><span ' + ((opt_ijData.lang == 'en') ? 'id="languageBorder"' : '') + ' style="padding: 10px"><select id="languageMenu"></select></span></td></tr></table><script src="slider.js"><\/script><svg id="plane" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="600" height="320" viewBox="0 110 600 320"><defs><g id="row1st"><rect class="seat1st" width="10" height="10" x="75" y="243" /><rect class="seat1st" width="10" height="10" x="75" y="254" /><rect class="seat1st" width="10" height="10" x="75" y="272" /><rect class="seat1st" width="10" height="10" x="75" y="283" /></g><g id="row2nd"><rect class="seat2nd" width="10" height="8" x="75" y="243" /><rect class="seat2nd" width="10" height="8" x="75" y="251" /><rect class="seat2nd" width="10" height="8" x="75" y="269" /><rect class="seat2nd" width="10" height="8" x="75" y="277" /><rect class="seat2nd" width="10" height="8" x="75" y="285" /></g><linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0" /><stop offset="100%" style="stop-color:#fff;stop-opacity:1" /></linearGradient><linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0" /><stop offset="100%" style="stop-color:#fff;stop-opacity:1" /></linearGradient></defs><path d="m 214,270 l 159,-254 31,-16 -74,189 0,162 74,189 -31,16 z" id="wing" /><path d="m 577,270 22,-93 -27,6 -44,88 44,88 27,6 z" id="tail" /><path d="m 577,270 l -94,24 h -407 c -38,0 -75,-13 -75,-26 c 0,-13 38,-26 75,-26 h 407 z" id="fuselage" /><rect width="610" height="100" x="-5" y="110" fill="url(#grad1)" /><rect width="610" height="100" x="-5" y="330" fill="url(#grad2)" /><text id="row1stText" x="55" y="380"></text><text id="row2ndText" x="55" y="420"></text><text x="55" y="210"><tspan id="seatText"></tspan><tspan id="seatYes" style="fill: #0c0;" dy="10">&#x2713;</tspan><tspan id="seatNo" style="fill: #f00;" dy="10">&#x2717;</tspan></text>' + ((opt_ijData.level > 1) ? '<rect id="crew_right" class="crew" width="10" height="10" x="35" y="254" /><rect id="crew_left" class="crew" width="10" height="10" x="35" y="272" />' : '') + '</svg><p>';
  switch (opt_ijData.level) {
    case 1:
      output += 'یک هواپیما تعداد از صندلی\u200Cهای مسافرین را دارد. هر ردیف شمال چهار صندلی است.';
      break;
    case 2:
      output += 'یک هواپیما دو صندلی در عرشهٔ پرواز دارد (برای خلبان و کمک خلبان) و تعدادی صندلی مسافرین.  هر ردیف شامل چهار صندلی است.';
      break;
    case 3:
      output += 'یک هواپیما دو صندلی در کابین خلبان دارد (برای خلبان و کمک خلبان) و تهداد از صندلی\u200Cها مسافرین درجه یک و درجه دو.  هر ردیف درجه یک شامل چهار صندلی است. هر ردیف درجه دو شامل پنج صندلی است.';
      break;
  }
  output += '</p><p>یک فرمول بسازید (پایین) که تعداد کل صندلی\u200Cهای هواپیما با تغییر ردیف را حساب کند (بالا).</p><script src="../../blockly_compressed.js"><\/script><script src="../../blocks_compressed.js"><\/script><script src="../../javascript_compressed.js"><\/script><script src="../../msg/js/' + soy.$$escapeHtml(opt_ijData.lang) + '.js"><\/script><script src="blocks.js"><\/script>' + planepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>';
  return output;
};


planepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_arithmetic"><field name="OP">MULTIPLY</field></block>' + ((opt_ijData.level <= 2) ? '<block type="plane_get_rows"></block>' : '<block type="plane_get_rows1st"></block><block type="plane_get_rows2nd"></block>') + '</xml>';
};
