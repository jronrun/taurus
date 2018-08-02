<template>
  <v-code-mirror v-model="mirrorText" :options="mirrorOptions" :merge="mirrorMerge" @ready="onReady">
  </v-code-mirror>
</template>

<script>
  import CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/lib/codemirror.css'

  import 'codemirror/addon/comment/comment'
  import 'codemirror/addon/comment/continuecomment'
  import 'codemirror/addon/dialog/dialog.css'
  import 'codemirror/addon/dialog/dialog'

  import 'codemirror/addon/display/autorefresh'
  import 'codemirror/addon/display/fullscreen.css'
  import 'codemirror/addon/display/fullscreen'
  import 'codemirror/addon/display/panel'
  import 'codemirror/addon/display/placeholder'

  import 'codemirror/addon/edit/closebrackets'
  import 'codemirror/addon/edit/closetag'
  import 'codemirror/addon/edit/continuelist'
  import 'codemirror/addon/edit/matchbrackets'
  import 'codemirror/addon/edit/matchtags'

  import 'codemirror/addon/fold/brace-fold'
  import 'codemirror/addon/fold/comment-fold'
  import 'codemirror/addon/fold/foldcode'
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/foldgutter'
  import 'codemirror/addon/fold/indent-fold'
  import 'codemirror/addon/fold/markdown-fold'
  import 'codemirror/addon/fold/xml-fold'

  import 'codemirror/addon/hint/anyword-hint'
  import 'codemirror/addon/hint/css-hint'
  import 'codemirror/addon/hint/html-hint'
  import 'codemirror/addon/hint/javascript-hint'
  import 'codemirror/addon/hint/show-hint.css'
  import 'codemirror/addon/hint/show-hint'
  import 'codemirror/addon/hint/sql-hint'
  import 'codemirror/addon/hint/xml-hint'

  import 'codemirror/addon/runmode/runmode'
  import 'codemirror/addon/scroll/annotatescrollbar'

  import 'codemirror/addon/search/jump-to-line'
  import 'codemirror/addon/search/match-highlighter'
  import 'codemirror/addon/search/matchesonscrollbar.css'
  import 'codemirror/addon/search/matchesonscrollbar'
  import 'codemirror/addon/search/search'
  import 'codemirror/addon/search/searchcursor'

  import 'codemirror/addon/selection/active-line'
  import 'codemirror/addon/selection/mark-selection'
  import 'codemirror/addon/selection/selection-pointer'

  import 'codemirror/addon/wrap/hardwrap'

  import 'codemirror/mode/meta'
  import 'codemirror/mode/javascript/javascript'

  import 'codemirror/addon/merge/merge.css'
  import 'codemirror/addon/merge/merge'

  // Google DiffMaGtchPatch
  import DiffMatchPatch from 'diff-match-patch'

  import {codemirror} from 'vue-codemirror'
  import CMAssist from '../components/CMAssist'

  global.CodeMirror = CodeMirror

  // DiffMatchPatch config with global
  global.diff_match_patch = DiffMatchPatch
  global.DIFF_DELETE = -1
  global.DIFF_INSERT = 1
  global.DIFF_EQUAL = 0

  export default {
    components: {
      'v-code-mirror': codemirror
    },

    data() {
      return {
        mirrorText: '',
        instance: null,
        mirrorMerge: false,
        mirrorOptions: {}
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
      merge: {
        type: Boolean,
        default: false
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
      onReady(cm) {
        this.instance = new CMAssist(cm, this.assistEvents, this.assistOptions)
        this.$emit('ready', this.instance)
      }
    },

    mounted() {

    },

    beforeMount() {
      let extraKeys = Object.assign({
        //http://codemirror.net/doc/manual.html#commands
        'Ctrl-K': 'toMatchingTag',
        'Ctrl-J': 'autocomplete',
        'Ctrl-Q': 'toggleFold'
      }, this.options.extraKeys || {})

      this.mirrorText = this.code
      this.mirrorMerge = this.merge
      this.mirrorOptions = Object.assign({
        autofocus: false,
        lineNumbers: false,
        matchBrackets: true,
        theme: 'lemon',
        styleActiveLine: false,
        readOnly: false,
        mode: 'text/x-markdown',
        autoCloseBrackets: true,
        autoCloseTags: true,
        lineWrapping: true,
        foldGutter: true,
        content: '',
        scrollbarStyle: 'null', //native
        gutters: [],
        matchTags: {
          bothTags: true
        }
      }, this.options, {
        extraKeys: extraKeys
      })
    }
  }
</script>

<!--
  usage:
  <codemirror @ready="onReady">
  </codemirror>

  import codemirror from '../components/Codemirror'
  export default {
    components: {
      codemirror
    },
    data() {
      return {
      }
    },
    methods: {
      onReady(mirror) {

      }
    },
    mounted() {
    }
  }
-->
