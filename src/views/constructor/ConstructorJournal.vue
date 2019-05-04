<template>
    <div>
        <menu-constructor></menu-constructor>
        <v-container grid-list-md text-xs-center>
            <v-layout>
                <v-flex>
                    <table-journal-schemes :journals="journals" @sayParent="selectJournalScheme"></table-journal-schemes>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                    <div v-if="selectedJournalScheme != -1">
                        <table-all-journal-schemes :allJournalSchemes="journals[selectedJournalScheme].fields"></table-all-journal-schemes>
                    </div>
                    <div v-else>
                        <table-all-journal-schemes :allJournalSchemes="[]"></table-all-journal-schemes>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-md text-xs-center>
            <div v-if="selectedJournalScheme!=-1">
                <dialog-add-journal-scheme :idSelectedJournalScheme="journals[selectedJournalScheme]._id"> </dialog-add-journal-scheme>
            </div>
            <div v-else>
                <dialog-add-journal-scheme :idSelectedJournalScheme="selectedJournalScheme"> </dialog-add-journal-scheme>
            </div>                     
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import MenuConstructor from '@/components/constructor/MenuConstructor'
import DialogAddJournalScheme from '@/components/constructor/journals/DialogAddJournalScheme.vue'
import TableJournalSchemes from '@/components/constructor/journals/TableJournalSchemes.vue'
import TableAllJournalSchemes from '@/components/constructor/journals/TableAllJournalSchemes.vue'
export default {
    components: {
        MenuConstructor,
        DialogAddJournalScheme,
        TableJournalSchemes,
        TableAllJournalSchemes
    },

    data: () => ({       
        journals: [],
        selectedJournalScheme: -1,
    }),

    mounted() {
        axios
            .get('http://localhost:8080/api/v1/scheme/journal')
            .then(response => (
                this.journals = response.data,
                global.console.log('one',response.data) 
            ))
            .catch(error => global.console.log(error));
    },

    methods: {
        selectJournalScheme (data) {
            this.selectedJournalScheme = Number(data.selectedJournalScheme)
        }  
    }

    
}
</script>
