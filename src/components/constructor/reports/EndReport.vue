<template>
    <v-container fluid grid-list-md>
        <v-data-iterator
            :items="report.fields"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
        >
            <template v-slot:header>
                <h3> 
                    Name: {{ report.name }} 
                <br> 
                    Title: {{ report.title }} 
                <br> 
                    Journal: {{ report.journal }} 
                </h3>
            </template>
            <template v-slot:item="props">
                <v-flex offset-xs1 xs10>
                    <v-card>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>
                                    Title:
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    {{ props.item.title }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    Value:
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    {{ props.item.value }}
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
    props: ['report'],
    data: () => ({
        rowsPerPageItems: [3],
        pagination: {
            rowsPerPage: 3
        },
    })
}
</script>

