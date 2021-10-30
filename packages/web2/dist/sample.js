(() => {
  // src/jsxxx.js
  var ct;
  var ce;
  var TRANS = {};
  if (typeof document !== "undefined") {
    ct = document.createTextNode;
    ce = document.createElement;
  }
  function setTranslations(trans) {
    Object.assign(TRANS, trans);
  }
  function h(tag, attr, ...children) {
    return { tag, attr, children };
  }
  function t(code) {
    return TRANS[code] || code;
  }

  // src/sample.jsx
  setTranslations({ name: "Name" });
  var form = /* @__PURE__ */ h(Div, null, t`name`);
  console.log("form", form);
  function Div(...args) {
    console.log("args", args);
  }
})();
