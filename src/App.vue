<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import Footer from "./components/Footer.vue";
    export default {
        name: 'App',
        components: {
            Footer,
        },
    };
</script>