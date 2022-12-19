<template>
    <div id="bottomProfil" class="mt-10">
        <div :class="showModaleSelectedUser ? 'flex' : 'hidden'"
            class="top-0 left-0 fixed z-10 w-[100vw] h-[100vh] bg-black bg-opacity-80 justify-center items-center">
            <div class="bg-white w-[300px] rounded-lg px-3 py-2">
                <div class="w-full text-2xl flex justify-end mb-2">
                    <font-awesome-icon icon="fa-solid fa-plus" color="black" size="lg"
                        class="block rotate-45 cursor-pointer"
                        @click="showModaleSelectedUser = !showModaleSelectedUser" />
                </div>
                <div class="w-full text-2xl flex justify-center mb-2">
                    <p class="text-lg font-bold text-inherit">{{ selectedUser.name }}</p>
                </div>
                <div class="flex flex-col w-full mt-10">
                    <p class="font-bold">Email</p>
                    <div class="p-2 w-full rounded bg-gray-100">
                        {{ selectedUser.email }}
                    </div>
                </div>
                <div class="flex flex-col w-full mt-5">
                    <p class="font-bold">Rating</p>
                    <div class="p-2 w-full rounded bg-gray-100">
                        {{ selectedUser.rating }}
                    </div>
                </div>
                <div class="flex items-center justify-center h-[50px]">
                    <button v-if="!following.find(({ id }) => id === selectedUser.id)"
                        class="px-3 bg-blue-500 text-sm text-white rounded"
                        @click="followUser(selectedUser.id, text)">Follow</button>
                    <button v-if="following.find(({ id }) => id === selectedUser.id)"
                        class="px-3 bg-red-600 text-sm text-white rounded"
                        @click="unFollowUser(selectedUser.id, text)">UnFollow</button>
                </div>
            </div>
        </div>
        <div class="flex justify-center text-lg md:justify-start">
            <p v-if="followers.length !== 0" class="text-xl font-bold">
                List of Followers
            </p>
        </div>
        <section
            class="justify-center text-lg md:justify-between xl:justify-between flex flex-row flex-wrap mt-10 py-15 lg:px-20 px-5 w-full">
            <ul class="w-full h-auto p-0 my-2">
                <li
                    class="hover:shadow-md duration-100 cursor-pointer rounded flex flex-row justify-between my-3 p-2"
                    v-bind:key="index" v-for="(item, index) in followers">
                    <p @click="getDataSelectedUser(item.id)" class="w-full">{{ item.name }}</p>
                    <button v-if="!following.find(({ id }) => id === item.id)"
                        class="px-3 bg-blue-500 text-sm text-white rounded"
                        @click="followUser(item.id, text)">Follow</button>
                    <button v-if="following.find(({ id }) => id === item.id)"
                        class="px-3 bg-red-600 text-sm text-white rounded"
                        @click="unFollowUser(item.id, text)">UnFollow</button>
                </li>
            </ul>
        </section>
        <div class="text-center w-full" v-if="followers.length === 0">
            <a class="text-xl font-bold">You have no Followers</a>
        </div>
    </div>
</template>
  
<script>
import { GetUserInfo, FollowUser, UnFollowUser } from "../api/User";
export default {
    setup(props, { emit }) {
        const open = (id, infoRestaurant) => {
            emit("open", id, infoRestaurant);
        };
        return { open };
    },
    data() {
        let user = {};

        return {
            following: [],
            followers: [],
            showModaleSelectedUser: false,
            selectedUser: [],
        };
    },
    methods: {
        async getDataSelectedUser(id) {
            this.showModaleSelectedUser = true;
            let token = localStorage.getItem("token")
            await GetUserInfo(id, token).then((response) => {
                this.selectedUser = response;
            });
        },
        async followUser(id) {
            this.showModaleSelectedUser = false;
            let token = localStorage.getItem("token")
            await FollowUser(id, token).then((response) => {
                this.refreshUserData();
            });
        },
        async unFollowUser(id) {
            this.showModaleSelectedUser = false;
            let token = localStorage.getItem("token")
            await UnFollowUser(id, token).then((response) => {
                this.refreshUserData();
            });
        },
        async refreshUserData() {
            let token = localStorage.getItem("token")
            let id = localStorage.getItem("id")
            await GetUserInfo(id, token).then((response) => {
                this.followers = response.followers;
                this.following = response.following;
            });
        },
    },
    created: async function getUser() {
        let token = localStorage.getItem("token")
        let id = localStorage.getItem("id")
        await GetUserInfo(id, token).then((response) => {
            this.followers = response.followers;
            this.following = response.following;
        });
    },
};
</script>
  