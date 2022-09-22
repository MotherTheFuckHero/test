import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '../utils/auth'
import Locale  from 'element-ui/lib/locale'
import iView from 'iview';
import { langZH } from './lang/zh-CN'
import { langEN } from './lang/en-Us'
import { langRU } from './lang/ru-RU'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
import enUS from 'element-ui/lib/locale/lang/en'
import ruRU from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = navLang || false
let lang = localLang || localRead('lang') || 'zh'

Vue.config.lang = lang

Vue.locale = () => {}
// 实例化i18n并引入语言文件。



const i18n = new VueI18n({
  locale: lang, // 语言标识  // 默认语言
  messages: {
     zh: langZH,
    en: langEN,
    ru: langRU
  },
  silentTranslationWarn: true,
})
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
const elementLocales = lang => {
  if (lang == 'zh') {
    Locale.use(lang, zhCN)
  } else if (lang == 'en') {
    Locale.use(lang, enUS)
  } else if (lang == 'ru') {
    Locale.use(lang, ruRU)
  }
}
elementLocales(i18n.locale)

export default i18n
