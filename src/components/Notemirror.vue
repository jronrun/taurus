<template>
  <v-code-mirror-wrap :code="noteText" @ready="onReady" :options="noteOptions">
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

  import 'codemirror/keymap/vim'

  import NMAssist from '../components/NMAssist'

  export default {
    components: {
      'v-code-mirror-wrap': CodeMirrorWrap
    },

    data() {
      return {
        instance: null,
        noteText: '',
        noteOptions: {}
      }
    },

    computed: {

    },

    props: {
      code: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: () => ({})
      },

      assistOptions: {
        type: Object,
        default: () => ({})
      },
      assistEvents: {
        type: Object,
        default: () => ({})
      }
    },

    methods: {
      onReady(codeMirrorWrap) {
        this.instance = new NMAssist(codeMirrorWrap.instance, this.assistEvents, this.assistOptions)
        this.$emit('ready', this.instance)
      }
    },

    mounted() {

    },

    beforeMount() {
      let extraKeys = Object.assign({
        //http://codemirror.net/doc/manual.html#commands
        "Ctrl-/": 'toggleComment',
        "Ctrl-A": 'selectAll'
      }, this.options.extraKeys || {})

      this.noteText = this.code
      this.noteOptions = Object.assign({
        mode: 'markdown',
        keyMap: 'vim',
        fullScreen: false,
        autofocus: true,
        lineNumbers: true,
        lineNumberFormatter: (line) => {
          return 1 === line ? '' : line
        },
        showCursorWhenSelecting: true,
        styleActiveLine: true
      }, this.options, {
        extraKeys: extraKeys
      })
    }
  }

</script>
