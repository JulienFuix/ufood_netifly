<template>
  <div
    style="width: 330px; scale: 90%"
    class="border-[#F3F3F3] border-2 rounded-xl flex items-center flex-col px-2.5"
  >
    <div id="test1" class="text-center w-full flex row" v-show="!modalActive">
      <div
        style="width: 230px; height: 50px; scale: 90%"
        class="flex justify-start items-center"
      >
        <p class="mr-1 font-bold text-[20px]">{{ fav?.name }}</p>
      </div>
      <div
        style="width: 100px; height: 50px; scale: 90%"
        class="flex justify-end items-center"
      >
        <button
          class="rounded transition delay-15 hover:text-white hover:bg-yellow-400 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer"
          @click="toggleModify"
        >
          Modify
        </button>
      </div>
    </div>
    <div class="text-center w-full" v-show="modalActive">
      <div class="w-full flex row">
        <div
          style="width: 200px; height: 50px; scale: 90%"
          class="flex justify-start items-center"
        >
          <input
            class="text-gray text-[20px] rounded outline-none border-[#F3F3F3] border-2"
            :value="newName"
            type="text"
            :placeholder="fav.name"
            @input="handleModifyText"
          />
        </div>
        <div
          style="width: 130px; height: 50px; scale: 90%"
          class="flex justify-end items-center"
        >
          <button
            class="rounded transition delay-15 hover:text-white hover:bg-green-500 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer"
            @click="modifyName"
          >
            Modify
          </button>
        </div>
      </div>
      <div>
        <div class="w-full flex row">
          <div
            style="width: 165px; height: 50px; scale: 90%"
            class="flex justify-start items-center"
          >
            <button
              class="w-[140px] rounded transition delay-15 hover:bg-gray-200 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer"
              @click="toggleModify"
            >
              Close
            </button>
          </div>
          <div
            style="width: 165px; height: 50px; scale: 90%"
            class="flex justify-end items-center"
          >
            <button
              class="w-[140px] rounded transition delay-15 hover:text-white hover:bg-red-500 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer"
              @click="deleteList"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-[330px] flex justify-center items-center py-2 border-[#F3F3F3] border-t-2"
      v-if="fav.restaurants.length === 0"
    >
      <a class="mt-4 text-gray-400">There are no restaurants in this list</a>
    </div>
    <section class="flex column py-2 border-[#F3F3F3] border-t-2">
      <div
        v-for="restaurant in fav.restaurants"
        :key="restaurant.id"
        class="flex flex-row items-center lg:flex-row justify-around"
      >
        <div
          style="width: 330px; height: 50px; scale: 90%"
          class="flex items-center justify-between"
        >
          <router-link
            :to="`/restaurants/${restaurant.id}`"
            :key="restaurant.id"
          >
            <WidgetRestaurantFavoris :restaurant="restaurant" :open="open" />
          </router-link>
          <button
            class="w-[50px] rounded transition delay-15 hover:text-white hover:bg-red-500 text-black px-3 py-1 bg-[#F5F5F5] cursor-pointer font-bold"
            @click="deleteRestaurantInList(fav.id, restaurant.id)"
          >
            X
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import WidgetRestaurantFavoris from "./WidgetRestaurantFavoris.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  DeleteFavouriteList,
  GetFavouriteListById,
  ModifyFavouriteList,
  DeleteRestaurantFavouriteList,
} from "../api/Favorites";
import { ref } from "vue";
export default {
  name: "WidgetListFav",
  props: ["fav", "refresh"],
  components: {
    WidgetRestaurantFavoris,
  },
  setup(props, { emit }) {
    const modalActive = ref(false);
    const newName = ref("");
    const modifyName = async () => {
		let token = localStorage.getItem("token")
      await ModifyFavouriteList(newName.value, "coco@ufood.ca", props.fav.id, token);
      await props.refresh();
      toggleModify();
    };

    const handleModifyText = (e) => {
      newName.value = e.target.value;
    };

    const deleteList = async () => {
		let token = localStorage.getItem("token")
      await DeleteFavouriteList(props.fav.id, token);
      await props.refresh();
    };

    const deleteRestaurantInList = async (listId, restaurantId) => {
		let token = localStorage.getItem("token")
      await DeleteRestaurantFavouriteList(listId, restaurantId, token);
      await props.refresh();
    };

    const toggleModify = () => {
      modalActive.value = !modalActive.value;
      newName.value = "";
    };

    const open = (id, dataRestau) => {
      emit("open", id, dataRestau);
    };
    return {
      open,
      toggleModify,
      modalActive,
      newName,
      modifyName,
      handleModifyText,
      deleteList,
      deleteRestaurantInList,
    };
  },
  data(props) {
    return {
      openModify: false,
      props,
      "font-awesome-icon": FontAwesomeIcon,
      infoList: {},
    };
  },
  created: async function getId() {
	let token = localStorage.getItem("token");
    if (this.props.fav.id)
      await GetFavouriteListById(this.props.fav.id, token).then((response) => {
        this.infoListe = response;
        // this.path = response?.pictures[0];
      });
  },
};
</script>
