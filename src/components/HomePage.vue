<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            link
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Asset Manage System</v-toolbar-title>
      <v-spacer />
      <v-btn @click="logOut">Log out</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import store from '@/store';
  export default {
    data: () => ({
        menuItems: [],
        drawer: null,
        group: null,
    }),
    watch: {
        group() {
            this.drawer = false;
        },
    },
    created() {
      this.menuItems.push(
        { title: "財產清單", route: "/assets" },
        { title: "待購清單", route: "/purchse" },
      )
      if (store.state.auth.roles.includes('ROLE_GENERAL_AFFAIRS')) {
        this.menuItems.push(
          { title: "成員管理", route: "/member" }
      )
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/setAuth', {
                token: '',
                isLogin: false,
                roles: [],
                studentId: '',
                name: ''
            });
        this.$router.go('/');
      }
    }
}
</script>

<style>
</style>