<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Schemes</v-toolbar-title>
        </v-toolbar>
        <v-data-table :headers="headers" :items="objects" class="elevation-1">
            <template v-slot:items="props">  
                <td>
                    <br>
                    <v-radio-group v-model="selectedScheme" @click="sayParent()">
                    <v-radio :value="objects.findIndex(i=>i._id === props.item._id)"
                    ></v-radio>
                    </v-radio-group>
                </td>     
                <td> {{ props.item.name }} </td>
                <td> {{ props.item.title }} </td>                        
            </template>
        </v-data-table>

    </div>
</template>

<script>
export default {
    props: ['objects'],
    data: () => ({
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
    methods: {
        sayParent() {
            this.$emit('sayParent', {
                selectedScheme: this.selectedScheme
            })
        }
    }
    
}
</script>

