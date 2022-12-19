<template>
    <div class="fixed z-10 w-[100vw] h-[100vh] bg-black bg-opacity-80 justify-center items-center">
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
          <p>{{ user.id }}</p>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { GetUserInfo, UnFollowUser, FollowUser } from "../api/User";
export default {
  setup(props, { emit }) {
    const open = (id, infoRestaurant) => {
      emit("open", id, infoRestaurant);
    };
    return { open };
  },
  data() {
    return {
        user: [],
    };
  },
  methods: {
    async unFollowUser(id) {
      let token = localStorage.getItem("token")
      await UnFollowUser(id, token).then((response) => {
        this.refreshUserData();
      });
    },
    async refreshUserData() {
        let token = localStorage.getItem("token")
        let id = localStorage.getItem("id")
        await GetUserInfo(id, token).then((response) => {
            this.user = response.following;
        });
    },
  },
  created: async function getUser() {
      let token = localStorage.getItem("token")
      await GetUserInfo(id, token).then((response) => {
          this.user = response.following;
      });
  },
};
</script>