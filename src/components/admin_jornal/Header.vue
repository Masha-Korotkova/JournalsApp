<template>
  <div>
      <v-toolbar dark class="primary">				
        <v-spacer></v-spacer>
        <v-toolbar-title>Контролер </v-toolbar-title>
              
          <v-btn flat :to="'/router'"> Выйти 
            <v-icon right v-html="'exit_to_app'"></v-icon>
          </v-btn>
      </v-toolbar>
    </div>
</template>   

<script>
export default {
    data: () => ({
      route: '/'
    })
}
</script>
>