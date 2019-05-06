<template>
  <v-container>
    <v-layout align-content-center>
      <v-flex xs6 offset-xs3 lg3>
        <v-titel class="headline">Выберите шаблон объекта:</v-titel>
      </v-flex>

      <v-flex v-if="itemschems" lg3>
        <v-select :items="Select()" label="Виды объектов" outline></v-select>
      </v-flex>
    </v-layout>
    
    <v-layout align-content-center>
      <v-flex xs6 offset-xs3 lg3>
        <v-titel class="title">{{currentitem.title}}</v-titel>
      </v-flex>
      <v-flex lg3>
        <v-text-field single-line outline></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    itemschems: [],
    currentitem: []
  }),
  created() {
    Axios.get("https://rep.moeka.host/api/v1/scheme/item")
      .then(res => {
        this.itemschems = res.data;
      })
      .catch(alert);
  },
  methods: {
    SelectTitel() {
      return this.itemschems.map(function(item) {
        return item.title;
      });
    },
    Select() {
      return this.itemschems.map(function(item) {
        return item.fields.title[0];
      });
    }
  }
};
</script>