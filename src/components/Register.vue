<template>
    <div class="container-register flex center">
        <div class="reistration-container flex column">
            <div class="logo-container flex center">
                <span class="logo-letter green">U</span>
                <span class="logo-letter black">-</span>
                <span class="logo-letter black">F</span>
                <span class="logo-letter black">O</span>
                <span class="logo-letter black">O</span>
                <span class="logo-letter black">D</span>
            </div>
            <div class="page-title flex center">
                Create an account
            </div>
            <span class="center red message_error" v-if="error.length">{{ error }}</span>
            <form class="form-group-registration flex column">
                <div class="input-group-register flex">
                    <span class="form-label">Username </span>
                    <input id="username" type="text" required class="registration-input" placeholder="Username..."/>
                </div>
                <div class="input-group-register flex">
                    <span class="form-label">Email </span>
                    <input id="email" type="text" required class="registration-input" placeholder="Email..."/>
                </div>
                <div class="input-group-register flex">
                    <span class="form-label">Password </span>
                    <input id="password" type="password" required class="registration-input" placeholder="Password..."/>
                </div>
                <div class="input-group-register flex">
                    <span class="form-label">Confirm password </span>
                    <input id="confirmPassword" type="password" required class="registration-input" placeholder="Confirm password..."/>
                </div>
                <div class="button-register-container flex center">
                    <button class="registration-btn flex center" @click="RegisterUser()">Create your account</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {
    PostRegister,
} from "../api/Authentification";

    export default {
        name: "Register",
        data() {
            return {
                error: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            };
        },
        methods: {
            async RegisterUser() {
                this.error = "";
                this.username = document.getElementById("username").value
                this.email = document.getElementById("email").value
                this.password = document.getElementById("password").value
                this.confirmPassword = document.getElementById("confirmPassword").value
                if (this.confirmPassword == this.password && this.username != "" && this.email != "" && this.password != "" && this.confirmPassword != "") {
                    await PostRegister(this.username, this.password, this.email).then(
                        (response) => {
                            if (response.code == undefined) {
                                this.$router.push('/login');
                            } else {
                                this.error = "Account already exists";
                            }
                        }
                        );
                } else {
                    this.error = "Passwords are not the same";
                }
            },
        },
    }
</script>

<style>
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html,
body {
    height: 100%;
}

body {
    font-family: 'Josefin Sans', sans-serif;
    /* background-color: #17131B; */
}

.dark-mode {
    background-color: #1c1c1c;
    color: white;
}

.flex {
    display: flex;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.column {
    flex-direction: column;
}

.f-width {
    width: 100%;
}

.f-height {
    height: 100%;
}

.white {
    color: white;
}

.message_error {
    margin-top: 10px;
}

.red {
    color: red;
}
.debug-border {
    border: 2px solid green
}

.debug-bg {
    background-color: red;
}

.bold {
    font-weight: bold;
}

.underline {
    text-decoration: underline;
}

.underline-border {
    border-bottom: 2px solid white;
}

.unSelected {
    -moz-user-select: none; /* Firefox */
    -webkit-user-select: none; /* Chrome, Safari, Opéra depuis la version 15 */
    -ms-user-select: none; /* Internet explorer depuis la version 10 et Edge */
    user-select: none; /* Propriété standard */
}

/* ---------------------------------------------------------------- */

.container-register {
    width: 100%;
    height: 90vh;
}

.reistration-container {
    width: 45%;
    min-width: 300px;
    height: 80%;
    background-color: rgba(0, 0, 0, 0.086);
    border-radius: 25px;
    padding: 25px;
}

.logo-container {
    width: 100%;
    height: 25%;
}

.logo-letter {
    font-size: 124px;
    font-weight: bold;
}

.green {
    color: #06C167;
}

.page-title {
    width: 100%;
    height: 50px;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.form-group-registration {
    margin-top: 10px;
}

.input-group-register {
    width: 100%;
    height: 75px;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 7px;
    margin-bottom: 7px;
}

.form-label {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
}

.registration-input {
    width: 70%;
    height: 70%;
    border-radius: 999999px;
    padding: 15px;
    -webkit-box-shadow: inset -1px 5px 15px 3px #0000003e;
    box-shadow: inset -1px 5px 15px 3px #0000003e;
    font-size: 18px;
    text-align: start;
    transition-duration: 0.3s;
}

.registration-input:hover {
    transform: scale(1.03);
}

.button-register-container {
    width: 100%;
    height: 150px;
}

.registration-btn {
    background-color: black;
    color: white;
    transition-duration: 0.3s;
    width: auto;
    padding: 25px;
    height: 55px;
    border-radius: 999px;
}

.registration-btn:hover, .google-btn:hover {
    transform: scale(1.03);
}

@media screen and (max-width: 1080px) {
    .logo-letter {
        font-size: 90px;
    }
}

@media screen and (max-width: 845px) {
    .logo-letter {
        font-size: 70px;
    }
    .input-group-register {
        flex-direction: column;
        margin-top: 15px;
    }
}
</style>
