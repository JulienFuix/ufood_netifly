<template>
  <transition name="modal-animation">
    <div
      class="z-0 fixed mx-auto my-auto mx-4 my-4 bg-white border-[#F3F3F3] border-2 rounded-xl"
      id="modal"
      v-show="modalActive"
    >
      <div class="flex justify-end items-end mt-5 mr-10" @click="close">
        <span class="close text-4xl">&times;</span>
      </div>
      <div class="flex justify-center items-center flex-col">
        <a class="text-3xl font-bold">{{ infoRestaurant?.name }}</a>
        <div v-if="infoRestaurant?.pictures">
          <img
            style="width: 35%; max-height: 20%"
            class="rounded-lg mt-10 bg-red-500 mx-auto my-auto"
            :src="infoRestaurant?.pictures[0]"
          />
        </div>
      </div>
      <div class="flex justify-start items-start flex-col pl-20 pt-20">
        <div class="flex flex-row justify-center items-center mb-4">
          <p class="mr-1">{{ restaurant?.rating }}</p>
          <font-awesome-icon
            :key="n"
            v-for="n in restaurant?.rating"
            icon="fa-solid fa-star "
            color="#fba41b"
          />
        </div>
        <div class="flex flex-row justify-center items-center mb-4">
          <p class="mr-1">My comment : {{ restaurant?.comment }}</p>
        </div>
        <div class="flex flex-row justify-center items-center mb-4">
          <p class="mr-1">Last visit : {{ dateTime(restaurant?.date) }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";
export default {
  name: "ModalRecentlyVisited",
  props: ["modalActive", "restaurant", "infoRestaurant"],
  data() {
    return {
      "font-awesome-icon": FontAwesomeIcon,
    };
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
  methods: {
    dateTime(value) {
      return moment(value).format("MM-DD-YYYY");
    },
  },
};
</script>
