<template>
  <v-container>
    <v-layout align-content-center>
      <v-flex xs6 offset-xs3 lg3>
        <v-titel class="headline">Выберити шаблон объекта:</v-titel>
      </v-flex>

      <v-flex lg3>
        <v-select :items="tipe" label="Виды объектов" outline></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tipe: []
  })
};
</script>