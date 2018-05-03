let helper = {}

const keys = {
  locale: 'locale',
  theme: 'theme'
}

helper.theme = (toTheme) => {
  if (!toTheme) {
    return pi.storeData(keys.theme) || global.config.defaultColor
  }

  pi.storeData(keys.theme, toTheme)
}

helper.locale = (toLocale) => {
  if (!toLocale) {
    return pi.storeData(keys.locale) || global.config.defaultLocale
  }

  pi.storeData(keys.locale, toLocale)
}

export default helper
