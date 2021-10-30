import { h, t,T, setTranslations, insertHtml, makeUpdater, refreshTranslations } from './jsxxx'

import test from './sample'

async function changeLanguage(lang){
    fetch(`locales/${lang}.json`).then(r=>r.text()).then((json)=>{
        setTranslations(JSON.parse(json))
        refreshTranslations()
    })
}

changeLanguage('en').then(()=>{
    let self = {}
    const $ = makeUpdater()
    
    let count = 1
    
    let tpl =  <div p="main">
        <label><input p="opts.autoReload" type="checkbox"/>{T`auto reload`}</label>
        <label><input p="opts.autoRotate" type="checkbox"/>{T`auto rotate`}</label>
        <label><input p="opts.autoZoom" type="checkbox"/>{T`auto zoom`}</label>
        <label><input p="opts.showGrid" type="checkbox"/>{T`grid`}</label>
        <label><input p="opts.showAxes" type="checkbox"/>{T`axes`}</label>
        <div>
            <button onclick={()=>$(count++)}>counter: {()=>count}</button>
            {['en','hr','fr','de','ja'].map(l=>(
            <button onclick={()=>changeLanguage(l)}>[{l}]</button>
            ))}
            
        </div>
    </div>    
    
    insertHtml(document.body,null,tpl,self, $)
    
    console.log('self', self, $)
    $(count++)
})



