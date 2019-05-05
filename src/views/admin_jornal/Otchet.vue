<template>
   <div>
     <Header></Header>
     <menu-admin></menu-admin>
      <v-container right grid-list-md> 
        <date-table></date-table> 
      </v-container>
     <v-layout column><right-menu></right-menu> </v-layout>
   </div> 
</template>

<script>
import Header from '@/components/admin_jornal/Header.vue'
import MenuAdmin from '@/components/admin_jornal/MenuAdmin.vue'
import DateTable from '@/components/admin_jornal/date_and_table.vue'
import RightMenu from '@/components/admin_jornal/RightMenu.vue'

export default {
  components: {
    Header,
    MenuAdmin,
    DateTable,
    RightMenu
  }
}
</script>
 