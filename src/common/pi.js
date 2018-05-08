import lz from 'lz-string'

import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'

const storage = global.localStorage
let core = {}

const encipher = (target) => {
  if (typeof target !== 'string') {
    target = JSON.stringify(target)
  }

  return lz.compressToEncodedURIComponent(target)
}

const decipher = (target) => {
  return lz.decompressFromEncodedURIComponent(target)
}

const deepDecipher = (val) => {
  try {
    val = core.unsign(val)
  } catch (e) {}

  try {
    val = JSON.parse(val)
  } catch (e) {}

  return val
}

const storeData = (key, value) => {
  if (isUndefined(value)) {
    return storage.getItem(key)
  }

  if (isNull(value)) {
    let v = storage.getItem(key)
    storage.removeItem(key)
    return v
  }

  storage.setItem(key, value)
  return value
}

const storeSign = (key, value) => {
  let cur = deepDecipher(storeData(key) || {})
  if (isUndefined(value)) {
    return cur
  }

  if (isNull(value)) {
    storeData(key, value)
    return cur;
  }

  let v = Object.assign({}, cur, value)
  storeData(key, encipher(v))
  return v
}

const lodashModules = {
  isNull,
  isUndefined
}

Object.assign(core, {
  sign: (target) => encipher(target),
  unsign: (target) => decipher(target),
  deepUnsign: (val) => deepDecipher(val),

  store: (key, value) => storeSign(key, value),
  storeData: (key, value) => storeData(key, value)
}, lodashModules)

//use instead: this.$vuetify.breakpoint.width
/*
core.viewport = () => {
  //https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  return {
    width: Math.max(document.documentElement.clientWidth, global.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, global.innerHeight || 0)
  }
}
 */

export default core
