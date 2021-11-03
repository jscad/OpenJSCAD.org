import { t, T, setTranslations, refreshTranslations, h, insertHtml, makeUpdater } from './jsx6'

import forEachProp from './jsx6/forEachProp'
import getValue from './jsx6/getValue'
import setSelected from './jsx6/setSelected'

const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

async function changeLanguage (lang) {
  await fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
    setTranslations(JSON.parse(json))
    refreshTranslations()
  })
}

function initApp(){
  const [$, state] = makeUpdater({countX:1})
  const APP = {updaters:$, insertHtml}

  let count = 1

  function langClick(evt){
    let lang = evt.target.propKey
    changeLanguage(lang)
    setSelected(APP.langBt, lang)
  }

  function optChange(){
    console.log('optChange', getValue(APP.opts))
  }

  const tpl = (
    <div p='main'>
      <div class="g-hc">
        {T`auto reload`}
        <label class="el-switch"><input p='opts.autoReload' type='checkbox' /><span/></label>
      </div>
      <label><input p='opts.autoRotate' type='checkbox' />{T`auto rotate`}</label>
      <label><input p='opts.autoZoom' type='checkbox' />{T`auto zoom`}</label>
      <label><input p='opts.showGrid' type='checkbox' />{T`grid`}</label>
      <label><input p='opts.showAxes' type='checkbox' />{T`axes`}</label>
      <div>
        <button onclick={$(() => count++)}>test counter: {() => count}</button>
        <button onclick={() => state.countX++}>test counter: {() => state.countX}</button>
        {Object.keys(langMap).map(l => (
          <button p={`langBt.${l}`} onclick={langClick}>{T(langMap[l])}</button>
        ))}

      </div>
    </div>
  )


  APP.insertHtml(document.body, null, tpl)
  setSelected(APP.langBt, 'en')
  forEachProp(APP.opts,bt=>bt.addEventListener('change', optChange))

  window.APP = APP

  console.log('self', APP, $)
  $(count++)
}

changeLanguage('en').then(initApp)
