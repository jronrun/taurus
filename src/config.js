const locales = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: '简体中文',
    value: 'zh-CN'
  }
]
const colors = ['primary', 'blue', 'green', 'indigo', 'lime', 'purple', 'red', 'orange', 'deep-purple', 'brown']

const [ defaultLocale ] = locales
const [ defaultColor ] = colors
const baseUrl = 'http://localhost:8088'

const config = {
  locales,
  locale: defaultLocale.value,
  colors,
  defaultColor,
  url: baseUrl,
  debug: {
    mock: true, // enable mock
    http: false // http request log
  }
}

global.config = config

export default config
