<template>
    <v-dialog 
        v-model="dialog" 
        fullscreen 
        hide-overlay 
        transition="dialog-bottom-transition"
    >
        <v-alert
            v-model="alertError"
            dismissible
            type="error"
        >
            Check the correctness of the data
        </v-alert>
        <template v-slot:activator="{ on }">
            <v-layout row wrap>                
                <v-flex xs1>
                    <v-btn 
                        fab 
                        small 
                        color="primary" 
                        dark v-on="on"
                    > 
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-btn 
                        fab 
                        small 
                        dark 
                        color="cyan" 
                        v-on="on"
                        @click="editReport"
                    > 
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-btn 
                        fab 
                        small 
                        dark 
                        color="red"
                        @click="deleteReportScheme" 
                    > 
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </template>

        <template>
            <v-card>
                <v-container 
                    grid-list-md 
                    text-xs-center
                >           
                    <v-layout  
                        row 
                        wrap
                    >                
                        <v-flex 
                            xs12
                        >
                            <v-card-title>
                                <span class="headline">New Report Scheme</span>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    fab 
                                    dark 
                                    small 
                                    color="red" 
                                    @click="close"
                                >
                                    <v-icon dark>close</v-icon>
                                </v-btn>       
                            </v-card-title>
                            <v-card-text>
                                <v-stepper 
                                    v-model="e1" 
                                    alt-labels
                                >
                                    <v-stepper-header>
                                        <v-stepper-step 
                                            :complete="e1 > 1" 
                                            step="1"
                                        >
                                            Info Report
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            :complete="e1 > 2" 
                                            step="2"
                                        >
                                            Enter fields
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step step="3">
                                            Save the report
                                        </v-stepper-step>
                                    </v-stepper-header>

                                    <v-stepper-items>
                                         <v-form 
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation
                                        >
                                            <v-stepper-content 
                                                v-for="(index) in 3" 
                                                :key="index" 
                                                :step="index"
                                            >    
                                                <v-card 
                                                    v-if="index === 1" 
                                                    height="350px"
                                                >
                                                    <v-card-text>
                                                        <v-text-field 
                                                            v-model="report.name" 
                                                            label="Name report"
                                                            :rules="nameRules"  
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-text-field 
                                                            v-model="report.title" 
                                                            label="Title report"
                                                            :rules="titleRules"  
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-select
                                                            v-model="report.journal" 
                                                            :items="journals"
                                                            :rules="journalRules" 
                                                            item-text="name"
                                                            item-value="name"
                                                            label="Select objects" 
                                                            @change="selectJournalScheme(report.journal)"
                                                        > 
                                                    </v-select>
                                                    </v-card-text>
                                                </v-card>
                                                <v-card 
                                                    v-if="index === 2" 
                                                    height="500px"
                                                >
                                                    <v-tabs 
                                                        v-model="active" 
                                                        color="primary" 
                                                        dark 
                                                        slider-color="white"
                                                    >
                                                        <v-tabs-slider color="white"></v-tabs-slider>
                                                        <v-tab 
                                                            v-for="(field, index) in report.fields" 
                                                            :key="index" 
                                                            ripple
                                                        > 
                                                            {{ field.title == '' ? 'New Field'  : field.title }} 
                                                        </v-tab>
                                                        <v-tab-item 
                                                            v-for="(f, i) in report.fields" 
                                                            :key="i"
                                                        >
                                                            <v-text-field 
                                                                v-model="f.title"
                                                                :rules="titleRules"  
                                                                label="Title field" 
                                                                required
                                                            >
                                                            </v-text-field>
                                                            
                                                            <v-layout row wrap>
                                                                <v-flex xs3>
                                                                    <v-select
                                                                        v-model="addInValue"
                                                                        small-chips
                                                                        :items="item"
                                                                        label="object field"
                                                                        solo
                                                                        @change="addInfoInValue(1, i)"
                                                                    >
                                                                    </v-select>
                                                                </v-flex>
                                                                <v-flex xs3>
                                                                    <v-select
                                                                        v-model="addInValue"
                                                                        small-chips
                                                                        :items="journal"
                                                                        label="journal field"
                                                                        solo
                                                                        @change="addInfoInValue(2, i)"
                                                                        
                                                                    >
                                                                    </v-select>
                                                                </v-flex>
                                                                <v-flex xs3>
                                                                    <v-select
                                                                        
                                                                        label="controller field"
                                                                        solo
                                                                    >
                                                                    </v-select>
                                                                </v-flex>
                                                                
                                                            </v-layout>
                                                            
                                                            <v-textarea
                                                                v-model="f.value"
                                                                solo
                                                                :rules="valueRules" 
                                                                label="Value field"
                                                            >
                                                            </v-textarea>
                                                        </v-tab-item>
                                                    </v-tabs>
                                                    <v-btn 
                                                        color="blue darken-1" 
                                                        flat 
                                                        @click="addField"
                                                    >
                                                        Add field
                                                    </v-btn>
                                                    <v-btn 
                                                        color="blue darken-1" 
                                                        flat
                                                        @click="deleteField"
                                                    >
                                                        Delete field
                                                    </v-btn>
                                                </v-card>
                                                <v-card 
                                                    v-if="index === 3" 
                                                    height="500px"
                                                >
                                                    <end-report :report="report"></end-report>
                                                    <v-spacer></v-spacer>
                                                    <v-btn 
                                                        color="blue darken-1" 
                                                        flat 
                                                        @click="saveReport"
                                                    >
                                                        Save
                                                    </v-btn>
                                                </v-card>
                                            </v-stepper-content>
                                        </v-form>
                                    </v-stepper-items>
                                </v-stepper>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout>
                                    <v-flex xs0>
                                        <v-btn 
                                            round 
                                            color="primary" 
                                            @click="nextStep(1)"
                                        >
                                            <v-icon left>keyboard_arrow_left</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs0> 
                                        <v-btn 
                                            round 
                                            color="primary" 
                                            @click="nextStep(2)"
                                        >
                                            <v-icon right>keyboard_arrow_right</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </template>


    </v-dialog>  
