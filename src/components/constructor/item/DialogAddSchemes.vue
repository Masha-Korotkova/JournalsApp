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
                        @click="editScheme" 
                        v-on="on"
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
                        @click="deleteScheme"
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
                        <v-flex xs12>
                            <v-card-title>
                                <span class="headline">
                                    New Scheme
                                </span>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    fab 
                                    dark 
                                    small 
                                    color="red" 
                                    @click="close"
                                >
                                    <v-icon dark>
                                        close
                                    </v-icon>
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
                                            Enter the name and title
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step 
                                            :complete="e1 > 2" 
                                            step="2"
                                        >
                                            Set the fields
                                        </v-stepper-step>
                                            <v-divider></v-divider>
                                        <v-stepper-step step="3">
                                            Save the object
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
                                                            v-model="newScheme.name" 
                                                            label="Name object"
                                                            :rules="nameRules" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                        <v-text-field 
                                                            v-model="newScheme.title" 
                                                            label="Title object"
                                                            :rules="titleRules" 
                                                            required
                                                        >
                                                        </v-text-field>
                                                    </v-card-text>
                                                </v-card> 
                                                <v-card 
                                                    v-if="index === 2" 
                                                    height="350px"
                                                >
                                                    <v-tabs 
                                                        v-model="active" 
                                                        color="primary" 
                                                        dark 
                                                        slider-color="white"
                                                    >
                                                        <v-tabs-slider color="white"> </v-tabs-slider>
                                                        <v-tab 
                                                            v-for="(field, index) in newScheme.fields" 
                                                            :key="index" ripple
                                                        > 
                                                            {{ field.name == '' ? 'New Field'  : field.name}} 
                                                        </v-tab>
                                                        <v-tab-item 
                                                            v-for="(f, i) in newScheme.fields" 
                                                            :key="i"
                                                        >
                                                            <v-text-field 
                                                                v-model="f.name" 
                                                                label="Name field"
                                                                :rules="nameRules" 
                                                                required
                                                            >
                                                            </v-text-field>
                                                            <v-text-field 
                                                                v-model="f.title" 
                                                                label="Title field"
                                                                :rules="titleRules" 
                                                                required
                                                            >
                                                            </v-text-field>
                                                            <v-select 
                                                                v-model="f.type" 
                                                                :items="types" 
                                                                label="Type field"
                                                                :rules="typeRules"
                                                                required
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
                                                        @click="deleteField"
                                                    >
                                                        Delete field
                                                    </v-btn>
                                                </v-card>
                                                <v-card 
                                                    v-if="index === 3" 
                                                    height="350px"
                                                >
                                                    <end-scheme :itemScheme="newScheme"></end-scheme>
                                                    <v-spacer></v-spacer>
                                                    <v-btn 
                                                        color="blue darken-1" 
                                                        flat 
                                                        @click="saveScheme"
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
import EndScheme from '@/components/constructor/item/EndScheme.vue'
export default {
    components: {
        EndScheme
    },    
    props: ['idSelectedScheme'],

    data: () => ({
        valid: false,
        dialog: false,
        alertError: false,
        e1: 0,
        active: 0,
        ifEdit: false,   
        types: ['Integer', 'Dooble', 'String', 'Bool', 'Array'],
        newScheme: {  
            name: '',
            title: '',
            fields: [{
                name: '',
                title: '',
                type: '',
            }],
        },
        nameRules: [
            v => !!v || 'Name is required',
        ],
        titleRules: [
            v => !!v || 'Title is required',
        ],
        typeRules: [
            v => !!v || 'Type is required'
        ]
    }),


    methods: {
        
        validate () {
            if (this.$refs.form.validate()) {
                global.console.log('true')
            }
        },

        sayParent() {
            this.$emit('sayParent', {
                update: 1
            })
            global.console.log('ok')
        },

        nextStep(action) {
            if (action === 2) {
                this.e1 < 3 ? this.e1 ++ : this.e1 = 1
            }
            if (action === 1) {
                this.e1 > 1 ? this.e1 -- : this.e1 = 3
            }            
        },

        clearScheme() {
            this.newScheme = {   
                name: '',
                title: '',
                fields: [{
                    name: '',
                    title: '',
                    type: '',
                }],
            };
        },

        close() { 
            this.dialog = false
            this.clearScheme()
        },

        addField() {
            if (this.newScheme.fields.length == 0) {
                this.newScheme.fields.push ({
                    name: '',
                    title: '',
                    type: '',
                });
            }            
            else {
                this.newScheme.fields.push ({
                    name: '',
                    title: '',
                    type: '',
                });
            }
            const active = parseInt(this.active);
            this.active = (active >= 0 ? active + 1 : 0)
        },

        deleteField() {
            const active = parseInt(this.active);
            if (this.newScheme.fields.length > 1)            
                this.newScheme.fields.splice(active, 1)
        },

        saveScheme() {
            // добавить схему
            if(this.$refs.form.validate()) {

                const postScheme = JSON.stringify(this.newScheme);
                if(this.ifEdit == false) {
                    axios
                        .post('http://localhost:8080/api/v1/scheme/item', postScheme)
                        .then(response => (global.console.log(response)))
                        .catch(error => global.console.log(error))
                }
                else {
                    axios
                        .put('http://localhost:8080/api/v1/scheme/item/'+this.idSelectedScheme+'', postScheme)
                        .then(response => (global.console.log(response)))
                        .catch(error => global.console.log(error))
                }   
                this.clearScheme()
                this.ifEdit = false
                this.dialog = false
                this.e1 = 1
                this.sayParent()
            }
            else {
                this.alertError = true
            }
        },

        editScheme() {
            axios
                .get('http://localhost:8080/api/v1/scheme/item/'+this.idSelectedScheme+'')
                .then(response => (
                    this.newScheme = response.data
                ))
                .catch(error => global.console.log(error))
                this.ifEdit = true;
        },


        deleteScheme() {
            //удалить схему
            global.console.log(this.idSelectedScheme)
            if(this.idSelectedScheme != -1) {
                axios
                    .delete('http://localhost:8080/api/v1/scheme/item/'+this.idSelectedScheme+'')
                    .then(response => (global.console.log(response)))
                    .catch(error => global.console.log(error))
                //this.sayParent()
            }
        },
    }    
}
</script>

