<template>
  <div id="bottomProfil" class="mt-10">
    <div class="flex justify-center text-lg md:justify-start">
      <p v-if="RestaurantList.length !== 0" class="text-xl font-bold">
        List of restaurants visited
      </p>
    </div>
    <section
      class="justify-center text-lg md:justify-between xl:justify-between flex flex-row flex-wrap mt-10 py-15 lg:px-20 px-5 w-full"
    >
      <div
        v-for="restaurant in RestaurantList"
        :key="restaurant.id"
        class="flex flex-row lg:flex-row justify-around items-start"
      >
        <WidgetRestaurant :restaurant="restaurant" @open="open" />
      </div>
    </section>
    <div class="text-center w-full" v-if="RestaurantList.length === 0">
      <a class="text-xl font-bold">No restaurant visisted</a>
    </div>
  </div>
</template>

<script>
import WidgetRestaurant from "./WidgetRestaurant";
import { GetVisitRestaurant } from "../api/User";
export default {
  name: "ListWidgetRestaurant",
  components: {
    WidgetRestaurant,
  },
  setup(props, { emit }) {
    const open = (id, infoRestaurant) => {
      emit("open", id, infoRestaurant);
    };
    return { open };
  },
  data() {
    return {
      RestaurantList: [],
    };
  },
  created: async function getId() {
	let id = localStorage.getItem("id");
	let token = localStorage.getItem("token");
    await GetVisitRestaurant(id, token).then((response) => {
      this.RestaurantList = response.items;
    });
  },
};
</script>
