<template>
  <div class="w-full h-[calc(100vh-100px)] flex justify-center">
    <div style="width: 1000px" class="mt-2 md:mt-10 flex flex-col">
      <div id="topProfil" class="flex flex-row justify-between">
        <img
          style="width: 150px; height: 150px; object-fit: cover"
          class="ml-2 lg:ml-0 rounded-full"
          src="https://www.sony.co.uk/presscentre/assets/resized/2021/05/contact-dummy-1-e1626257801692_landscape_964x656.jpg"
        />
        <div
          class="flex flex-col md:flex-row justify-center md:justify-between w-full box-border px-10"
        >
          <div class="flex items-center text-2xl mb-2 md:mb-0 font-bold">
            <h1>{{ this.user.name }}</h1>
          </div>
          <div class="flex items-center jusitfy-end mb-2 md:mb-0">
            <p class="mr-3">Your score:</p>
            <p class="font-bold">{{ this.user.rating }}</p>
          </div>
          <div class="flex items-center jusitfy-end max-w-xs">
            <div
              class="flex max-w-xs lg:w-[172px] lg:flex-auto flex-1 h-[44px] bg-[#F5F5F5] rounded-md p-2 lg:ml-5 mr-1"
            >
              <select
                class="bg-[#F5F5F5] flex w-full h-full outline-none text-[##C6C6C6] text-[#C8C8C8]"
                v-model="selectList"
                name="avPrice"
              >
                <option value="true" key="1">Recently visited</option>
                <option value="false" key="2">Listes Favourits</option>
                <option value="followers" key="3">Followers</option>
                <option value="following" key="4">Following</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="px-5">
        <div v-if="selectList === 'true'">
          <ListWidgetRestaurant @open="toggleModal" />
        </div>
        <div v-if="selectList === 'false'">
          <ListWidgetFavourite />
        </div>
        <div v-if="selectList === 'followers'">
          <ListFollowers />
        </div>
        <div v-if="selectList === 'following'">
          <ListFollowing />
        </div>
      </div>
    </div>
    <ModalRecentlyVisited
      @close="toggleModal"
      :modalActive="modalActive"
      :restaurant="idRestaurant"
      :infoRestaurant="infoRestaurant"
    />
  </div>
</template>

<script>
import ListWidgetRestaurant from "./ListWidgetRestaurant";
import ListWidgetFavourite from "./ListWidgetFavourite";
import ListFollowers from "./ListFollowers.vue";
import ListFollowing from "./ListFollowing.vue";
import ModalRecentlyVisited from "./ModalRecentlyVisited";
import { GetUserInfo } from "../api/User";
import { ref } from "vue";
export default {
  name: "User",
  components: {
    ListWidgetRestaurant,
    ListWidgetFavourite,
    ListFollowers,
    ListFollowing,
    ModalRecentlyVisited,
  },
  data() {
    let selectList = ref("true");
    let user = {};

    return { selectList, user };
  },
  setup() {
    const modalActive = ref(false);
    let idRestaurant = ref({});
    let infoRestaurant = ref({});
    const toggleModal = (id, info) => {
      modalActive.value = !modalActive.value;
      idRestaurant.value = id;
      infoRestaurant.value = info;
    };
    return {
      modalActive,
      toggleModal,
      idRestaurant,
      infoRestaurant,
    };
  },
  created: async function getUser() {
	let token = localStorage.getItem("token")
	let id = localStorage.getItem("id")
    await GetUserInfo(id, token).then((response) => {
      this.user = response;
    });
  },
};
</script>
