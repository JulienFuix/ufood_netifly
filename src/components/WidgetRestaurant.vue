<template>
  <div
    v-if="infoRestaurant"
    @click="open(restaurant, infoRestaurant)"
    id="resto2"
    style="width: 330px; scale: 90%"
    class="border-[#F3F3F3] border-2 rounded-xl flex items-center flex-col px-2.5"
  >
    <img style="width: 300px" class="rounded-lg mt-2.5" :src="path" />
    <div class="flex flex-col items-center my-2.5">
      <p class="text-xl">{{ infoRestaurant?.name }}</p>
      <div class="flex flex-row justify-center items-center mb-4">
        <p class="mr-1">{{ restaurant?.rating }}</p>
        <font-awesome-icon icon="fa-solid fa-star " color="#fba41b" />
      </div>
      <div class="flex flex-row">
        <div class="price-container flex row">
          <p>Average price :</p>
          <p
            v-for="range in infoRestaurant?.price_range"
            :key="range"
            class="response-value price bold"
          >
            $
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { GetInfoRestaurant } from "../api/Restaurants";
export default {
  name: "WidgetRestaurant",
  props: ["restaurant"],
  setup(props, { emit }) {
    const open = (id, dataRestau) => {
      emit("open", id, dataRestau);
    };
    return { open };
  },
  data(props) {
    return {
      props,
      "font-awesome-icon": FontAwesomeIcon,
      infoRestaurant: {},
      path: "",
    };
  },
  created: async function getId() {
	let token = localStorage.getItem("token")
    if (this.props.restaurant.restaurant_id)
      await GetInfoRestaurant(this.props.restaurant.restaurant_id, token).then(
        (response) => {
          this.infoRestaurant = response;
          this.path = response?.pictures[0];
        }
      );
  },
};
</script>
