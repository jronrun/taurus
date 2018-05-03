<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  /*

  import Layout from './Layout'
  export default {
    components: {
      'layout': Layout
    },
    data: () => ({
    })
  }
  or
  import Layout from './components/Layout'
  Vue.component('layout', Layout)

  Layout.vue
  <template>
  <v-app id="layout">
    <v-navigation-drawer
      fixed
      v-model="drawerRight"
      right
      clipped
      app
    >
      <slot name="slot-drawer-right">
      </slot>
    </v-navigation-drawer>

    <v-toolbar-ext v-if="toolbar"
      color="blue darken-3"
      dark
      fixed
      app
      clipped-right
      :visible="toolbar"
    >
      <slot name="slot-toolbar">
      </slot>
    </v-toolbar-ext>

    <v-navigation-drawer
      stateless
      hide-overlay
      :mini-variant="drawerMini"
      v-model="drawer"
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img v-if="drawerAvatarUrl" :src="drawerAvatarUrl"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="drawerTitle">{{drawerTitle}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="drawerMini = !drawerMini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <slot name="slot-drawer">
      </slot>
    </v-navigation-drawer>

    <v-navigation-drawer
      temporary
      v-model="left"
      fixed
      :permanent="left"
    >
      <slot name="slot-left">
      </slot>
    </v-navigation-drawer>

    <v-content>
      <slot>
      </slot>
    </v-content>

    <v-navigation-drawer
      right
      temporary
      v-model="right"
      fixed
      hide-overlay
      :permanent="right"
      :width="rightWidth"
    >
      <slot name="slot-right">
      </slot>
    </v-navigation-drawer>

    <v-footer v-if="footer"
      color="blue darken-3"
      class="white--text"
      app
    >
      <slot name="slot-footer">
      </slot>
    </v-footer>
  </v-app>
</template>

<script>
  import VToolbarExt from './VToolbarExt';

  export default {
    components: {
      'v-toolbar-ext': VToolbarExt
    },
    data: () => ({
      rightWidth: global.helper.viewport().width / 2
    }),
    computed: {

    },
    watch: {

    },
    mounted() {
      // https://stackoverflow.com/questions/47219272/how-can-i-use-window-size-in-a-vue-method
      let that = this;
      this.$nextTick(function() {
        window.addEventListener('resize', () => {
          that.rightWidth = global.helper.viewport().width / 2;
        });
      });
    },
    props: {
      toolbar: {
        type: Boolean,
        default: false
      },
      drawer: {
        type: Boolean,
        default: false
      },
      drawerAvatarUrl: {
        type: String,
        default: ''
      },
      drawerTitle: {
        type: String,
        default: ''
      },
      drawerMini: {
        type: Boolean,
        default: false
      },
      left: {
        type: Boolean,
        default: false
      },
      drawerRight: {
        type: Boolean,
        default: false
      },
      right: {
        type: Boolean,
        default: false
      },
      footer: {
        type: Boolean,
        default: false
      }
    }
  }
</script>


APage.vue
<template>
  <layout
    :toolbar="toolbar"
    :left="left"
    :right="right"
    :drawer="drawer"
    :drawerRight="drawerRight"
    :footer="footer"
  >

    <template slot="slot-drawer">
      <v-list class="pt-0" dense>
        <v-divider>
        </v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer Left</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </template>

    <template slot="slot-drawer-right">
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </template>

    <template slot="slot-toolbar">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight">
      </v-toolbar-side-icon>
    </template>




    <v-card>
      <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>

    <v-toolbar-side-icon @click.stop="right = !right">
    </v-toolbar-side-icon>

    <v-toolbar-side-icon @click.stop="toolbar = !toolbar">
    </v-toolbar-side-icon>

    <v-toolbar-side-icon @click.stop="left = !left">
    </v-toolbar-side-icon>

    <v-card>
      <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>

  </layout>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      right: false,
      left: false,
      toolbar: false,
      footer: false,
      items: [
        {title: 'Home', icon: 'dashboard'},
        {title: 'About', icon: 'question_answer'}
      ]
    })
  }
</script>

   */
</style>
