import { h, t, T, setTranslations, insertHtml, makeUpdater, refreshTranslations } from './jsxxx'

const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

async function changeLanguage (lang) {
  fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
    setTranslations(JSON.parse(json))
    refreshTranslations()
  })
}

changeLanguage('en').then(() => {
  const self = {}
  const $ = makeUpdater()

  let count = 1

  const tpl = (
    <div p='main'>
      <label><input p='opts.autoReload' type='checkbox' />{T`auto reload`}</label>
      <label><input p='opts.autoRotate' type='checkbox' />{T`auto rotate`}</label>
      <label><input p='opts.autoZoom' type='checkbox' />{T`auto zoom`}</label>
      <label><input p='opts.showGrid' type='checkbox' />{T`grid`}</label>
      <label><input p='opts.showAxes' type='checkbox' />{T`axes`}</label>
      <div>
        <button onclick={$(() => count++)}>test counter: {() => count}</button>
        {Object.keys(langMap).map(l => (
          <button p={`bt.${l}`} key={l} onclick={() => changeLanguage(l)}>{T(langMap[l])}</button>
        ))}

      </div>
    </div>
  )

  insertHtml(document.body, null, tpl, self, $)

  window.APP = self

  console.log('self', self, $)
  $(count++)
})
