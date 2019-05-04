<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Reports</v-toolbar-title>
        </v-toolbar>
        <v-data-table :headers="headers" :items="reports" class="elevation-1">
            <template v-slot:items="props">  
                <td>
                    <br>
                    <v-radio-group v-model="selectedReportScheme" @click="sayParent()">
                    <v-radio :value="reports.findIndex(i=>i._id === props.item._id)"
                    ></v-radio>
                    </v-radio-group>
                </td>     
                <td> {{ props.item.name }} </td>
                <td> {{ props.item.title }} </td>
                <td> {{ props.item.journal }} </td>                        
            </template>
        </v-data-table>

    </div>
</template>

<script>
export default {
    props: ['reports'],
    data: () => ({
        selectedReportScheme: -1,
        headers: [
            {
                sortable: false,
            },
            {
                text: 'Name',
                align: 'center',
                sortable: false,
                value: 'name'
            },
            {
                text: 'Title',
                align: 'center',
                sortable: false,
                value: 'title'
            },
            {
                text: 'Journal',
                align: 'center',
                sortable: false,
                value: 'title'
            },
        ]
    }),
    methods: {
        sayParent() {
            this.$emit('sayParent', {
                selectedReportScheme: this.selectedReportScheme
            })
        }
    }
    
}
</script>