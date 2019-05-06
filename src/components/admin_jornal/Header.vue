<template>
  <div>
    <v-toolbar dark class="primary">
      <v-spacer></v-spacer>
      <div v-if="user != null">
        <v-toolbar-title>{{user.first_name}}</v-toolbar-title>
      </div>
      <v-btn flat :to="'/router'">
        Выйти
        <v-icon right v-html="'exit_to_app'"></v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>   

<script>
import Axios from "axios";
export default {
  data: () => {
    return {
      router: "/",
      user: null
    };
  },

  created() {
    Axios.get(
      "https://rep.moeka.host/api/v1/controller/5cb593c1cb09f25d32da23ec"
    )
      .then(res => {
        this.user = res.data;
      })
      .catch(alert);
  }
};
</script>
