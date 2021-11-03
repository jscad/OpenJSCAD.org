import { t, T, setTranslations, refreshTranslations } from "./jsx6/trans";
import { h, insertHtml } from "./jsx6";
import { makeUpdater } from "./jsx6/dirty";
import forEachProp from "./jsx6/forEachProp";
import getValue from "./jsx6/getValue";
import setSelected from "./jsx6/setSelected";
const langMap = {
  en: "english",
  de: "german",
  fr: "french",
  ja: "japanese",
  hr: "croatian"
};
async function changeLanguage(lang) {
  await fetch(`locales/${lang}.json`).then((r) => r.text()).then((json) => {
    setTranslations(JSON.parse(json));
    refreshTranslations();
  });
}
function initApp() {
  const [$, state] = makeUpdater({ countX: 1 });
  const APP = { updaters: $, insertHtml };
  let count = 1;
  function langClick(evt) {
    let lang = evt.target.propKey;
    changeLanguage(lang);
    setSelected(APP.langBt, lang);
  }
  function optChange() {
    console.log("optChange", getValue(APP.opts));
  }
  const tpl = /* @__PURE__ */ React.createElement("div", {
    p: "main"
  }, /* @__PURE__ */ React.createElement("div", {
    class: "g-hc"
  }, T`auto reload`, /* @__PURE__ */ React.createElement("label", {
    class: "el-switch"
  }, /* @__PURE__ */ React.createElement("input", {
    p: "opts.autoReload",
    type: "checkbox"
  }), /* @__PURE__ */ React.createElement("span", null))), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    p: "opts.autoRotate",
    type: "checkbox"
  }), T`auto rotate`), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    p: "opts.autoZoom",
    type: "checkbox"
  }), T`auto zoom`), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    p: "opts.showGrid",
    type: "checkbox"
  }), T`grid`), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    p: "opts.showAxes",
    type: "checkbox"
  }), T`axes`), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    onclick: $(() => count++)
  }, "test counter: ", () => count), /* @__PURE__ */ React.createElement("button", {
    onclick: () => state.countX++
  }, "test counter: ", () => state.countX), Object.keys(langMap).map((l) => /* @__PURE__ */ React.createElement("button", {
    p: `langBt.${l}`,
    onclick: langClick
  }, T(langMap[l])))));
  APP.insertHtml(document.body, null, tpl);
  setSelected(APP.langBt, "en");
  forEachProp(APP.opts, (bt) => bt.addEventListener("change", optChange));
  window.APP = APP;
  console.log("self", APP, $);
  $(count++);
}
changeLanguage("en").then(initApp);
