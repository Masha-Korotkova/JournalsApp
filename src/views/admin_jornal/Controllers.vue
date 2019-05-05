<template>
   <div>
     <Header></Header>
     <menu-admin></menu-admin>
      <controller></controller>
   </div> 
</template>

<script>
import Header from '@/components/admin_jornal/Header.vue'
import MenuAdmin from '@/components/admin_jornal/MenuAdmin.vue'
import Controller from '@/components/admin_jornal/Controller.vue'

export default {
  components: {
    Header,
    MenuAdmin,
    Controller
  }
}
</script>