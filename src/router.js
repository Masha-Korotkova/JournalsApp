import Vue from 'vue'
import Router from 'vue-router'
import ConstructorScheme from '@/views/constructor/ConstructorScheme.vue'
import ConstructorJournal from '@/views/constructor/ConstructorJournal.vue'
import ConstructorReport from '@/views/constructor/ConstructorReport.vue'
import Otchet from '@/views/admin_jornal/Otchet.vue'
import Controllers from '@/views/admin_jornal/Controllers.vue'
import CreateObj from '@/views/admin_jornal/CreateObj.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ConstructorScheme',
      name: 'ConstructorScheme',
      component: ConstructorScheme
    },
    {
      path: '/ConstructorJournal',
      name: 'ConstructorJournal',
      component: ConstructorJournal
    },
    {
      path: '/ConstructorReport',
      name: 'ConstructorReport',
      component: ConstructorReport
    },
    {
      path: '/Otchet',
      name: 'Otchet',
      component: Otchet
    },
    {
      path: '/Controllers',
      name: 'Controllers',
      component: Controllers
    },	
    {
      path: '/CreateObj',
      name: 'CreateObj',
      component: CreateObj
    }	   	  
  ],
  mode: 'history'
})
