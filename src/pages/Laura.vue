<template>
  <v-app id="laura" :dark="dark">
    <v-toolbar
      :class="theme"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-toolbar-title>{{$t("Home")}}</v-toolbar-title>
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
            @click.native="chgLocale(lang.value)"
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
            @click.native="chgTheme(aColor)"
          >
          </v-list-tile>
        </v-list>
      </v-menu>
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
        <v-list-tile v-for="item in items" :key="item.title" @click="">
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

  export default {
    data() {
      return {
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
      chgLocale(to, preview = false) {
        if (true !== preview) {
          helper.locale(to)
        }
        this.$i18n.locale = to;
      },
      chgTheme(to, preview = false) {
        if (true !== preview) {
          helper.theme(to)
        }
        this.theme = to;
      }
    },
    mounted() {
    }
  }
</script>
