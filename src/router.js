'use strict';
import Router from 'vue-router'
import Issue from './components/Issue.vue'
import Issues from './components/Issues.vue'
import Login from './components/Login.vue'
import Vue from "vue";

Vue.use(Router)

let router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/issues',
            name: 'Issues',
            component: Issues
        },
        {
            path: '/issues/:id',
            name: 'Issue',
            component: Issue
        },
    ]
})

export default router;
