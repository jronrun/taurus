<template>
  <v-app id="laura" :dark="dark">
    <v-toolbar
      :class="theme"
      dark
      fixed
      app
      clipped-right
      ref="header"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-toolbar-title>{{$t(" ")}}</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-menu offset-y>
        <v-btn icon dark slot="activator">
          <v-tooltip bottom>
            <v-icon dark slot="activator">language</v-icon>
            <span>{{$t("Language")}}</span>
          </v-tooltip>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="lang in locales"
            :key="lang.value"
            @mouseover.native="chgLocale(lang.value, true)"
            @click="chgLocale(lang.value)"
          >
            <v-list-tile-title>{{lang.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <v-btn icon dark slot="activator">
          <v-tooltip bottom>
            <v-icon dark slot="activator">format_paint</v-icon>
            <span>{{$t("Theme")}}</span>
          </v-tooltip>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-tooltip top>
              <v-switch
                slot="activator"
                v-model="dark"
                :dark="dark"
                color="red darken-3"
                hide-details
              >
              </v-switch>
              <span>{{$t("Toggle Light & Dark Theme")}}</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile
            v-for="aColor in colors"
            :key="aColor"
            :class="aColor"
            @mouseover.native="chgTheme(aColor, true)"
            @click="chgTheme(aColor)"
          >
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      stateless
      hide-overlay
      :mini-variant.sync="drawerMini"
      v-model="drawer"
      :dark="dark"
      fixed
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="drawerMini = !drawerMini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider>
        </v-divider>
        <v-list-tile v-for="item in []" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>

      <v-container fill-height :style="style.container">
        <v-layout wrap :style="style.layout">
          <v-flex xs12 :style="style.flex">
            <v-card dark :style="style.card">
              <notemirror @ready="onReady">
              </notemirror>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

    </v-content>

    <v-navigation-drawer
      right
      :dark="dark"
      temporary
      v-model="right"
      fixed
    >
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  import helper from '../helper'
  import notemirror from '../components/Notemirror'

  export default {
    components: {
      notemirror
    },
    data() {
      return {
        instance: null,
        style: {
          layout: {
            margin: 0,
            padding: 0
          },
          container: {
            padding: 0,
            margin: 0
          },
          flex: {
            padding: 0
          },
          card: {
            height: '100%'
          }
        },
        dark: false,
        theme: helper.theme(),
        drawerMini: false,
        drawer: false,
        right: false,
        locales: global.config.locales,
        colors: global.config.colors
      }
    },
    methods: {
      onReady(mirror) {
        let mirrorH = this.$vuetify.breakpoint.height - this.$refs.header.computedHeight
        mirror.setSize(null, mirrorH)
        mirror.chgStyle({padding: '8px'})
        mirror.mapPredefineKeys()
        this.instance = mirror

        //TODO rem
        window.mirror=mirror
      },
      setContainerWidth(setHalfWidth = false) {
        let aContainerW = this.$vuetify.breakpoint.width / (setHalfWidth ? 2 : 1)
        this.style.container['max-width'] = `${aContainerW}px`
      },
      chgLocale(to, preview = false) {
        if (true !== preview) {
          helper.locale(to)
        }
        this.$i18n.locale = to
      },
      chgTheme(to, preview = false) {
        if (true !== preview) {
          helper.theme(to)
        }
        this.theme = to
      },

      initRestore() {
        let that = this
        let restoreKey = 'mirror_restore_data'
        this.instance.state(pi.store(restoreKey))

        window.onbeforeunload = function(){
          pi.store(restoreKey, that.instance.state())
        }
      }
    },
    mounted() {
      this.setContainerWidth()
      this.initRestore()
    }
  }
</script>
