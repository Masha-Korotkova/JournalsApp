<template>
  <div>
      <v-toolbar dark class="primary">				
        <v-spacer></v-spacer>
        <v-toolbar-title lg2>Контролер </v-toolbar-title>
              
          <v-btn flat :to="'/router'"> Выйти 
            <v-icon right v-html="'exit_to_app'"></v-icon>
          </v-btn>
      </v-toolbar>
        
      <v-card height="50px">
       <v-layout>
          <v-flex offset-xs1 xs4>
            <v-btn
              color="dark"
              flat
              value="newJornal"
            >
              <span>Создать журнал по новому объекту</span> 
            </v-btn>
          </v-flex>

          <v-flex offset-xs1  xs4>
            <v-btn
              color="dark"
              flat
              value="watchReport"
            >
              <span>Просмотр отчетов по журналам</span>              
            </v-btn>
          </v-flex>

          <v-flex offset-xs1 xs4>
            <v-btn
              color="dark"
              flat
              value="kontrollers"
            >
              <span>Внесение информации о контролерах</span>
              
             </v-btn>
           </v-flex>
         </v-layout>  
       </v-card>
    
      <v-container right grid-list-md>
        <v-layout  >
        <v-title>Журнал</v-title>
          <v-flex xs3 lg4>
            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="20"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    
                    persistent-hint
                    prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
   
          </v-flex>

          <v-flex xs3 lg4>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="20"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="Date "
                  
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
                <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>   
          <v-btn  color="primary">Вывести отчет</v-btn>
        </v-layout>
        
      
        <v-data-table
          :headers="headers"
          :items="desserts"
          class ="elevation-1"
          
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </template>
        </v-data-table>
      
      </v-container>
  
  
    <v-navigation-drawer
      stateless
      value="true"
    >

      <v-list>
        <v-list-group
                id="scroll-target"
                style="max-height: 400px"
                class="scroll-y"
                no-action
                sub-group
                value="true"           
    >
      <v-layout
        v-scroll:#scroll-target="onScroll"
        column
        align-center
        justify-center     
      >
      </v-layout>

              
        
          <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Ежедневные журналы</v-list-tile-title>
              </v-list-tile>
          </template>
  
          <v-list-tile
              v-for="(everyday, i) in everydays"
              :key="i"
              @click=""
            >  
            <v-list-tile-title v-text="everyday"></v-list-tile-title>           
          </v-list-tile>
          </v-list-group>

          <v-list-group
                sub-group 
                no-action 
                id="scroll-target"
                style="max-height: 400px"
                class="scroll-y"  
              >
          <v-layout
            v-scroll:#scroll-target="onScroll"
            column
            align-center
            justify-center     
          >
          </v-layout>
    
        
          <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Дополнительные журналы</v-list-tile-title>
              </v-list-tile>
          </template>

          <v-list-tile
              v-for="(permanent, i) in permanents"
              :key="i"
              @click=""
            >
            <v-list-tile-title v-text="permanent"></v-list-tile-title>           
          </v-list-tile>
          </v-list-group>

          <v-list-group
                sub-group 
                no-action 
                id="scroll-target"
                style="max-height: 400px"
                class="scroll-y"   
              >

            <v-layout
              v-scroll:#scroll-target="onScroll"
              column
              align-center
              justify-center     
          >
          </v-layout>
        
          <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Завершенные журналы</v-list-tile-title>
              </v-list-tile>
          </template>

          <v-list-tile
              v-for="(finished, i) in completed"
              :key="i"
              @click=""
            >
            <v-list-tile-title v-text="finished"></v-list-tile-title>           
          </v-list-tile>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {

	data: vm=> ({
		
      everydays: ['Management', 'Settings', 'test'],	
      permanents: ['Settings', 'jornal'],
      completed: ['one', 'two'],
      offsetTop: 0,
			date: new Date().toISOString().substr(0, 10),
			dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
			menu1: false,
			menu2: false
		
	}),

  methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      }
    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  
  }
</script>