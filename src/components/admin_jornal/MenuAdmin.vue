<template>
  <div>
    <v-card height="50px">
      <v-layout>
        
        <v-flex offset-xs1 xs4 v-for="(item, index) in menuItems" :key="index" >
          <v-btn color="dark" flat value="newJornal" :to="item.router">
            <span>{{item.title}}</span>
          </v-btn>
        </v-flex>
         
                 
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),

  computed: {
    menuItems() {
      return [
        {
          title: "Новый объект",  
          router: "/CreateObj"
        },
        {
          title: "Отчеты",
          router: "/Otchet"
        },
        {
          title: "Информации о контролерах",
          router: "/Controllers"
        }
      ];
    }
  }
};
</script>
 