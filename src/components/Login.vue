<template>
    <v-app>
        <v-container fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm4 elevation-6>
                    <v-card  >

                        <v-card-title>
                            <h2 style="text-align: center; width: 100%">
                                Welcome
                            </h2>
                        </v-card-title>

                        <v-card-text>
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field
                                            class="token"
                                            label="Username"
                                            v-model="model.email"
                                            :value="model.email"
                                            outlined
                                            type="text"
                                            placeholder="Enter your username"
                                            required
                                            filled
                                            autocomplete="off"
                                            :rules="usernameRules"
                                    ></v-text-field>

                                    <v-text-field
                                            label="Password"
                                            class="token"
                                            v-model="model.password"
                                            :value="model.password"
                                            outlined
                                            placeholder="Enter your password"
                                            type="password"
                                            required
                                            clearable
                                            filled
                                            :rules="passwordRules"
                                    ></v-text-field>

                                    <v-btn @click="submit()" block type="button" >
                                        Sign In
                                    </v-btn>

                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar
                v-model="snackbar"
                color="#e10a0a"
                :timeout=3000
                :bottom=true
                :right=true
        >
            {{ text_snackbar }}
        </v-snackbar>
    </v-app>
</template>

<script>

    export default {
        name: "Auth",
        data() {
            return {
                valid: false,
                e1: false,
                passwordRules: [
                    (v) => !!v || 'Password is required',
                ],
                usernameRules: [
                    (v) => !!v || 'Username is required',
                ],
                options: {
                    isLoggingIn: true,
                    shouldStayLoggedIn: true,
                },
                model: {
                    email: null,
                    password: null
                },
                text_snackbar: '',
                snackbar: false
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    if(this.model.email === 'admin@blockverse.com' && this.model.password === 'pass'){
                        window.open("/issues", "_self")
                    }
                    else {
                        this.snackbar = true;
                        this.text_snackbar = "Failed to login!"
                    }
                }
            },
        },
        mounted() {
            let currentObj = this;
            document.onkeydown = function(evt) {
                evt = evt || window.event;
                if (evt.keyCode == 13) {
                    currentObj.submit();
                }
            };
        }
    }

</script>

<style scoped>

</style>