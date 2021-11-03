const { init, parse } = require('es-module-lexer');
const fs = require('fs');

(async () => {
  // either await init, or call parse asynchronously
  // this is necessary for the Web Assembly boot
  await init;
  // let file = fs.readFileSync('src/web.js').toString()
  let file = fs.readFileSync('src/web2.js').toString()
  const [imports, exports] = parse(file);
  
  console.log('imports', imports)
  console.log('exports', exports)
})();