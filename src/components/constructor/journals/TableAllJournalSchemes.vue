<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Journal scheme fields</v-toolbar-title>
        </v-toolbar>
        <v-data-table :headers="headersTable" :items="allJournalSchemes" class="elevation-1">
            <template v-slot:items="props">
                <td>
                    {{ props.item.name }}
                </td>
                <td>
                    {{ props.item.title }}
                </td>
                <td>
                    {{ props.item.type }}
                </td>
                <td>
                    {{props.item.computed }}
                </td>
                <td>
                    {{ props.item.if }}
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
//import axios from 'axios';
export default {
    
    props: ['allJournalSchemes','selectedJournalScheme'],

    data: () => ({
        headersTable: [
            
            {
                text: 'Name',
                align: 'center',
                sortable: false,
                value: 'nameField'
            },
            {
                text: 'Title',
                align: 'center',
                sortable: false,
                value: 'titleField'

            },
            {
                text: 'Type',
                align: 'center',
                sortable: false,
                value: 'typeField'
            },
            {
                text: 'Computed',
                align: 'center',
                sortable: false,
                value: 'computedField'
            },
            {
                text: 'Conditional',
                align: 'center',
                sortable: false,
                value: 'conditionalField'
            },      
        ],
    }),
}
</script>