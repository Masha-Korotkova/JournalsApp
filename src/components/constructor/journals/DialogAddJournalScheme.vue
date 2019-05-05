<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-layout>                
                <v-flex xs1>
                    <v-btn fab small color="primary" dark v-on="on"> 
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-btn fab small dark color="cyan" @click="editJournalScheme" v-on="on"> 
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-btn fab small dark color="red" @click="deleteJournalScheme"> 
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </template>
        
        <template>
            <v-card>
                <v-container grid-list-md text-xs-center>           
                    <v-layout>                
                        <v-flex xs8 offset-xs2>
                            <v-card-title>
                                <span class="headline">New Journal Scheme</span>
                                <v-spacer></v-spacer>
                                <v-btn fab dark small color="red" @click="close">
                                    <v-icon dark>close</v-icon>
                                </v-btn>       
                            </v-card-title>
                            <v-card-text>
                                <v-stepper v-model="e1" alt-labels>
                                    <v-stepper-header>
                                        <v-stepper-step 
                                            :complete="e1 > 1" 
                                            step="1"
                                        >
                                            Info journal
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            :complete="e1 > 2" 
                                            step="2"
                                        >
                                            Info object
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            :complete="e1 > 3" 
                                            step="3"
                                        >
                                            Default fields
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            :complete="e1 > 4" 
                                            step="4"
                                        >
                                            Computed fields
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            :complete="e1 > 5" 
                                            step="5"
                                        >
                                            Conditional fields
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            step="6"
                                        >
                                            Save the journal
                                        </v-stepper-step>                             
                                    </v-stepper-header>
                                    <v-stepper-items>
                                        <v-stepper-content v-for="(index) in 6" :key="index" :step="index">
                                            <v-card v-if="index === 1" height="300px">
                                                <v-card-text>
                                                    <v-text-field 
                                                        v-model="journal.name" 
                                                        label="Name journal" 
                                                        required
                                                    >
                                                    </v-text-field>
                                                    <v-text-field 
                                                        v-model="journal.title" 
                                                        label="Title journal" 
                                                        required
                                                    >
                                                    </v-text-field>
                                                    <v-select 
                                                    v-model="journal.daily" 
                                                    :items="journalSettingProgress"
                                                    item-text="name"
                                                    item-value="val"
                                                    label="Type journal progress"
                                                    > 
                                                    </v-select>
                                                    <v-select 
                                                        v-model="journal.fixed" 
                                                        :items="journalSettingObject"
                                                        item-text="name"
                                                        item-value="val"
                                                        label="Type journal objects"
                                                    > 
                                                    </v-select>
                                                </v-card-text>
                                            </v-card>
                                            <v-card v-if="index === 2" height="300px">
                                                <v-select
                                                     
                                                    v-model="journal.item" 
                                                    :items="objects"
                                                    item-text="name"
                                                    item-value="name"
                                                    label="Select objects"
                                                    
                                                    return-object
                                                    
                                                    @change="selectItemScheme(journal.item)"
                                                > 
                                                </v-select>
                                                <v-select
                                                    
                                                    v-model="journal.item_info"
                                                    :items="selectedItemSchemeFields"   
                                                    attach
                                                    chips
                                                    label="Select Fields"
                                                    multiple
                                                >
                                                </v-select>             
                                            </v-card>
                                            <v-card v-if="index === 3" height="300px">
                                                <v-tabs v-model="active" color="primary" dark slider-color="white">
                                                    <v-tabs-slider color="white"> </v-tabs-slider>
                                                    <v-tab v-for="(field, index) in journalDefaultFields" :key="index" ripple> 
                                                        {{ field.name == '' ? 'New Field'  : field.name }} 
                                                    </v-tab>
                                                    <v-tab-item v-for="(f, i) in journalDefaultFields" :key="i">
                                                        <v-text-field 
                                                            v-model="f.name" 
                                                            label="Name field" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-text-field 
                                                            v-model="f.title" 
                                                            label="Title field" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-select 
                                                            v-model="f.type" 
                                                            :items="types" 
                                                            label="Type field"
                                                        > 
                                                        </v-select>
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
            
                                                >
                                                    Delete field
                                                </v-btn>
                                            </v-card>
                                            <v-card v-if="index === 4" height="500px">
                                                <v-tabs v-model="activeTabCom" color="primary" dark slider-color="white">
                                                    <v-tabs-slider color="white"> </v-tabs-slider>
                                                    <v-tab v-for="(field, index) in journalComputedFields" :key="index" ripple> 
                                                        {{ field.name == '' ? 'New Field'  : field.name }} 
                                                    </v-tab>
                                                    <v-tab-item v-for="(f, i) in journalComputedFields" :key="i">
                                                        <v-text-field 
                                                            v-model="f.name" 
                                                            label="Name field" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-text-field 
                                                            v-model="f.title" 
                                                            label="Title field" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-select 
                                                            v-model="f.computed.field" 
                                                            :items="journalDefaultFields"
                                                            item-text="name"
                                                            item-value="name" 
                                                            label="Computed field"
                                                        > 
                                                        </v-select>
                                                        <v-select 
                                                            v-model="f.computed.type" 
                                                            :items="computedTypes" 
                                                            label="Computed type"
                                                            @change="clearComputedAdditional(i ,f.computed.type)"
                                                        > 
                                                        </v-select>

                                                        <v-select
                                                            v-if="f.computed.type === 'deviation'" 
                                                            v-model="f.computed.norm" 
                                                            :items="journal.item_info" 
                                                            label="Computed norm"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'deviation'" 
                                                            v-model="f.computed.deviation" 
                                                            :items="journal.item_info" 
                                                            label="Computed deviation"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'range'" 
                                                            v-model="f.computed.range" 
                                                            :items="journal.item_info" 
                                                            label="Computed range"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'equals'" 
                                                            v-model="f.computed.value" 
                                                            :items="journal.item_info" 
                                                            label="Computed value"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'less'" 
                                                            v-model="f.computed.max" 
                                                            :items="journal.item_info" 
                                                            label="Computed value"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'more'" 
                                                            v-model="f.computed.min" 
                                                            :items="journal.item_info" 
                                                            label="Computed min"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'more_than'" 
                                                            v-model="f.computed.id" 
                                                            :items="journal.item_info" 
                                                            label="Computed id"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'more_than'" 
                                                            v-model="f.computed.on" 
                                                            :items="journal.item_info" 
                                                            label="Computed on"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-if="f.computed.type === 'enum'" 
                                                            v-model="f.computed.enum" 
                                                            :items="journal.item_info" 
                                                            label="Computed enum"
                                                        > 
                                                        </v-select>
                                                             
                                                    </v-tab-item>
                                                </v-tabs>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    flat 
                                                    @click="addComputedField"
                                                >
                                                    Add field
                                                </v-btn>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    flat 
                                                >
                                                    Delete field
                                                </v-btn>
                                            </v-card>
                                            <v-card v-if="index === 5" height="500px">
                                                <v-tabs v-model="activeTabCon" color="primary" dark slider-color="white">
                                                    <v-tabs-slider color="white"> </v-tabs-slider>
                                                    <v-tab v-for="(field, index) in journalConditionalFields" :key="index" ripple> 
                                                        {{ field.name == '' ? 'New Field'  : field.name }} 
                                                    </v-tab>
                                                    <v-tab-item v-for="(f, i) in journalConditionalFields" :key="i">
                                                        <v-text-field 
                                                            v-model="f.name" 
                                                            label="Name conditional field" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-text-field 
                                                            v-model="f.title" 
                                                            label="Title conditional field" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-select 
                                                            v-model="f.type" 
                                                            :items="types" 
                                                            label="Type conditional field"
                                                        > 
                                                        </v-select>
                                                        <v-select
                                                            v-model="f.if.fields"
                                                            :items="journalComputedFields"
                                                            item-text="name"
                                                            item-value="name"    
                                                            attach
                                                            chips
                                                            label="Select computed Fields"
                                                            multiple
                                                        >
                                                        </v-select> 
                                                    </v-tab-item>
                                                </v-tabs>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    flat 
                                                    @click="addConditionalField"
                                                >
                                                    Add field
                                                </v-btn>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    flat 
                                                >
                                                    Delete field
                                                </v-btn>
                                            </v-card>
                                            <v-card v-if="index === 6" height="300px">
                                                <v-spacer></v-spacer>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    flat 
                                                    @click="saveJournalScheme"
                                                >
                                                    Save
                                                </v-btn>
                                            </v-card>  
                                        </v-stepper-content>
                                    </v-stepper-items>
                                </v-stepper>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout>
                                    <v-flex xs0>
                                        <v-btn round color="primary" @click="nextStep(1)">
                                            <v-icon left>keyboard_arrow_left</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs0> 
                                        <v-btn round color="primary" @click="nextStep(2)">
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

