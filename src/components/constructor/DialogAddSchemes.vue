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
                 <v-btn fab small dark color="cyan"> 
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs1>
                 <v-btn fab small dark color="red"> 
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
                            <span class="headline">New Scheme</span>
                            <v-spacer></v-spacer>
                            <v-btn fab dark small color="red" @click="close">
                                <v-icon dark>close</v-icon>
                            </v-btn>       
                        </v-card-title>
                        <v-card-text>
                            <v-stepper v-model="e1">
                                <v-stepper-header>
                                    <v-stepper-step :complete="e1 > 1" step="1">Enter the name and title of the object</v-stepper-step>
                                        <v-divider></v-divider>
                                    <v-stepper-step :complete="e1 > 2" step="2">Set the fields</v-stepper-step>
                                            <v-divider></v-divider>
                                    <v-stepper-step step="3">Save the object</v-stepper-step>
                                </v-stepper-header>
                                <v-stepper-items>
                                    <v-stepper-content v-for="(index) in 3" :key="index" :step="index">    
                                        <v-card v-if="index === 1" height="300px">
                                            <v-card-text>
                                                <v-text-field v-model="newScheme.name" label="Name object" required></v-text-field>
                                                <v-text-field v-model="newScheme.title" label="Title object" required></v-text-field>
                                            </v-card-text>
                                        </v-card> 
                                        <v-card v-if="index === 2" height="300px">
                                            <v-tabs v-model="active" color="primary" dark slider-color="white">
                                                <v-tabs-slider color="white"> </v-tabs-slider>
                                                <v-tab v-for="(field, index) in newScheme.fields" :key="index" ripple> 
                                                    {{ field.name == '' ? 'New Field'  : field.name}} 
                                                </v-tab>
                                                <v-tab-item v-for="(f, i) in newScheme.fields" :key="i">
                                                    <v-text-field v-model="f.name" label="Name field" required></v-text-field>
                                                    <v-text-field v-model="f.title" label="Title field" required></v-text-field>
                                                    <v-select v-model="f.type" :items="types" label="Type field"> </v-select>
                                                </v-tab-item>
                                            </v-tabs>
                                            <v-btn color="blue darken-1" flat @click="addField">Add field</v-btn>
                                            <v-btn color="blue darken-1" flat @click="deleteField">Delete field</v-btn>
                                        </v-card>
                                        <v-card v-if="index === 3" height="300px">
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
export default {    
    props: ['addScheme'],

    data: () => ({
        dialog: false,
        e1: 0,
        active: 0,
        maxId: 0,
        types: ['Integer', 'Dooble', 'String', 'Bool'],
        newScheme: {
            fields: [{
                key: 0,
                name: '',
                title: '',
                type: '',
            }],
            name: '',
            title: '',
            id: 0
        },
    }),

    methods: {

        nextStep(action) {
            if (action === 2) {
                this.e1 < 3 ? this.e1 ++ : this.e1 = 1;
            }
            if (action === 1) {
                this.e1 > 1 ? this.e1 -- : this.e1 = 3;
            }            
        },

        clearScheme() {
            this.newScheme = {
                fields: [{
                    key: 0,
                    name: '',
                    title: '',
                    type: '',
                }],
                name: '',
                title: '',
            };
        },

        close() { 
            this.dialog = false;
            this.clearScheme();
        },

        addField() {
            if (this.newScheme.fields.length == 0) {
                this.newScheme.fields.push ({
                    key: 0,
                    name: '',
                    title: '',
                    type: '',
                });
            }            
            else {
                var key = this.newScheme.fields[this.newScheme.fields.length - 1].key;
                this.newScheme.fields.push ({
                    key: key + 1,
                    name: '',
                    title: '',
                    type: '',
                });
            }
            const active = parseInt(this.active);
            this.active = (active >= 0 ? active + 1 : 0);
        },

        deleteField() {
            const active = parseInt(this.active);
            if (this.newScheme.fields.length > 1)            
                this.newScheme.fields.splice(active, 1);
        },

        save() {
            this.newScheme.id = this.maxId;
            this.addScheme({
                newScheme: this.newScheme
            });
            this.clearScheme();
            this.dialog = false;
            this.e1 = 1;
            this.maxId ++;
        }
    }    
}
</script>

