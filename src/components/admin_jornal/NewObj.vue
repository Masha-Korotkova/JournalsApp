<template>
  <v-container>
    <v-layout align-content-center>
      <v-flex xs6 offset-xs3 lg3>
        <v-titel class="headline">Выберите шаблон объекта:</v-titel>
      </v-flex>

      <v-flex v-if="ItemScheme" lg3>
        <v-select :items="SelectTitels()" @change="SetCurrentObject" label="Виды объектов" outline></v-select>
      </v-flex>
    </v-layout>

    <v-layout v-for="(field, index) in CurrentItemFilds" v-bind:key="index" align-content-center>
      <v-flex xs6 offset-xs3 lg3>
        <v-titel class="title">{{field.title}}:</v-titel>
      </v-flex>
      <v-flex lg3>
        <v-flex v-if="field.type == 'Bool' ">
          <input type="checkbox" id="checkbox">
        </v-flex>

        <v-flex v-if="field.type == 'Int' ">
          <v-text-field single-line outline></v-text-field>
        </v-flex>

        <v-flex v-if="field.type == 'Double' ">
          <v-text-field single-line outline></v-text-field>
        </v-flex>

        <v-flex v-if="field.type == 'String' ">
          <v-text-field single-line outline></v-text-field>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    ItemScheme: [],
    CurrentItemFilds: []
  }),
  created() {
    Axios.get("https://rep.moeka.host/api/v1/scheme/item")
      .then(res => {
        this.ItemScheme = res.data;
      })
      .catch(alert);
  },
  methods: {
    SelectTitels() {
      return this.ItemScheme.map(function(item) {
        return item.title;
      });
    },
    SetCurrentObject(value) {
      this.ItemScheme.forEach(item => {
        if (item.title == value) {
          this.CurrentItemFilds = item.fields;
          return;
        }
      });
    }
  }
};
</script>