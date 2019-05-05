<template>
    <div>
        <menu-constructor></menu-constructor>
        <v-container grid-list-md text-xs-center>
            <v-layout>
                <v-flex>
                    <table-reports :reports="reports" @sayParent="selectReportScheme"></table-reports>             
                </v-flex>
                <v-flex>
                    <div v-if="selectedReportScheme != -1">
                        <table-all-reports :allReports="reports[selectedReportScheme].fields"></table-all-reports>
                    </div>
                    <div v-else>
                        <table-all-reports :allReports="[]"></table-all-reports>
                    </div>
                </v-flex>
            </v-layout>
         </v-container>
        <v-container grid-list-md text-xs-center>
            <div v-if="selectedReportScheme!=-1">
                <dialog-add-report-scheme :idSelectedReport="reports[selectedReportScheme]._id"></dialog-add-report-scheme> 
            </div>
            <div v-else>
                <dialog-add-report-scheme :idSelectedReport="selectedReportScheme"></dialog-add-report-scheme>
            </div>                      
        </v-container>

    </div>
</template>

<script>
import axios from 'axios'
import MenuConstructor from '@/components/constructor/MenuConstructor'
import DialogAddReportScheme from '@/components/constructor/reports/DialogAddReportScheme.vue'
import TableReports from '@/components/constructor/reports/TableReports.vue'
import TableAllReports from '@/components/constructor/reports/TableAllReports.vue'
export default {
    components: {
        MenuConstructor,
        DialogAddReportScheme,
        TableReports,
        TableAllReports
    },

    data: () => ({       
        reports: [],
        selectedReportScheme: -1,
    }),

    mounted() {
        axios
            .get('http://localhost:8080/api/v1/scheme/report')
            .then(response => (
                this.reports = response.data 
                //global.console.log(response.data)
            ))
            .catch(error => global.console.log(error));
    },

    methods: {
        selectReportScheme (data) {
            this.selectedReportScheme = Number(data.selectedReportScheme)
        }
    }
    
}
</script>