<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Journal schemes</v-toolbar-title>
        </v-toolbar>
        <v-data-table :headers="headers" :items="journals" class="elevation-1">
            <template v-slot:items="props">  
                <td>
                    <br>
                    <v-radio-group v-model="selectedJournalScheme" @click="sayParent()">
                    <v-radio :value="journals.findIndex(i=>i._id === props.item._id)"
                    ></v-radio>
                    </v-radio-group>
                </td>     
                <td> {{ props.item.name }} </td>
                <td> {{ props.item.title }} </td> 
                <td> {{ props.item.daily }} </td>
                <td> {{ props.item.fixed }} </td> 
                <td> {{ props.item.item }} </td> 
                <td> {{ props.item.item_info }} </td>                        
            </template>
        </v-data-table>

    </div>
</template>

<script>
export default {
    props: ['journals'],
    data: () => ({
        selectedJournalScheme: -1,
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
                text: 'Daily/',
                align: 'center',
                sortable: false,
                value: 'title'
            },
            {
                text: 'Fixed/',
                align: 'center',
                sortable: false,
                value: 'title'
            },
            {
                text: 'Object',
                align: 'center',
                sortable: false,
                value: 'title'
            },
            {
                text: 'Object Information',
                align: 'center',
                sortable: false,
                value: 'title'
            },
        ]
    }),
    methods: {
        sayParent() {
            this.$emit('sayParent', {
                selectedJournalScheme: this.selectedJournalScheme
            })
        }
    }
    
}
</script>