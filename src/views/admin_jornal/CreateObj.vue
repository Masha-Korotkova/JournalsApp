<template>
   <div>
     <Header></Header>
     <menu-admin></menu-admin>
      <new-obj></new-obj>
   </div>
</template>

<script>
import Header from '@/components/admin_jornal/Header.vue'
import MenuAdmin from '@/components/admin_jornal/MenuAdmin.vue'
import NewObj from '@/components/admin_jornal/NewObj.vue'

export default {
  components: {
    Header,
    MenuAdmin,
    NewObj
  }
}
</script>