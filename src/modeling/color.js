// color table from http://www.w3.org/TR/css3-color/

export function color () {
  var map = {
    'black': [ 0 / 255, 0 / 255, 0 / 255 ],
    'silver': [ 192 / 255, 192 / 255, 192 / 255 ],
    'gray': [ 128 / 255, 128 / 255, 128 / 255 ],
    'white': [ 255 / 255, 255 / 255, 255 / 255 ],
    'maroon': [ 128 / 255, 0 / 255, 0 / 255 ],
    'red': [ 255 / 255, 0 / 255, 0 / 255 ],
    'purple': [ 128 / 255, 0 / 255, 128 / 255 ],
    'fuchsia': [ 255 / 255, 0 / 255, 255 / 255 ],
    'green': [ 0 / 255, 128 / 255, 0 / 255 ],
    'lime': [ 0 / 255, 255 / 255, 0 / 255 ],
    'olive': [ 128 / 255, 128 / 255, 0 / 255 ],
    'yellow': [ 255 / 255, 255 / 255, 0 / 255 ],
    'navy': [ 0 / 255, 0 / 255, 128 / 255 ],
    'blue': [ 0 / 255, 0 / 255, 255 / 255 ],
    'teal': [ 0 / 255, 128 / 255, 128 / 255 ],
    'aqua': [ 0 / 255, 255 / 255, 255 / 255 ],
    'aliceblue': [ 240 / 255, 248 / 255, 255 / 255 ],
    'antiquewhite': [ 250 / 255, 235 / 255, 215 / 255 ],
    'aqua': [ 0 / 255, 255 / 255, 255 / 255 ],
    'aquamarine': [ 127 / 255, 255 / 255, 212 / 255 ],
    'azure': [ 240 / 255, 255 / 255, 255 / 255 ],
    'beige': [ 245 / 255, 245 / 255, 220 / 255 ],
    'bisque': [ 255 / 255, 228 / 255, 196 / 255 ],
    'black': [ 0 / 255, 0 / 255, 0 / 255 ],
    'blanchedalmond': [ 255 / 255, 235 / 255, 205 / 255 ],
    'blue': [ 0 / 255, 0 / 255, 255 / 255 ],
    'blueviolet': [ 138 / 255, 43 / 255, 226 / 255 ],
    'brown': [ 165 / 255, 42 / 255, 42 / 255 ],
    'burlywood': [ 222 / 255, 184 / 255, 135 / 255 ],
    'cadetblue': [ 95 / 255, 158 / 255, 160 / 255 ],
    'chartreuse': [ 127 / 255, 255 / 255, 0 / 255 ],
    'chocolate': [ 210 / 255, 105 / 255, 30 / 255 ],
    'coral': [ 255 / 255, 127 / 255, 80 / 255 ],
    'cornflowerblue': [ 100 / 255, 149 / 255, 237 / 255 ],
    'cornsilk': [ 255 / 255, 248 / 255, 220 / 255 ],
    'crimson': [ 220 / 255, 20 / 255, 60 / 255 ],
    'cyan': [ 0 / 255, 255 / 255, 255 / 255 ],
    'darkblue': [ 0 / 255, 0 / 255, 139 / 255 ],
    'darkcyan': [ 0 / 255, 139 / 255, 139 / 255 ],
    'darkgoldenrod': [ 184 / 255, 134 / 255, 11 / 255 ],
    'darkgray': [ 169 / 255, 169 / 255, 169 / 255 ],
    'darkgreen': [ 0 / 255, 100 / 255, 0 / 255 ],
    'darkgrey': [ 169 / 255, 169 / 255, 169 / 255 ],
    'darkkhaki': [ 189 / 255, 183 / 255, 107 / 255 ],
    'darkmagenta': [ 139 / 255, 0 / 255, 139 / 255 ],
    'darkolivegreen': [ 85 / 255, 107 / 255, 47 / 255 ],
    'darkorange': [ 255 / 255, 140 / 255, 0 / 255 ],
    'darkorchid': [ 153 / 255, 50 / 255, 204 / 255 ],
    'darkred': [ 139 / 255, 0 / 255, 0 / 255 ],
    'darksalmon': [ 233 / 255, 150 / 255, 122 / 255 ],
    'darkseagreen': [ 143 / 255, 188 / 255, 143 / 255 ],
    'darkslateblue': [ 72 / 255, 61 / 255, 139 / 255 ],
    'darkslategray': [ 47 / 255, 79 / 255, 79 / 255 ],
    'darkslategrey': [ 47 / 255, 79 / 255, 79 / 255 ],
    'darkturquoise': [ 0 / 255, 206 / 255, 209 / 255 ],
    'darkviolet': [ 148 / 255, 0 / 255, 211 / 255 ],
    'deeppink': [ 255 / 255, 20 / 255, 147 / 255 ],
    'deepskyblue': [ 0 / 255, 191 / 255, 255 / 255 ],
    'dimgray': [ 105 / 255, 105 / 255, 105 / 255 ],
    'dimgrey': [ 105 / 255, 105 / 255, 105 / 255 ],
    'dodgerblue': [ 30 / 255, 144 / 255, 255 / 255 ],
    'firebrick': [ 178 / 255, 34 / 255, 34 / 255 ],
    'floralwhite': [ 255 / 255, 250 / 255, 240 / 255 ],
    'forestgreen': [ 34 / 255, 139 / 255, 34 / 255 ],
    'fuchsia': [ 255 / 255, 0 / 255, 255 / 255 ],
    'gainsboro': [ 220 / 255, 220 / 255, 220 / 255 ],
    'ghostwhite': [ 248 / 255, 248 / 255, 255 / 255 ],
    'gold': [ 255 / 255, 215 / 255, 0 / 255 ],
    'goldenrod': [ 218 / 255, 165 / 255, 32 / 255 ],
    'gray': [ 128 / 255, 128 / 255, 128 / 255 ],
    'green': [ 0 / 255, 128 / 255, 0 / 255 ],
    'greenyellow': [ 173 / 255, 255 / 255, 47 / 255 ],
    'grey': [ 128 / 255, 128 / 255, 128 / 255 ],
    'honeydew': [ 240 / 255, 255 / 255, 240 / 255 ],
    'hotpink': [ 255 / 255, 105 / 255, 180 / 255 ],
    'indianred': [ 205 / 255, 92 / 255, 92 / 255 ],
    'indigo': [ 75 / 255, 0 / 255, 130 / 255 ],
    'ivory': [ 255 / 255, 255 / 255, 240 / 255 ],
    'khaki': [ 240 / 255, 230 / 255, 140 / 255 ],
    'lavender': [ 230 / 255, 230 / 255, 250 / 255 ],
    'lavenderblush': [ 255 / 255, 240 / 255, 245 / 255 ],
    'lawngreen': [ 124 / 255, 252 / 255, 0 / 255 ],
    'lemonchiffon': [ 255 / 255, 250 / 255, 205 / 255 ],
    'lightblue': [ 173 / 255, 216 / 255, 230 / 255 ],
    'lightcoral': [ 240 / 255, 128 / 255, 128 / 255 ],
    'lightcyan': [ 224 / 255, 255 / 255, 255 / 255 ],
    'lightgoldenrodyellow': [ 250 / 255, 250 / 255, 210 / 255 ],
    'lightgray': [ 211 / 255, 211 / 255, 211 / 255 ],
    'lightgreen': [ 144 / 255, 238 / 255, 144 / 255 ],
    'lightgrey': [ 211 / 255, 211 / 255, 211 / 255 ],
    'lightpink': [ 255 / 255, 182 / 255, 193 / 255 ],
    'lightsalmon': [ 255 / 255, 160 / 255, 122 / 255 ],
    'lightseagreen': [ 32 / 255, 178 / 255, 170 / 255 ],
    'lightskyblue': [ 135 / 255, 206 / 255, 250 / 255 ],
    'lightslategray': [ 119 / 255, 136 / 255, 153 / 255 ],
    'lightslategrey': [ 119 / 255, 136 / 255, 153 / 255 ],
    'lightsteelblue': [ 176 / 255, 196 / 255, 222 / 255 ],
    'lightyellow': [ 255 / 255, 255 / 255, 224 / 255 ],
    'lime': [ 0 / 255, 255 / 255, 0 / 255 ],
    'limegreen': [ 50 / 255, 205 / 255, 50 / 255 ],
    'linen': [ 250 / 255, 240 / 255, 230 / 255 ],
    'magenta': [ 255 / 255, 0 / 255, 255 / 255 ],
    'maroon': [ 128 / 255, 0 / 255, 0 / 255 ],
    'mediumaquamarine': [ 102 / 255, 205 / 255, 170 / 255 ],
    'mediumblue': [ 0 / 255, 0 / 255, 205 / 255 ],
    'mediumorchid': [ 186 / 255, 85 / 255, 211 / 255 ],
    'mediumpurple': [ 147 / 255, 112 / 255, 219 / 255 ],
    'mediumseagreen': [ 60 / 255, 179 / 255, 113 / 255 ],
    'mediumslateblue': [ 123 / 255, 104 / 255, 238 / 255 ],
    'mediumspringgreen': [ 0 / 255, 250 / 255, 154 / 255 ],
    'mediumturquoise': [ 72 / 255, 209 / 255, 204 / 255 ],
    'mediumvioletred': [ 199 / 255, 21 / 255, 133 / 255 ],
    'midnightblue': [ 25 / 255, 25 / 255, 112 / 255 ],
    'mintcream': [ 245 / 255, 255 / 255, 250 / 255 ],
    'mistyrose': [ 255 / 255, 228 / 255, 225 / 255 ],
    'moccasin': [ 255 / 255, 228 / 255, 181 / 255 ],
    'navajowhite': [ 255 / 255, 222 / 255, 173 / 255 ],
    'navy': [ 0 / 255, 0 / 255, 128 / 255 ],
    'oldlace': [ 253 / 255, 245 / 255, 230 / 255 ],
    'olive': [ 128 / 255, 128 / 255, 0 / 255 ],
    'olivedrab': [ 107 / 255, 142 / 255, 35 / 255 ],
    'orange': [ 255 / 255, 165 / 255, 0 / 255 ],
    'orangered': [ 255 / 255, 69 / 255, 0 / 255 ],
    'orchid': [ 218 / 255, 112 / 255, 214 / 255 ],
    'palegoldenrod': [ 238 / 255, 232 / 255, 170 / 255 ],
    'palegreen': [ 152 / 255, 251 / 255, 152 / 255 ],
    'paleturquoise': [ 175 / 255, 238 / 255, 238 / 255 ],
    'palevioletred': [ 219 / 255, 112 / 255, 147 / 255 ],
    'papayawhip': [ 255 / 255, 239 / 255, 213 / 255 ],
    'peachpuff': [ 255 / 255, 218 / 255, 185 / 255 ],
    'peru': [ 205 / 255, 133 / 255, 63 / 255 ],
    'pink': [ 255 / 255, 192 / 255, 203 / 255 ],
    'plum': [ 221 / 255, 160 / 255, 221 / 255 ],
    'powderblue': [ 176 / 255, 224 / 255, 230 / 255 ],
    'purple': [ 128 / 255, 0 / 255, 128 / 255 ],
    'red': [ 255 / 255, 0 / 255, 0 / 255 ],
    'rosybrown': [ 188 / 255, 143 / 255, 143 / 255 ],
    'royalblue': [ 65 / 255, 105 / 255, 225 / 255 ],
    'saddlebrown': [ 139 / 255, 69 / 255, 19 / 255 ],
    'salmon': [ 250 / 255, 128 / 255, 114 / 255 ],
    'sandybrown': [ 244 / 255, 164 / 255, 96 / 255 ],
    'seagreen': [ 46 / 255, 139 / 255, 87 / 255 ],
    'seashell': [ 255 / 255, 245 / 255, 238 / 255 ],
    'sienna': [ 160 / 255, 82 / 255, 45 / 255 ],
    'silver': [ 192 / 255, 192 / 255, 192 / 255 ],
    'skyblue': [ 135 / 255, 206 / 255, 235 / 255 ],
    'slateblue': [ 106 / 255, 90 / 255, 205 / 255 ],
    'slategray': [ 112 / 255, 128 / 255, 144 / 255 ],
    'slategrey': [ 112 / 255, 128 / 255, 144 / 255 ],
    'snow': [ 255 / 255, 250 / 255, 250 / 255 ],
    'springgreen': [ 0 / 255, 255 / 255, 127 / 255 ],
    'steelblue': [ 70 / 255, 130 / 255, 180 / 255 ],
    'tan': [ 210 / 255, 180 / 255, 140 / 255 ],
    'teal': [ 0 / 255, 128 / 255, 128 / 255 ],
    'thistle': [ 216 / 255, 191 / 255, 216 / 255 ],
    'tomato': [ 255 / 255, 99 / 255, 71 / 255 ],
    'turquoise': [ 64 / 255, 224 / 255, 208 / 255 ],
    'violet': [ 238 / 255, 130 / 255, 238 / 255 ],
    'wheat': [ 245 / 255, 222 / 255, 179 / 255 ],
    'white': [ 255 / 255, 255 / 255, 255 / 255 ],
    'whitesmoke': [ 245 / 255, 245 / 255, 245 / 255 ],
    'yellow': [ 255 / 255, 255 / 255, 0 / 255 ],
    'yellowgreen': [ 154 / 255, 205 / 255, 50 / 255 ] }

  var o, i = 1, a = arguments, c = a[0], alpha

  if (a[0].length < 4 && (a[i] * 1 - 0) == a[i]) { alpha = a[i++]} // first argument rgb (no a), and next one is numeric?
  if (a[i].length) { a = a[i], i = 0; } // next arg an array, make it our main array to walk through
  if (typeof c == 'string')
    c = map[c.toLowerCase()]
  if (alpha !== undefined)
    c = c.concat(alpha)
  for (o = a[i++]; i < a.length; i++) {
    o = o.union(a[i])
  }
  return o.setColor(c)
}


// from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgb2hsl(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export function hsl2rgb(h, s, l){
    if(h.length) { l = h[2], s = h[1], h = h[0]; }
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */

export function rgb2hsv(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
export function hsv2rgb(h, s, v){
    if(h.length) { v = h[2], s = h[1], h = h[0]; }
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r, g, b];
}

/**
 * Converts a HTML5 color value (string) to RGB values
 * See the color input type of HTML5 forms
 * Conversion formula:
 * - split the string; "#RRGGBB" into RGB components
 * - convert the HEX value into RGB values
 */
export function html2rgb(s) {
    var r = 0;
    var g = 0;
    var b = 0;
    if(s.length == 7) {
      r = parseInt('0x'+s.slice(1,3))/255;
      g = parseInt('0x'+s.slice(3,5))/255;
      b = parseInt('0x'+s.slice(5,7))/255;
    }
    return [r,g,b];
}

/**
 * Converts RGB color value to HTML5 color value (string)
 * Conversion forumla:
 * - convert R, G, B into HEX strings
 * - return HTML formatted string "#RRGGBB"
 */
export function rgb2html(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var s = '#' +
      Number(0x1000000+r*255*0x10000+g*255*0x100+b*255).toString(16).substring(1);
    return s;
}
