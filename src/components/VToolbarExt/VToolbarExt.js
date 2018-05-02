import VToolbar from 'vuetify/es5/components/VToolbar/VToolbar'

/**
 * <v-toolbar-ext :visible="isToolbarVisible"> </v-toolbar-ext>
 */
export default {
  name: 'v-toolbar-ext',

  mixins: [
    VToolbar
  ],

  props: {
    visible: Boolean
  },

  watch: {
    visible (val) {
      this.isActive = this.visible = true === val;
    }
  },

  created () {
    this.isActive = this.visible;
  }
}
