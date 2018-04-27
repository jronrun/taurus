import VToolbarExt from './VToolbarExt'

export { VToolbarExt }

/* istanbul ignore next */
VToolbarExt.install = function install (Vue) {
  Vue.component(VToolbarExt.name, VToolbarExt)
}

export default VToolbarExt