</template>

<script>
import axios from 'axios'
import EndReport from '@/components/constructor/reports/EndReport.vue'
export default {
    components: {
        EndReport
    },   
    props: ['idSelectedReport'],   
    data: () => ({
        alertError: false,
        valid: false,
        dialog: false,
        ifEdit: false,
        addInValue: '',
        e1: 0,
        active: 0,
        journals: [],
        journal: [],
        item: [],
        report: {
            fields: [{
                title: '',
                value: ''
            }]
        },
        nameRules: [
            v => !!v || 'Name is required',
        ],
        titleRules: [
            v => !!v || 'Title is required',
        ],
        journalRules: [
            v => !!v || 'Journal is required'
        ],
        valueRules: [
            v => !!v || 'Value is required'
        ]
    
    }),

    mounted() {
        axios
            .get('http://localhost:8080/api/v1/scheme/journal')
            .then(response => (
                this.journals = response.data
                //global.console.log('one',response.data) 
            ))
            .catch(error => global.console.log(error));
    },

    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                global.console.log('true')
            }
        },
        clear() {
            this.e1 = 0
            this.active = 0
            this.report = {
                fields: []
            }

        },
        close() { 
            this.dialog = false
            this.clear()
        },

        nextStep(action) {
            if (action === 2) {
                this.e1 < 3 ? this.e1 ++ : this.e1 = 1;
            }
            if (action === 1) {
                this.e1 > 1 ? this.e1 -- : this.e1 = 3;
            }            
        },

        selectJournalScheme(obj) {
            global.console.log(obj)
            var index = this.journals.findIndex(i => i.name === obj)
            var arrJournalFieldName = []
            for (var f in this.journals[index].fields) {
                arrJournalFieldName.push(this.journals[index].fields[f].name)
            }
            this.journal = arrJournalFieldName
            this.item = this.journals[index].item_info
            global.console.log(this.journal)
        },

        addField() {
            this.report.fields.push ({
                    title: '',
                    value: ''
            })
            const active = parseInt(this.active)
            this.active = (active >= 0 ? active + 1 : 0)
        },

        deleteField() {
            const active = parseInt(this.active);
            if (this.report.fields.length > 1)            
                this.report.fields.splice(active, 1);
        },

        saveReport() {
            if(this.$refs.form.validate()) {
                global.console.log(this.report)
                const postReport = JSON.stringify(this.report);
                if(this.ifEdit == false) {
                    axios
                        .post('http://localhost:8080/api/v1/scheme/report', postReport)
                        .then(response => (global.console.log(response)))
                        .catch(error => global.console.log(error))
                }
                else {
                    axios
                        .put('http://localhost:8080/api/v1/scheme/report/'+this.idSelectedReport+'', postReport)
                        .then(response => (global.console.log(response)))
                        .catch(error => global.console.log(error))
                } 
                    this.clear()
                    this.ifEdit = false
                    this.dialog = false
                    this.e1 = 1
            }
            else {
                this.alertError = true
            }
        },

        addInfoInValue(type, i) {
            if(type == 1 && this.report.fields[i].value !== '') {
                this.report.fields[i].value +='{object.'+this.addInValue+'}'
                this.addInValue = ''
            }
            if(type == 1 && this.report.fields[i].value == '') { 
                this.report.fields[i].value += '{object.'+this.addInValue+'}'
                this.addInValue = ''
            }
            if(type == 2 && this.report.fields[i].value !== '') {
                this.report.fields[i].value +='{journal.'+this.addInValue+'}'
                this.addInValue = ''
            }
            if(type == 2 && this.report.fields[i].value == '') { 
                this.report.fields[i].value += '{journal.'+this.addInValue+'}'
                this.addInValue = ''
            }
        },

        deleteReportScheme() {
            if(this.idSelectedReport != -1) {
                axios
                    .delete('http://localhost:8080/api/v1/scheme/report/'+this.idSelectedReport+'')
                    .then(response => (global.console.log(response)))
                    .catch(error => global.console.log(error));
            }
        },

        editReport() {
            axios
                .get('http://localhost:8080/api/v1/scheme/report/'+this.idSelectedReport+'')
                .then(response => (
                    this.report = response.data,
                    this.selectJournalScheme(response.data.journal),
                    global.console.log(response.data)
                ))
                .catch(error => global.console.log(error));
                this.ifEdit = true;
                //this.selectJournalScheme(this.report.journal)
        }
    }
    
}
</script>
