<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list
        nav  
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            link
            :to="item.route"
          >
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Asset Manage System</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
        menuItems: [
            { title: "財產清單", route: "/assets" },
            { title: "待購清單", route: "/purchse" }
        ],
        drawer: null,
        group: null,
    }),
    watch: {
        group() {
            this.drawer = false;
        },
    },
}
</script>

<style>
</style>