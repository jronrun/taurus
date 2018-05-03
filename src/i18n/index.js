import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = global.config.locales.map(v => v.value)

Vue.use(VueI18n)

let messages = {}
locales.forEach(v => {
  messages[v] = require(`./${v}/index`).default
})

const i18n = new VueI18n({
  locale: global.config.locale,
  silentTranslationWarn: true,
  messages
})

export default i18n
