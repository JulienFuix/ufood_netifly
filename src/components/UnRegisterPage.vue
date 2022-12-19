<template>
    <div class="flex flex-col justify-center items-center mt-[200px]">
        <p class="text-xl font-bold mb-10">You are not logged in</p>
        <div class="flex flex-row justify-between w-[250px]">
            <button @click="RedirectRegister()" class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:bg-gray-600 items-center text-center justify-around">Register</button>
            <button @click="RedirectLogin()" class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:bg-gray-600 items-center text-center justify-around">Login</button>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    name: "UnRegisterPage",
    data() {
        return {
            error: "",
            email: "",
            password: "",
            "font-awesome-icon": FontAwesomeIcon,
        };
    },
    methods: {
        RedirectRegister() {
            this.$router.push('/register');
        },
        RedirectLogin() {
            this.$router.push('/login');
        },
    },
}
</script>
