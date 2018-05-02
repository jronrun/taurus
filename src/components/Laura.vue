<template>
  <layout
    :toolbar="toolbar"
    :left="left"
    :right="right"
    :drawer="drawer"
    :drawerRight="drawerRight"
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

    <v-toolbar-side-icon @click.stop="toolbar = !toolbar">
    </v-toolbar-side-icon>

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
      items: [
        {title: 'Home', icon: 'dashboard'},
        {title: 'About', icon: 'question_answer'}
      ]
    })
  }
</script>
