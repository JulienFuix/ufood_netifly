<template>
  <div id="bottomProfil" class="mt-10">
    <div class="flex justify-center text-lg md:justify-start">
      <p v-if="FavoriteList.length !== 0" class="text-xl font-bold">
        List of favourite restaurants
      </p>
    </div>
    <button
      class="w-[200px] mt-5 rounded transition delay-15 hover:bg-gray-200 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer font-bold"
      @click="this.toggleCreate()"
    >
      Create Favorite list
    </button>
    <section
      class="justify-center text-lg md:justify-between xl:justify-between flex flex-row flex-wrap mt-10 py-15 lg:px-20 px-5 w-full"
    >
      <div
        v-for="fav in FavoriteList"
        :key="fav.id"
        class="flex flex-row lg:flex-row justify-around items-start"
      >
        <WidgetListeFav :fav="fav" :refresh="refresh" />
      </div>
    </section>
    <div class="text-center w-full" v-if="FavoriteList.length === 0">
      <a class="text-xl font-bold">No restaurant favourits</a>
    </div>
    <div
      style="background-color: rgba(0, 0, 0, 0.5)"
      class="w-[100%] h-[100%] fixed top-0 left-0 right-0 flex justify-center items-center"
      v-show="modalListActive"
    >
      <div class="w-[400px] h-[250px] rounded-xl bg-white">
        <div
          class="w-full font-bold text-xl h-[100px] flex justify-center items-center"
        >
          <p class="text-center">
            Choose a name for your <br />list of favourites
          </p>
        </div>
        <div
          class="w-[400px] h-[150px] flex items-center justify-center flex-col"
        >
          <input
            class="text-gray mb-10 text-[20px] px-2 h-[40px] rounded outline-none border-[#F3F3F3] border-2"
            :value="newNameList"
            type="text"
            :placeholder="'List name'"
            @input="handleCreateText"
          />
          <div class="w-full flex flex-row justify-around">
            <button
              class="w-[150px] rounded transition delay-15 hover:bg-gray-200 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer font-bold"
              @click="this.toggleCreate()"
            >
              Close
            </button>
            <button
              class="w-[150px] rounded transition delay-15 hover:text-white hover:bg-red-500 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer font-bold"
              @click="this.addList()"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetListeFav from "./WidgetListeFav";
import { GetUserFavouriteList } from "../api/User";
import { PostFavouriteList } from "../api/Favorites";
import { ref } from "vue";
export default {
  name: "ListWidgetFavourite",
  components: {
    WidgetListeFav,
  },
  methods: {
    refresh: async function () {
		let token = localStorage.getItem("token");
		let id = localStorage.getItem("id");
      await GetUserFavouriteList(id, token).then((response) => {
        this.FavoriteList = response.items;
      });
    },

    setList: function (liste) {
      this.FavoriteList = liste;
    },
    addList: async function () {
		let token = localStorage.getItem("token");
      await PostFavouriteList(this.newNameList, "coco@ufood.ca", token);
      this.refresh();
      this.toggleCreate();
    },
    toggleCreate: function () {
      this.modalListActive = !this.modalListActive;
      this.newNameList = "";
    },
    handleCreateText: function (e) {
      this.newNameList = e.target.value;
    },
  },
  data() {
    return {
      FavoriteList: [],
      newNameList: "",
      modalListActive: false,
    };
  },
  created: async function getId() {
	let token = localStorage.getItem("token");
	let id = localStorage.getItem("id");
    await GetUserFavouriteList(id, token).then((response) => {
      this.FavoriteList = response.items;
    });
  },
};
</script>
