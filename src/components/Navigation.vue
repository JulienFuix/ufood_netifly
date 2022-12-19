<template>
  <div>
    <div :class="showModaleSearch ? 'flex' : 'hidden'"
      class="fixed z-10 w-[100vw] h-[100vh] bg-black bg-opacity-80 justify-center items-center">
      <div class="bg-white w-[300px] rounded-lg px-2 py-2">
        <div class="w-full text-2xl flex justify-end mb-2">
          <font-awesome-icon
                icon="fa-solid fa-plus"
                color="black"
                size="lg"
                class="block rotate-45 cursor-pointer"
                @click="showModaleSearch = !showModaleSearch"
              />
        </div>
        <div class="w-full text-2xl flex justify-center mb-2">
          <p class="text-lg font-bold text-inherit">Find user by name</p>
        </div>
        <div class="text-sm font-bold text-white rounded bg-gray-800 px-4 py-2 flex flex-row min-w-3/6 relative">
          <input class="bg-gray-800 text-white outline-none" placeholder="Search User"
            @input="event => searchUser(event.target.value)" />
        </div>
        <ul class="w-full h-auto p-0 mt-2">
          <li class="h-7 overflow-hidden leading-[30px] flex flex-row justify-between my-1" v-bind:key="index" v-for="(item, index) in userList">
            <p>{{ item.name }}</p>
            <button class="px-3 bg-blue-500 text-sm text-white rounded" @click="followUser(item.id, text)">Follow</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-black">
      <nav class="px-10 py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <div
          v-if="connected"
            class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:text-black hover:bg-white items-center text-center justify-around"
          >
            <font-awesome-icon
              icon="fa-solid fa-house"
              class="fill-inherit"
              size="sm"
            />
            <router-link
              class="text-sm font-bold text-inherit pl-2 mx-auto"
              to="/"
              >Home</router-link
            >
          </div>
          <div @click="showMenu = !showMenu" class="md:hidden justify-end">
            <button
              type="button"
              class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <font-awesome-icon
                icon="fa-solid fa-bars"
                color="white"
                size="lg"
              />
            </button>
          </div>
        </div>
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-5 md:mt-0 lg:w-2/3 justify-end"
        >
          <div
			v-if="connected"
            class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:text-black hover:bg-white items-center text-center min-w-1/5"
          >
            <div @click="showModaleSearch = !showModaleSearch" class="cursor-pointer text-sm font-bold text-inherit" to="/user"
              >Find User</div
            >
          </div>
          <div
			v-if="connected"
            class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:text-black hover:bg-white items-center text-center min-w-1/5"
          >
            <font-awesome-icon
              icon="fa-solid fa-user"
              size="sm"
              class="fill-inherit"
            />
            <router-link class="text-sm font-bold text-inherit pl-2" to="/user"
              >Username</router-link
            >
          </div>
          <div
            @click="logout()"
			v-if="connected"
            class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:text-black hover:bg-white items-center text-center cursor-pointer"
          >
            <font-awesome-icon
              icon="fa-solid fa-right-from-bracket"
              size="sm"
              class="fill-inherit"
            />
            <div class="text-sm font-bold text-inherit pl-2" to="/user">
              Logout
            </div>
          </div>
          <div
            @click="login()"
			v-if="!connected"
            class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white hover:text-black hover:bg-white items-center text-center cursor-pointer"
          >
            <div class="text-sm font-bold text-inherit">Login</div>
          </div>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { GetAllUserBySearch, FollowUser } from "../api/User";
import "../input.css";

export default {
  data() {
    let userList = [];

    return {
      "font-awesome-icon": FontAwesomeIcon,
      showMenu: false,
      modaleSearch: false,
      showModaleSearch: false,
      userList: [],
    };
  },
  computed: {
	connected() {
		return this.$store.state.connected;
	},
   },
  methods: {
	login() {
        this.$router.push('/login');
	},
    logout() {
	  this.$store.dispatch("switchConnected");
      localStorage.removeItem("token");
      this.$router.push('/noregister');
    },
    async searchUser(text) {
      let token = localStorage.getItem("token")
      if (text !== undefined) {
        this.modaleSearch = true;
        await GetAllUserBySearch(text, token).then((response) => {
          this.userList = response.items;
        });
      } else {  
        this.modaleSearch = false;
      }
    },
    async followUser(id) {
      let token = localStorage.getItem("token")
      await FollowUser(id, token).then((response) => {
        this.showModaleSearch = !this.showModaleSearch;
      });
    }
  },
};
</script>
