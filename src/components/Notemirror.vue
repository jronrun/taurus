<template>
  <v-code-mirror-wrap @ready="onReady">
  </v-code-mirror-wrap>
</template>

<script>
  import CodeMirrorWrap from './Codemirror'

  import 'codemirror/addon/display/rulers'
  import 'codemirror/addon/edit/trailingspace'

  import 'codemirror/addon/lint/coffeescript-lint'
  import 'codemirror/addon/lint/css-lint'
  import 'codemirror/addon/lint/html-lint'
  import 'codemirror/addon/lint/javascript-lint'
  import 'codemirror/addon/lint/json-lint'
  import 'codemirror/addon/lint/lint.css'
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/yaml-lint'

  import '../common/diff_match_patch_20121119/diff_match_patch_uncompressed.js'
  import 'codemirror/addon/merge/merge.css'
  import 'codemirror/addon/merge/merge'

  import 'codemirror/keymap/vim'

  export default {
    components: {
      'v-code-mirror-wrap': CodeMirrorWrap
    },

    data() {
      return {
        instance: null,
      }
    },

    computed: {

    },

    props: {
    },

    methods: {
      onReady(codeMirrorWrap) {
        this.instance = codeMirrorWrap
        this.$emit('ready', codeMirrorWrap)
      }
    },

    mounted() {
    }
  }

</script>
