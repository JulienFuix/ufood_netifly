<template>
  <div
    v-if="infoRestaurant"
    @click="open(restaurant, infoRestaurant)"
    id="resto2"
    style="scale: 90%"
    class="flex justify-start items-center"
  >
    <p class="text-xl">{{ infoRestaurant?.name }}</p>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { GetInfoRestaurant } from "../api/Restaurants";
export default {
  name: "WidgetRestaurantFavoris",
  props: ["restaurant", "listId"],
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
    if (this.props.restaurant.id)
      await GetInfoRestaurant(this.props.restaurant.id, token).then((response) => {
        this.infoRestaurant = response;
        this.path = response?.pictures[0];
      });
  },
};
</script>
