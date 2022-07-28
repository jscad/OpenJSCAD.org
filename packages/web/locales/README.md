# Locales for JSCAD

These files specific the language phrases for JSCAD, where each language has a specific file.
The files are named after the ISO code for the language, i.e. 'zh' for chinese.

So, just copy en.json to create a new file (zh.json), and translate the phrases.
The file should have an extra entry for the new language as well, i.e. "chinese":"中文"

Oh! Don't forget that each language (file) needs a new entry, e.g. "chinese":"中国語" for Japanese.
Translations are easy using BING translator, etc.

Finally, the new language needs to be registered by changing the following files.
```
src/index.js
src/sideEffects/i18n/index.js
```

Be sure to test the new language by running...
```
npm run dev
```
And opening the given URL.

