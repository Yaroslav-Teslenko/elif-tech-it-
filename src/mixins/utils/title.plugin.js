import locaizeFilter from '@/filters/localize.filter'
//TODO не работает Vue.prototype.$title =
export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE
      return `${locaizeFilter(titleKey)} | ${appName}`
    }
  }
}
