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

    <v-toolbar-ext
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
      :mini-variant.sync="drawerMini"
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
    >
      <slot name="slot-left">
      </slot>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>

            <slot>
            </slot>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer
      right
      temporary
      v-model="right"
      fixed
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
    }),
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
