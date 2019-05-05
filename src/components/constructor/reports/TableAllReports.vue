<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Report fields</v-toolbar-title>
        </v-toolbar>
        <v-data-table :headers="headersTable" :items="allReports" class="elevation-1">
            <template v-slot:items="props">
                <td>
                    {{ props.item.title }}
                </td>
                <td>
                    {{ props.item.value }}
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
//import axios from 'axios';
export default {
    
    props: ['allReports','selectedReportScheme'],

    data: () => ({
        headersTable: [
            {
                text: 'Title',
                align: 'center',
                sortable: false,
                value: 'titleField'

            },
            {
                text: 'Value',
                align: 'center',
                sortable: false,
                value: 'val'
            },    
        ],
    }),

}
</script>