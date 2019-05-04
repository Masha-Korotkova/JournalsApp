<template>
    <div>
        <menu-constructor></menu-constructor>
        <v-container grid-list-md text-xs-center>
            <v-layout>
                <v-flex>
                    <table-schemes :objects="objects" @sayParent="selectItemScheme"></table-schemes>             
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
            <div v-if="selectedScheme!=-1">
                <dialog-add-schemes @sayParent="update" :idSelectedScheme="objects[selectedScheme]._id" ></dialog-add-schemes> 
            </div>
            <div v-else>
                <dialog-add-schemes @sayParent="update" :idSelectedScheme="selectedScheme" ></dialog-add-schemes>
            </div>                      
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import TableAllSchemes from '@/components/constructor/item/TableAllSchemes.vue'
import DialogAddSchemes from '@/components/constructor/item/DialogAddSchemes.vue'
import MenuConstructor from '@/components/constructor/MenuConstructor'
import TableSchemes from '@/components/constructor/item/TableSchemes.vue'

export default {

    components: {
        TableAllSchemes,
        DialogAddSchemes,
        MenuConstructor,
        TableSchemes
    },

    data: () => ({       
        objects: [],
        selectedScheme: -1,
    }),

    mounted() {
        axios
            .get('http://localhost:8080/api/v1/scheme/item')
            .then(response => (
                this.objects = response.data 
                //global.console.log(response.data)
            ))
            .catch(error => global.console.log(error))
    },

    methods: {
        addScheme (data) {
            this.objects.push({
                fields: data.newScheme.fields,
                name: data.newScheme.name,
                title: data.newScheme.title,
                id: data.newScheme.id                
            });
        },
        selectItemScheme (data) {
            global.console.log('sitem')
            this.selectedScheme = Number(data.selectedScheme)
        },
        update(data) {
            if(data.update === 1) {
                global.console.log('update')
                axios
                    .get('http://localhost:8080/api/v1/scheme/item')
                    .then(response => (
                        this.objects = response.data 
                        //global.console.log(response.data)
                    ))
                    .catch(error => global.console.log(error))
            }
            
        }        
    }    
}
</script>

<style>

</style>

