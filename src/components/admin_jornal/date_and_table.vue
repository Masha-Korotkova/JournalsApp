<template>
  <div>
      <v-container right grid-list-md>
        <v-layout row wrap>
        <v-title>Журнал</v-title>

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
                  label="Date"
                  persistent-hint
                  prepend-icon="event"
                  @blur="date1 = parseDate(computedDateFormatted)"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
                <v-date-picker v-model="date1" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>

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
                    persistent-hint
                    prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
          </v-flex>   
          <v-btn  color="primary">Вывести отчет</v-btn>
        </v-layout>
        
        <v-data-table
          :headers="headers"
          :items="jornal"
          class="flex"
          
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
    </div>
</template>   

<script>
export default {
    data: vm => ({
			
      date: new Date().toISOString().substr(0, 10),
      date1: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      Formatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
			menu1: false,
			menu2: false
		
	}),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date1)
      }
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
        this.Formatted = this.formatDate(this.date1)
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
