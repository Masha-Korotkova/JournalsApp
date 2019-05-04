<template>
    <v-container fluid grid-list-md>
        <v-data-iterator
        :items="itemScheme.fields"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
        >
            <template v-slot:header>
                <h3> Name: {{ itemScheme.name }} <br> Title: {{ itemScheme.title }} </h3>
            </template>
            <template v-slot:item="props">
                <v-flex xs3>
                    <v-card>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>
                                    Name:
                                </v-list-tile-content>
                                <v-list-tile-content class="align-end">
                                    {{ props.item.name }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    Title:
                                </v-list-tile-content>
                                <v-list-tile-content class="align-end">
                                    {{ props.item.title }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    Type:
                                </v-list-tile-content>
                                <v-list-tile-content class="align-end">
                                    {{ props.item.type }}
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-flex>
            </template>
        </v-data-iterator>
    </v-container>
</template>
<script>
export default {
    props: ['itemScheme'],
    data: () => ({
        rowsPerPageItems: [4],
        pagination: {
            rowsPerPage: 4
        },
    })
    
}
</script>

