<template>
    <div id="issues">
        <div id="title">
            <h2 class="page-title">
                Opened Issues
                <v-btn
                        class="red-background"
                        to="/issues/0"
                >Add New Issue
                </v-btn>
            </h2>
        </div>
        <v-card class="card" raised>
            <v-data-table
                    :headers="headers"
                    :items="openedIssues"
                    :key="openedIssues.id"
                    :search="search"
                    :loading="loading" loading-text="Loading... Please wait"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white" style="margin-left: 70%">
                        <v-text-field   right
                                        name="search"
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Search"
                                        autocomplete="off"
                                        dense
                                        hide-details
                                        outlined
                        ></v-text-field>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <router-link :to="'/issues/' + item.id">
                        <v-icon class="icons" style="padding:6px;">
                            mdi-pencil
                        </v-icon>
                    </router-link>
                </template>
                <template v-slot:no-data>
                    <p class="no-data"> There are no opened issues!</p>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script>


    // import axios from "axios";
    import API from "../helpers"

    export default {
        name: "Issues",
        components: {
         },
        data() {
            return {
                search: '',
                headers: [
                    {
                        text: 'Name',
                        value: 'issue_name',
                    },
                    {
                        text: 'Description',
                        value: 'issue_description'
                    },
                    {
                        text: 'Status',
                        value: 'issue_status'
                    },
                    {
                        text: 'Type',
                        value: 'issue_type'
                    },
                    {
                        text: 'Date Created',
                        value: 'issue_created_at'
                    },
                    {   text: 'Actions',
                        value: 'action',
                        sortable: false
                    },
                ],
                openedIssues: [],
                loading: false,
                confirmationDialog: false
            }
        },
        mounted() {
           this.loadTable();
         },
        methods: {
            loadTable() {
                let currentObj = this;
                currentObj.loading = true;

                API.get().then( function  (response) {
                        response.forEach(function (val) {
                            currentObj.openedIssues.push({
                                issue_name: val.name,
                                id: val.id,
                                issue_description: val.description,
                                issue_status: val.status,
                                issue_type: val.type,
                                issue_created_at: val.dateCreated
                            });
                        });
                        currentObj.loading = false;
                    }  )
            }
        },
    }
</script>

<style scoped>
    .page-title {
        box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.12);
        padding: 15px 30px 15px;
        font-size: 1.7em !important;
    }
    .red-background {
        color: darkblue;
        float: right;
        font-size: 0.6em !important;
        text-decoration: none !important;
    }
    .icons {
        font-size: 1.7em !important;
        margin-right: 25px;
        text-decoration: none !important;
        border-radius: 2px !important;
    }

    .delete-tbl-btn {
        background-color: #e10a0a !important;
        color: white;
    }

    .headline .v-icon:before {
        color: #fff;
    }

    .headline .v-icon {
        margin-left: calc(50% - 62px) !important;
        position: absolute !important;
        background-color: #E10A0A !important;
        border-radius: 50% !important;
        padding: 10px !important;
        z-index: 9999 !important;
        border: 5px solid white;
    }

    .headline {
        text-align: center !important;
        margin-top: 36px;
        margin-bottom: 50px;
    }

    .card_title {
        font-size: 20px !important;
    }

</style>