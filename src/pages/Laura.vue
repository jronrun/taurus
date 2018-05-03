<template>
  <v-app id="laura">
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
          <v-icon dark>language</v-icon>
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
          <v-icon dark>format_paint</v-icon>
        </v-btn>
        <v-list>
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
      fixed
      v-model="drawer"
      app
    >
    </v-navigation-drawer>

    <v-content>

    </v-content>

    <v-navigation-drawer
      right
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
    data () {
      return {
        dark: false,
        theme: helper.theme(),
        mini: false,
        drawer: true,
        right: false,
        locales: global.config.locales,
        colors: global.config.colors
      }
    },
    methods: {
      chgLocale (to, preview = false) {
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
