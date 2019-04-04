<template>
    <div>
        <menu-constructor></menu-constructor>
        <v-container grid-list-md text-xs-center>
            <v-layout>
                <v-flex>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Schemes</v-toolbar-title>
                     </v-toolbar>
                        <v-data-table
                            :headers="headers"
                            :items="objects"
                            class="elevation-1"
                        >
                            <template v-slot:items="props">  
                                <td>
                                    <br>
                                    <v-radio-group v-model="selectedScheme">
                                    <v-radio
                                    :value="props.item.id"
                                    ></v-radio>
                                    </v-radio-group>
                                </td>     
                                <td> {{ props.item.name }} </td>
                                <td> {{ props.item.title }} </td>                        
                            </template>
                        </v-data-table>
                    
                </v-flex>
                <v-flex>
                    <div v-if="selectedScheme != -1">
                    <table-all-schemes :allSchemes="objects[selectedScheme].fields"></table-all-schemes>
                    </div>
                    <div v-else>
                        <table-all-schemes :allSchemes="[]"></table-all-schemes>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        
        <v-container grid-list-md text-xs-center>
            <dialog-add-schemes :addScheme="addScheme"></dialog-add-schemes>                       
        </v-container>
    </div>
</template>

<script>
//import axios from 'axios';
import TableAllSchemes from '@/components/constructor/TableAllSchemes.vue'
import DialogAddSchemes from '@/components/constructor/DialogAddSchemes.vue'
import MenuConstructor from '@/components/constructor/MenuConstructor'

export default {

    components: {
        TableAllSchemes,
        DialogAddSchemes,
        MenuConstructor
    },

    data: () => ({       
        objects: [ ],
        selectedScheme: -1,
        headers: [
            {
                sortable: false,
            },
            {
                text: 'Name Scheme',
                align: 'center',
                sortable: false,
                value: 'name'
            },
            {
                text: 'Title Scheme',
                align: 'center',
                sortable: false,
                value: 'title'
            },
        ]
    }),

    mounted() {
        /*axios
            .get('http://localhost:8080/api/v1/scheme/item')
            .then(function (response) {
                // handle success
                global.console.log(response);
            })*/
    },

    methods: {
        addScheme (data) {
            this.objects.push({
                fields: data.newScheme.fields,
                name: data.newScheme.name,
                title: data.newScheme.title,
                id: data.newScheme.id                
            });
        }        
    }    
}
</script>

<style>

</style>

