<template>
   <div>
      
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
  data: () => ({
		
      everydays: ['Management', 'Settings'],	
      permanents: ['Settings', 'jornal'],
      completed: ['one', 'two'],
      offsetTop: 0
    }),
    
    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      }
    }
}
</script>