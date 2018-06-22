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

const colors = [
  'grey', 'blue-grey', 'primary', 'blue', 'green', 'indigo',
  'lime', 'purple', 'red', 'orange', 'deep-purple', 'brown',
]

const [ defaultLocale ] = locales
const [ defaultColor ] = colors
const baseUrl = 'http://localhost:8088'

const config = {
  locales,
  locale: defaultLocale.value,
  colors,
  defaultColor,
  api: baseUrl,
  //code mirror
  mirror: {
    basePath: 'https://cdn.bootcss.com/codemirror/5.38.0'
  },
  debug: {
    mock: true, // enable mock
    http: false // http request log
  }
}

global.config = config

export default config
