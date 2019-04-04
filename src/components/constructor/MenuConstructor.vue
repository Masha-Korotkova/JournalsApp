<template>
    <div>
        <v-navigation-drawer app absolute temporary v-model="drawer" class="hidden-md-and-up">
            <v-list>
                <v-list-tile v-for="(item, index) in menuItems" :key="index" :to="item.route">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        
        <v-toolbar app dark class="primary">
            <v-toolbar-side-icon @click.stop="drawer=!drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-title v-text="'Сonstructor'"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat v-for="(item, index) in menuItems" :key="index" :to="item.route">
                    <v-icon left v-html="item.icon"></v-icon>
                    {{ item.title  }}
                </v-btn>
            </v-toolbar-items>   
        </v-toolbar>    

    </div>
</template>

<script>
export default {

    data: () => ({
        drawer: false,
    }),

    computed: {
        menuItems() {
            return [
                {
                    icon: 'build',
                    title: 'Schemes',
                    route: '/ConstructorScheme',
                },
                {
                    icon: 'assignment',
                    title: 'Journals',
                    route: '/ConstructorJournal',
                },
                {
                    icon: 'assignment_turned_in',
                    title: 'Reports',
                    route: '/ConstructorReport',
                },
            ]
        },        
    }    
}
</script>

<style>

</style>


