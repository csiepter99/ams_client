<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              v-model="studentId"
                              prepend-icon="mdi-account"
                              name="studentId"
                              label="Student Id"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              v-model="password"
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import {login} from '../apis/auth'

export default {
  name: 'LoginView',
  data: () => ({
     studentId: "",
     password: "",
  }),
  methods: {
     login() {
        login(this.studentId, this.password).then((response) => {
            this.$store.dispatch('auth/setAuth', {
                token: response.data.access_token,
                isLogin: true,
                roles: response.data.roles.replace('[', '').replace(']', '').split(', '),
                studentId: this.studentId,
                name: response.data.name
            });

            this.studentId = "";
            this.password = "";
            this.$router.replace({ path: '/assets' }).catch(err => {err});
        });
     }
  }
}
</script>
