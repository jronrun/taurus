<template>
  <div :id="mergeId">
    <v-code-mirror :merge="true"
                   :options="mergeOptions"
                   @cursorActivity="onCmCursorActivity"
                   @ready="onReady"
                   @focus="onCmFocus"
                   @blur="onCmBlur"
                   @input="onCmInput"
                   @scroll="onCmScroll">
    </v-code-mirror>
  </div>
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
  import MVAssist from '../components/MVAssist'

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
        instance: null,
        mergeId: '',
        mergeOptions: {}
      }
    },

    computed: {},

    props: {
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
      onCmCursorActivity(a, b, c) {
        this.$emit('onCmCursorActivity', a, b, c)
      },
      onReady(instanceOfMergeView) {
        this.instance = new MVAssist(instanceOfMergeView, this.assistEvents, this.assistOptions)
        this.mergeId = this.instance.elementId
        this.$emit('ready', this.instance)
      },
      onCmFocus(a, b, c) {
        this.$emit('onCmFocus', a, b, c)
      },
      onCmBlur(a, b, c) {
        this.$emit('onCmBlur', a, b, c)
      },
      onCmInput(code) {
        this.$emit('onCmInput', code)
      },
      onCmScroll() {
        this.$emit('onCmScroll')
      }
    },

    mounted() {

    },

    beforeMount() {
      // panels 2: value orig, panels 3: origLeft value orig
      this.mergeOptions = Object.assign({
        origLeft: undefined,
        value: '',
        orig: '',

        connect: null,
        mode: '',
        lineNumbers: true,
        revertButtons: true,
        showDifferences: true,
        highlightDifferences: true,
        collapseIdentical: false,
        allowEditingOriginals: true
      }, this.options)

    }
  }
</script>
