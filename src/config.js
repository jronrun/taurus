const baseUrl = 'http://localhost:8088'
const config = {
  locale: 'en-US', // en-US, zh-CN
  url: baseUrl,
  debug: {
    mock: true, // enable mock
    http: false // http request log
  }
}

global.config = config

export default config
