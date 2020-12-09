<template>
    <div class="Issue">
        <div id="title">
            <h2 class="page-title" v-if="createView">
                Create New Issue
            </h2>
            <h2 v-else class="page-title">Edit Issue </h2>
        </div>
        <v-card class="card" raised>
            <v-form v-if="!loading" class="form-submit"
                    ref="form">
                <v-layout>
                    <v-col class="d-flex" cols="12" sm="4">
                        <v-text-field
                                name="name"
                                v-model="issue.name"
                                label="Name"
                                autocomplete="off"
                                required
                                outlined
                        ></v-text-field>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="4">
                        <v-text-field
                                name="description"
                                v-model="issue.description"
                                label="Description"
                                autocomplete="off"
                                required
                                outlined
                        ></v-text-field>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="2">
                        <v-select :items="statuses"
                                  v-model="issue.status"
                                  outlined
                                  label="Select Status">
                        </v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="2">
                        <v-select :items="types"
                                  v-model="issue.type"
                                  outlined
                                  label="Select Type">
                        </v-select>
                    </v-col>
                </v-layout>
                <v-btn
                        class="darkgrey-background loader-disable"
                        to="/issues"
                        shrink

                >
                    Back
                </v-btn>
                <v-btn type="submit"
                       @click="saveIssue"
                >Save Issue
                </v-btn>
                <v-btn  v-if="editView"
                        @click="deleteIssue"
                >Delete Issue
                </v-btn>
            </v-form>

            <v-progress-linear
                    v-if="loading"
                    indeterminate
                    color="blue"
            ></v-progress-linear>
        </v-card>
    </div>
</template>

<script>
    import API from "../helpers"

    export default {
        name: "Issue",
        mounted() {
            let currentObj = this;
            if (currentObj.$route.params.id > 0) {
                currentObj.editView = true;
                API.get(currentObj.$route.params.id).then(function (response) {
                    currentObj.issue = response;
                })

            } else {
                currentObj.createView = true;
            }

        },
        data() {
            return {
                loading: false,
                title: '',
                brand_name: '',
                issue: {
                    name: '',
                    description: '',
                    status: '',
                    type: '',
                    templateID: ''
                },
                tenant: null,
                createView: true,
                statuses: ['Open', 'In Progress', 'Implemented'],
                types: ['Bug', 'Task'],
                editView: false
            }
        },
        methods: {
            saveIssue() {
                let currentObj = this;
                if (currentObj.$route.params.id > 0) {
                    API.update(currentObj.issue.templateID, currentObj.issue).then(function () {
                        window.open("/issues", "_self");
                    })
                } else {
                    currentObj.issue.version = 1;
                    API.add(currentObj.issue).then(function () {
                        window.open("/issues", "_self");
                    })
                }
            },
            deleteIssue(){
                let currentObj = this;
                API.delete(currentObj.issue.id).then(function () {
                    window.open("/issues", "_self");
                })
            }
        },

    }

</script>

<style scoped>

</style>