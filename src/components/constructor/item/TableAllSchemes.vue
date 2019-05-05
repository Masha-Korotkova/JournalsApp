<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Scheme fields</v-toolbar-title>
        </v-toolbar>
        <v-data-table :headers="headersTable" :items="allSchemes" class="elevation-1">
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
            </template>
        </v-data-table>
    </div>
</template>

<script>
//import axios from 'axios';
export default {
    
    props: ['allSchemes','selectedScheme'],

    data: () => ({
        headersTable: [
            
            {
                text: 'Name field',
                align: 'center',
                sortable: false,
                value: 'nameField'
            },
            {
                text: 'Title field',
                align: 'center',
                sortable: false,
                value: 'titleField'

            },
            {
                text: 'Type field',
                align: 'center',
                sortable: false,
                value: 'typeField'
            },    
        ],
    }),
    created() {
        /*axios.get('http://localhost:8080/api/v1/scheme/item')
            .then(responce => {
                global.console.log(responce.data);

            });*/
    }
}
</script>

