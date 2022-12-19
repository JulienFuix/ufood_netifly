<template>
  <div class="flex flex-col lg:p-10 p-5">
    <div class="flex lg:flex-row flex-col w-full items-center justify-between">
      <h1 class="text-3xl mb-5 lg:mb-0">Find a restaurant</h1>
      <search-bar @filterRestaurants="filterRestaurants"></search-bar>
    </div>
    <div class="flex items-center justify-around align-center mt-10 max-w-xs">
      <div
        @click="VueMap = !VueMap"
        :class="
          VueMap === false
            ? 'background: bg-gray-800'
            : 'background: bg-gray-400 hover:text-black'
        "
        class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white items-center text-center cursor-pointer w-20 justify-center"
      >
        <div class="text-sm font-bold text-inherit">List</div>
      </div>
      <div
        @click="VueMap = !VueMap"
        :class="
          VueMap === true
            ? 'background: bg-gray-800'
            : 'background: bg-gray-400 hover:text-black'
        "
        class="rounded-2xl bg-gray-800 px-4 py-2 flex flex-row text-white items-center text-center cursor-pointer w-20 justify-center"
      >
        <div class="text-sm font-bold text-inherit">Map</div>
      </div>
    </div>
    <div
      v-if="VueMap === false"
      class="flex flex-row flex-wrap mt-10 py-15 lg:px-20 px-5 w-full justify-between"
    >
      <div v-for="restaurant in RestaurantList" :key="restaurant.id">
        <router-link
          :to="{ name: 'Restaurant', params: { id: restaurant.id } }"
        >
          <Restaurant :restaurant="restaurant" id="2"></Restaurant>
        </router-link>
      </div>
    </div>
    <div
      class="flex mt-10 py-15 lg:px-20 px-5 w-full h-full"
      v-if="VueMap === true"
    >
      <MapsGoogleList :RestaurantList="RestaurantList" />
    </div>
  </div>
</template>

<script>
import SearchVue from "./home/Search.vue";
import Restaurant from "./home/Restaurant.vue";
import MapsGoogleList from "./MapsGoogleList.vue";
import {GetAllRestaurants} from "../api/Restaurants"
export default {
  components: {
    "search-bar": SearchVue,
    Restaurant,
    MapsGoogleList,
  },
  data() {
    return {
      RestaurantList: [],
      VueMap: false,
    };
  },
  created: async function getId() {
	let token = localStorage.getItem("token");
    await GetAllRestaurants("", token).then((response) => {
		if (response) this.RestaurantList = response.items;
    });
  },
  methods: {
    async filterRestaurants(name = null, price_range = null) {
	  let token = localStorage.getItem("token");
      let query = price_range ? `?price_range=` : "";
      if (price_range && price_range?.length > 0) {
        query += price_range.length;
      }
      let result = await GetAllRestaurants(query, token);
      if (name) {
        const filterName = name.toLowerCase();
        this.RestaurantList = result.items.filter((item) =>
          item.name.toLowerCase().includes(filterName)
        );
      } else {
        this.RestaurantList = result.items;
      }
    },
  },
};
</script>
<style></style>