import axios from 'axios';
export default {
    props: ['idSelectedJournalScheme'],
    components: {
    },
    data: () => ({
        dialog: false,
        ifEdit: false,
        e1: 0,
        active: 0,
        activeTabCom: 0,
        activeTabCon: 0,
        selectedItemScheme: '',
        selectedItemSchemeFields: [],
        selectedJournalFieldType: 'default',
        journalFieldTypes: ['default', 'conditional'],
        types: ['Integer', 'Dooble', 'String', 'Boolean', 'Array', 'Signature', 'Date', 'ObjectId'],
        computedTypes: ['deviation', 'range', 'equals', ' less', 'more', 'more_than', 'enum', 'bool'],
        selectedComputedType: '',
        selectedComputedField: '',
        
        deviationNorm: '',
        deviationDeviation: '',

        journalDefaultFields: [],

        journalComputedFields: [],

        journalConditionalFields: [],

        journal: {
            name: '',
            title: '',
            daily: false,
            fixed: false,
            item: '',
            item_info: [],
            fields: []
        },
        journalSettingProgress: [
            { name: 'daily', val: true },
            { name: 'constant', val: false }    
        ],
        journalSettingObject: [
            { name: 'fixed', val: true },
            { name: 'added', val: false }    
        ],
        objects: [],
    }),

    mounted() {
        axios
            .get('http://localhost:8080/api/v1/scheme/item')
            .then(response => (
                this.objects = response.data
                //global.console.log('one',response.data)
            ))
            .catch(error => global.console.log(error))
    },

    methods: {
        clearComputedAdditional(i, typeComputedAddField) {
            if(typeComputedAddField === 'range') {
                delete this.journalComputedFields[i].computed.norm
                delete this.journalComputedFields[i].computed.deviation
                delete this.journalComputedFields[i].computed.value
                delete this.journalComputedFields[i].computed.max
                delete this.journalComputedFields[i].computed.min
                delete this.journalComputedFields[i].computed.id
                delete this.journalComputedFields[i].computed.on
                delete this.journalComputedFields[i].computed.enum
            }

            if(typeComputedAddField === 'deviation') {
                delete this.journalComputedFields[i].computed.range
                delete this.journalComputedFields[i].computed.value
                delete this.journalComputedFields[i].computed.max
                delete this.journalComputedFields[i].computed.min
                delete this.journalComputedFields[i].computed.id
                delete this.journalComputedFields[i].computed.on
                delete this.journalComputedFields[i].computed.enum
            }

            if(typeComputedAddField === 'equals') {
                delete this.journalComputedFields[i].computed.norm
                delete this.journalComputedFields[i].computed.deviation
                delete this.journalComputedFields[i].computed.range
                delete this.journalComputedFields[i].computed.max
                delete this.journalComputedFields[i].computed.min
                delete this.journalComputedFields[i].computed.id
                delete this.journalComputedFields[i].computed.on
                delete this.journalComputedFields[i].computed.enum
            }

            if(typeComputedAddField === 'less') {
                delete this.journalComputedFields[i].computed.norm
                delete this.journalComputedFields[i].computed.deviation
                delete this.journalComputedFields[i].computed.value
                delete this.journalComputedFields[i].computed.range
                delete this.journalComputedFields[i].computed.min
                delete this.journalComputedFields[i].computed.id
                delete this.journalComputedFields[i].computed.on
                delete this.journalComputedFields[i].computed.enum
            }

            if(typeComputedAddField === 'more') {
                delete this.journalComputedFields[i].computed.norm
                delete this.journalComputedFields[i].computed.deviation
                delete this.journalComputedFields[i].computed.value
                delete this.journalComputedFields[i].computed.range
                delete this.journalComputedFields[i].computed.max
                delete this.journalComputedFields[i].computed.id
                delete this.journalComputedFields[i].computed.on
                delete this.journalComputedFields[i].computed.enum
            }

            if(typeComputedAddField === 'more_than') {
                delete this.journalComputedFields[i].computed.norm
                delete this.journalComputedFields[i].computed.deviation
                delete this.journalComputedFields[i].computed.value
                delete this.journalComputedFields[i].computed.range
                delete this.journalComputedFields[i].computed.max
                delete this.journalComputedFields[i].computed.min
                delete this.journalComputedFields[i].computed.enum
            }

            if(typeComputedAddField === 'enum') {
                delete this.journalComputedFields[i].computed.norm
                delete this.journalComputedFields[i].computed.deviation
                delete this.journalComputedFields[i].computed.value
                delete this.journalComputedFields[i].computed.range
                delete this.journalComputedFields[i].computed.max
                delete this.journalComputedFields[i].computed.min
                delete this.journalComputedFields[i].computed.id
                delete this.journalComputedFields[i].computed.on
            }
            
            global.console.log(typeComputedAddField)
        },
        clear() {
            this.selectedItemScheme = ''
            this.selectedItemSchemeFields = []
            this.journal = {
                name: '',
                title: '',
                daily: false,
                fixed: false,
                item: '',
                item_info: [],
                fields: []
            }
            this.e1 = 0
            this.journalDefaultFields = []
            this.journalComputedFields = []
            this.journalConditionalFields = []
        },

        nextStep(action) {
            if (action === 2) {
                this.e1 < 6 ? this.e1 ++ : this.e1 = 1
            }
            if (action === 1) {
                this.e1 > 1 ? this.e1 -- : this.e1 = 6
            }            
        },

        close() { 
            this.dialog = false
            this.ifEdit = false
            this.clear()
        },

        selectItemScheme (obj) {
            global.console.log('sel',obj)
            this.selectedItemSchemeFields = []
            this.journal.item = obj.name
            global.console.log(this.journal.item)
            for(var f of obj.fields) {
                this.selectedItemSchemeFields.push(f.name)
            }      
        },

        postJournalScheme() {
            const postJournalScheme = JSON.stringify(this.journal)
             axios
                .post('http://localhost:8080/api/v1/scheme/journal', postJournalScheme)
                .then(response => (global.console.log(response)))
                .catch(error => global.console.log(error))

        },

        putJournalScheme() {
            const putJournalScheme = JSON.stringify(this.journal)
             axios
                .put('http://localhost:8080/api/v1/scheme/journal/'+this.idSelectedJournalScheme+'', putJournalScheme)
                .then(response => (global.console.log(response)))
                .catch(error => global.console.log(error))

        },

        saveJournalScheme() {
            for(var f of this.journalDefaultFields) {
                this.journal.fields.push(f)
            }
            for(var fc of this.journalComputedFields) {
                this.journal.fields.push(fc)
            }
            for(var fcon of this.journalConditionalFields) {
                this.journal.fields.push(fcon)
            }
            //global.console.log(this.journal)
            //global.console.log(this.journalComputedFields)
           if (this.ifEdit == false) {
               this.journal.fields.push({
                    name: 'date',
                    title: 'дата',
                    type: 'Date'
                })
                this.journal.fields.push({
                    name: 'id',
                    title: 'Индентификатор',
                    type: 'ObjectId'
                })
                this.postJournalScheme()
            }

           if (this.ifEdit == true) {
               this.putJournalScheme()
               global.console.log(this.journal)
               this.ifEdit = false
           }

            
            this.close()
        },

        addField() {           
            this.journalDefaultFields.push({
                name: '',
                title: '',
                type: '',
            })
            const active = parseInt(this.active)
            this.active = (active >= 0 ? active + 1 : 0)
        },

        addComputedField() {
            this.journalComputedFields.push({
                name: '',
                title: '',
                type: 'Boolean',
                computed: {
                    type: '',
                    field: '',
                // + дополнительные поля, в зависимости от типа, добавляются в селектах динамически
                }
            })
            const active = parseInt(this.activeTabCom)
            this.activeTabCom = (active >= 0 ? active + 1 : 0)
        },

        addConditionalField() {
            this.journalConditionalFields.push({
                name: '',
                title: '',
                type: '',
                if: {
                    fields: []
                }
            })
            const active = parseInt(this.activeTabCon)
            this.activeTabCon = (active >= 0 ? active + 1 : 0)
        },

        deleteJournalScheme() {
            if(this.idSelectedJournalScheme != -1) {
                axios
                    .delete('http://localhost:8080/api/v1/scheme/journal/'+this.idSelectedJournalScheme+'')
                    .then(response => (global.console.log(response)))
                    .catch(error => global.console.log(error));
            }
        },

        test(data) {
            global.console.log('ok')
            this.journalDefaultFields = []
            this.journalComputedFields = []
            this.journalConditionalFields = []
            for(var i in data) {
                if(!('computed' in data[i]) && !('if' in data[i])) {
                    this.journalDefaultFields.push(data[i])
                }
                if(('computed' in data[i]) && !('if' in data[i])) {
                    this.journalComputedFields.push(data[i])     
                }
                if(('if' in data[i]) && !('computed' in data[i])) {
                    this.journalConditionalFields.push(data[i])          
                }          
            }
            //global.console.log(data[1].name)
        },

        editJournalScheme() {
            if(this.idSelectedJournalScheme != -1) {
                this.ifEdit = true
                axios
                .get('http://localhost:8080/api/v1/scheme/journal/'+this.idSelectedJournalScheme+'')
                .then(response => (
                    this.journal.name = response.data.name,
                    this.journal.title = response.data.title,
                    this.journal.daily = response.data.daily,
                    this.journal.fixed = response.data.fixed,
                    this.journal.item = response.data.item,
                    this.journal.item_info = response.data.item_info,
                    //global.console.log(this.journal)
                    //global.console.log(this.journal.fields[1].computed),
                    this.test(response.data.fields),
                    //this.selectedItemScheme = response.data.item,
                    this.selectedItemSchemeFields = response.data.item_info
                ))
                .catch(error => global.console.log(error));
                //global.console.log(this.journal.fields)
            }

        }
    }
    
}
</script>




