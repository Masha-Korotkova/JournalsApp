<template>
   <div>
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
   </div>
</template>

<script>

export default {
    data () {
      return {
        
      }
}
}
</script>