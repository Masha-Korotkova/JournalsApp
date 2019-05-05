<template>
  <div>
      <v-toolbar dark class="primary">				
        <v-spacer></v-spacer>
        <v-toolbar-title>Контролер </v-toolbar-title>
              
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
        <v-layout row wrap>
        <v-title>Журнал</v-title>
          <v-flex>
            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
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
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
          
              <div>
                <v-btn color="primary">Вывести отчет</v-btn>
              </div>
          </v-flex>

          <v-flex xs12 lg6>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
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
                  label="Date (read only text field)"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
                <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>   
        </v-layout>
        
      <v-layout row wrap>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
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
      </v-layout>
      </v-container>
  
  
    <v-navigation-drawer
      stateless
      value="true"
    >
      <v-list>
        <v-list-group
                no-action
                sub-group
                value="true"
              >
        
          <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Ежедневные журналы</v-list-tile-title>
              </v-list-tile>
          </template>

          <v-list-tile
              v-for="admin in admins"
              :key="admin"
              @click=""
            >
            <v-list-tile-title v-text="admin"></v-list-tile-title>
              <v-list-tile-action>
                
            </v-list-tile-action>
          </v-list-tile>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {

	data() {
		return {
			admins: [
				'Management',
				'Settings'
			],	
			date: new Date().toISOString().substr(0, 10),
			dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
			menu1: false,
			menu2: false
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