const modes = {}
const languages = {}
const loadedTheme = ['default', 'lemon']
const thirdThemes = [
  'chrome-devtools', 'cssedit', 'eiffel', 'github', 'mac-classic', 'one-dark', 'sidewalkchalk', 'summerfruit',
  'tomorrow-night-blue', 'toy-chest'
]
const themes = [...[
  'default', 'lemon', '3024-day', '3024-night', 'abcdef', 'ambiance', 'base16-dark', 'base16-light', 'bespin',
  'blackboard', 'cobalt',
  'colorforth', 'dracula', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark',
  'liquibyte',
  'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light',
  'pastel-on-dark',
  'railscasts', 'rubyblue', 'seti', 'solarized,dark', 'solarized,light', 'the-matrix', 'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'
], ...thirdThemes]

const blackBGMark = [
  'dark', 'night', 'black', 'abcdef'
]

let initializeModeInfo = () => {
  let {modeInfo} = CodeMirror
  if (modeInfo.length > 0 && (modeInfo[0].id || 0) > 0) {
    return modeInfo
  }

  //["name", "mime", "mode"], Optional property: ["ext", "mimes", "file", "alias"]
  let aModeInfoArray = []
  modeInfo.forEach((item) => {
    item.id = pi.uniqueId()
    item.theMimes = (item.mimes && item.mimes.length > 0)
      ? item.mimes : ('null' !== item.mime ? [item.mime] : [])

    languages[item.name.toLowerCase()] = item
    modes[item.mode.toLowerCase()] = item

    aModeInfoArray.push(item)
  })

  return CodeMirror.modeInfo = aModeInfoArray
}

let getModeInfo = (lang = '') => {
  lang = lang.toLowerCase()
  let info = languages[lang] || modes[lang]
  if (info) {
    return info
  }

  let tryExt = /.+\.([^.]+)$/.exec(lang)
  if (tryExt) {
    info = CodeMirror.findModeByExtension(tryExt[1])
  } else if (/\//.test(lang)) {
    info = CodeMirror.findModeByMIME(lang)
    info.mime = lang
  }
  if (info) {
    return info
  }

  info = CodeMirror.findModeByFileName(lang)
  if (info) {
    return info
  }

  info = CodeMirror.findModeByName(lang)
  if (info) {
    return info
  }

  info = CodeMirror.findModeByExtension(lang)
  if (info) {
    return info
  }

  return null
}

class CMAssist {

  instance = null
  assistOptions

  constructor(instanceOfCodeMirror, assistOptions = {
    basePath: global.config.mirror.basePath,
    thirdThemePath: ''
  }) {
    initializeModeInfo()
    this.instance = instanceOfCodeMirror
    this.assistOptions = assistOptions
  }

  langInfo(lang) {
    return getModeInfo(lang)
  }

  isThirdTheme(target) {
    return thirdThemes.filter(item => {
      return item === target
    }).length > 0
  }

  loadTheme(themeName) {
    themeName = /^solarized/.test(themeName) ? 'solarized' : themeName
    if (!themes.includes(themeName)) {
      throw Error('Cound not find theme ' + themeName)
    }

    if (!loadedTheme.includes(themeName)) {
      let themePath = this.isThirdTheme(themeName)
        ? `${this.assistOptions.thirdThemePath}/${themeName}.css` : `${this.assistOptions.basePath}/theme/${themeName}.css`
      pi.css(themePath)
      loadedTheme.push(themeName)
    }

    return themeName
  }

  doc() {
    return this.instance.doc
  }

  val(data) {
    if (pi.isUndefined(data)) {
      return this.instance.getValue()
    }

    this.instance.setValue(data)
    this.refreshDelay()
    return data
  }

  refreshDelay(wait) {
    pi.delay((cm) => {
      cm.refresh()
    }, wait || 100, this.instance)
  }

  handleCmd(input) {
    return this.instance.execCommand(input)
  }

  isSelected() {
    return this.doc().somethingSelected()
  }

  selected(isNoneMirrorTextIfNoneSelected) {
    let text = ''

    if (this.isSelected()) {
      text = this.instance.doc().getSelection()
    } else {
      if (true !== isNoneMirrorTextIfNoneSelected) {
        text = this.val()
      }
    }

    return text
  }

  replaceSelected (code, collapse, origin) {
    this.doc().replaceSelection(code, collapse, origin)
  }

  attrs(optionKey, optionVal) {
    if (pi.isJSON(optionKey)) {
      for (let [k, v] of Object.entries(optionKey)) {
        this.instance.setOption(k, v)
      }
      return optionKey
    }

    if (pi.isUndefined(optionKey)) {
      return this.instance.options
    }

    if (pi.isArray(optionKey)) {
      let rAttr = {}

      for (let elem of optionKey.values()) {
        rAttr[okey] = this.instance.getOption(okey)
      }

      return rAttr
    }

    let aVal = this.instance.getOption(optionKey)
    if (pi.isUndefined(optionVal)) {
      return aVal
    }

    this.instance.setOption(optionKey, optionVal)
    return aVal
  }

  theme(th) {
    if (pi.isUndefined(th)) {
      return this.attrs('theme')
    }

    th = this.loadTheme(th)
    this.attrs('theme', th)
    return th
  }

  mode(langName, optionalChosenMimeOrExt) {
    let cmeKey = 'chosenMimeOrExt'
    if (pi.isUndefined(langName)) {
      let rInfo = {}

      Object.assign(rInfo, this.langInfo(this.attrs('mode')))
      Object.assign(rInfo, {
        chosenMimeOrExt: this.attrs(cmeKey) || ''
      })

      return rInfo
    }

    let info = this.langInfo(langName)
    if (!info) {
      throw Error('Could not find a mode corresponding to ' + langName)
    }

    let spec = info.mime, mode = info.mode
    spec = 'null' === spec ? mode : spec
    this.attrs('mode', spec)
    this.autoLoadMode(mode)

    if (optionalChosenMimeOrExt) {
      this.attrs(cmeKey, optionalChosenMimeOrExt)
    } else {
      let curCME = this.attrs(cmeKey) || ''
      if (info.theMimes.indexOf(curCME) === -1) {
        this.attrs(cmeKey, info.theMimes.length > 0 ? info.theMimes[0] : '')
      }
    }

    return info
  }

  autoLoadMode (mode) {
    let cm = this.instance
    let modeBasePath = this.assistOptions.basePath

    if (!pi.isFunction(CodeMirror.autoLoadMode)) {
      pi.script(`${modeBasePath}/addon/mode/loadmode.js`, function () {
        CodeMirror.modeURL = `${modeBasePath}/mode/%N/%N.js`
        CodeMirror.autoLoadMode(cm, mode)
      })
    } else {
      CodeMirror.autoLoadMode(cm, mode)
    }
  }

  tip (msg, tipOptions) {
    return this.instance.openNotification(`<span style="color: orange">${msg}</span>`, Object.assign({
      bottom: true,
      duration: 5000
    }, tipOptions || {}))
  }

}

export default CMAssist
