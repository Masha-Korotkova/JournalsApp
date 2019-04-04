import Vue from 'vue'
import Router from 'vue-router'
import ConstructorScheme from '@/views/constructor/ConstructorScheme.vue'
import ConstructorJournal from '@/views/constructor/ConstructorJournal.vue'
import ConstructorReport from '@/views/constructor/ConstructorReport.vue'

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

  ],
  mode: 'history'
})
