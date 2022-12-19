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
                Login
            </div>
            <span class="center red message_error" v-if="error.length">{{ error }}</span>
            <form class="form-group-registration flex column">
                <div class="input-group-register flex">
                    <span class="form-label">Emain </span>
                    <input id="email" type="text" required class="registration-input" placeholder="Email..." />
                </div>
                <div class="input-group-register flex">
                    <span class="form-label">Password </span>
                    <input id="password" type="password" required class="registration-input"
                        placeholder="Password..." />
                </div>
                <div class="or-container flex">
                    <div class="bar"></div>
                    <div class="or">Or</div>
                    <div class="bar"></div>
                </div>
                <div class="google-btn-login-container flex center">
                    <button type="button" class="google-btn" @click="RedirectRegister()">
                        <font-awesome-icon icon="fa-solid fa-user" class="fill-inherit icon-google" size="lg" />
                        Create account
                    </button>
                </div>
                <div class="google-btn-login-container flex center">
                    <GoogleLogin :callback="callback" />
                </div>
                <div class="button-register-container flex center">
                    <button class="registration-btn flex center" @click="LoginUser()">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    PostLogin,
} from "../api/Authentification";

export default {
    name: "Register",
    data() {
        return {
            error: "",
            email: "",
            password: "",
            "font-awesome-icon": FontAwesomeIcon,
        };
    },
    methods: {
        async callback(response) {
            let _error = false;
            const userData = decodeCredential(response.credential);
            this.email = userData.email;
            this.password = userData.sub;
            await PostLogin(this.password, this.email).then(
                (response) => {
                    if (response.code == undefined) {
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('id', response.id);
	  					this.$store.dispatch("switchConnected");
                        this.$router.push('/');
                    } else {
                        _error = true;
                    }
                }
            );
            if (_error == true) {
                await PostRegister(userData.name, this.password, this.email).then(
                    (response) => {
                        if (response.code == undefined) {
                            localStorage.setItem('token', response.token)
                            localStorage.setItem('id', response.id);
	  						this.$store.dispatch("switchConnected");
                            this.$router.push('/');
                        } else {
                            this.error = "Email already use";
                        }
                    }
                );
            }
        },
        async RedirectRegister() {
            this.$router.push('/register');
        },
        async LoginUser() {
            this.error = "";
            this.email = document.getElementById("email").value
            this.password = document.getElementById("password").value
            if (this.username != "" && this.password != "") {
                await PostLogin(this.password, this.email).then(
                    (response) => {
                        if (response?.code == undefined) {
                            localStorage.setItem('token', response.token);
                            localStorage.setItem('id', response.id);
	  						this.$store.dispatch("switchConnected");
                            this.$router.push('/');
                        } else {
                            this.error = "Account doesn't exist";
                        }
                    }
                );
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
    -moz-user-select: none;
    /* Firefox */
    -webkit-user-select: none;
    /* Chrome, Safari, Opéra depuis la version 15 */
    -ms-user-select: none;
    /* Internet explorer depuis la version 10 et Edge */
    user-select: none;
    /* Propriété standard */
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

.registration-btn:hover {
    transform: scale(1.03);
}

.or-container {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.bar {
    width: 45%;
    height: 2px;
    border: 2px solid rgba(0, 0, 0, 0.247);
    background-color: rgba(0, 0, 0, 0.396);
    border-radius: 999px;
}

.or {
    margin-left: 5px;
    margin-right: 5px;
}

.google-btn-login-container {
    width: 100%;
    height: 50px;
    margin-top: 20px;
}

.google-btn {
    width: 35%;
    min-width: 200px;
    height: 100%;
    background-color: #fff;
    color: black;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    transition-duration: 0.3s;
}

.icon-google {
    font-size: 25px;
    font-weight: bold;
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
