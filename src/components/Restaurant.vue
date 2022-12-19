<template>
  <div class="containers">
    <div class="upper-content flex">
      <div class="left-content">
        <div class="restaurant-name flex">
          <h1 class="title-restaurant">{{ this.name_restaurant }}</h1>
          <div class="rating-container flex center">
            <font-awesome-icon
              icon="fa-solid fa-star"
              class="fill-inherit icon"
              size="lg"
            />
            {{ this.rating }}
          </div>
          <button class="btn-opn-modal" @click="showModal">
            <p>Rate us</p>
          </button>
          <Modal
            :idRestaurant="id"
            v-show="isModalVisible"
            @close="closeModal"
          />
        </div>
        <div class="price-container flex">
          <p>Average price :</p>
          <p
            v-for="range in this.price_range"
            :key="range"
            class="response-value price bold"
          >
            $
          </p>
        </div>
        <div class="type-container flex">
          <p>Type :</p>
          <p class="response-value genre bold">{{ this.genres[0] }}</p>
        </div>
        <div class="time-container">
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Mon :</p>
            <p class="hours-content">
              {{ this.opening_hours.monday }}
            </p>
          </div>
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Tue :</p>
            <p class="hours-content">
              {{ this.opening_hours.tuesday }}
            </p>
          </div>
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Wed :</p>
            <p class="hours-content">
              {{ this.opening_hours.wednesday }}
            </p>
          </div>
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Thu :</p>
            <p class="hours-content">
              {{ this.opening_hours.thursday }}
            </p>
          </div>
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Fri :</p>
            <p class="hours-content">
              {{ this.opening_hours.friday }}
            </p>
          </div>
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Sat :</p>
            <p class="hours-content">
              {{ this.opening_hours.saturday }}
            </p>
          </div>
          <div class="date-container flex">
            <p class="txt-hours response-value hours">Sun :</p>
            <p class="hours-content">
              {{ this.opening_hours.sunday }}
            </p>
          </div>
        </div>
        <div class="tel-container">
          <p class="response-value">+1{{ this.tel }}</p>
        </div>
        <div class="address-container flex">
          <p class="response-value bold">{{ this.address }}</p>
          <button class="btn-itinerary" type="button" @click="openGoogleMap()">
            Itinerary
            <font-awesome-icon
              icon="fa-solid fa-circle-arrow-right"
              class="fill-inherit icon-nav"
              size="lg"
            />
          </button>
        </div>
      </div>
      <div class="right-content flex center">
        <div class="carouselcontainer">
          <div
            id="carouselExampleIndicators"
            class="carousel slide relative"
            data-bs-ride="carousel"
          >
            <div
              class="carousel-inner relative w-full overflow-hidden h-96 bg-cover bg-center"
            >
              <div class="carousel-item active float-left w-full">
                <img
                  :src="this.pictures[0]"
                  class="block w-full"
                  alt="Wild Landscape"
                />
              </div>
              <div
                v-for="picture in this.pictures.slice(1)"
                v-bind:key="picture"
                class="carousel-item float-left w-full"
              >
                <img :src="picture" class="block w-full" alt="Camera" />
              </div>
            </div>
            <button
              class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon inline-block bg-no-repeat"
                aria-hidden="true"
              >
              </span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon inline-block bg-no-repeat"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="lower-content">
      <div class="fav-container flex column">
        <div class="fav-header flex center bold">
          Add to your favourite list
        </div>
        <div class="items-container">
          <div
            v-for="elem in this.favourite"
            :key="elem.name"
            class="fav-items"
          >
            {{ elem.name }}
            <input type="checkbox" :id="elem.id" />
          </div>
        </div>
        <button class="validation-fav-button" @click="AddToFav()">Valid</button>
      </div>
      <div class="map-container">
        <MapsGoogle :lng="this.lng" :lat="this.lat" />
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import {
  GetInfoRestaurant,
} from "../api/Restaurants";
import {
  GetUserFavouriteList,
} from "../api/User";
import {
  PostRestaurantFavouriteList,
} from "../api/Favorites";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import MapsGoogle from "./MapsGoogle";
import "leaflet/dist/leaflet.css";

export default {
  name: "Restaurant",
  components: {
    Modal,
    MapsGoogle,
  },
  data() {
    return {
      lng: 0,
      lat: 0,
      id: this.$route.params.id,
      "font-awesome-icon": FontAwesomeIcon,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
      name_restaurant: "",
      price_range: "",
      genres: [],
      opening_hours: {},
      tel: "",
      address: "",
      rating: "",
      pictures: [],
      isModalVisible: false,
      isActive: true,
      favourite: [],
    };
  },
  async created() {
	let token = localStorage.getItem("token");
	let id = localStorage.getItem("id");
    await GetInfoRestaurant(this.id, token).then((response) => {
      this.name_restaurant = response.name;
      this.price_range = response.price_range;
      this.genres = response.genres;
      this.opening_hours = response.opening_hours;
      this.tel = response.tel;
      this.address = response.address;
      this.rating = Math.round(response.rating * 100) / 100;
      this.pictures = response.pictures;
      this.lat = response.location.coordinates[1];
      this.lng = response.location.coordinates[0];
    });
    await GetUserFavouriteList(id, token).then((response) => {
      this.favourite = response.items;
    });
  },
  methods: {
    openGoogleMap() {
      window.open(
        "https://www.google.com/maps/dir/?api=1&destination=" +
          this.lat +
          "," +
          this.lng,
        "_blank"
      );
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async AddToFav() {
	let token = localStorage.getItem("token");
      this.favourite.forEach(async (element) => {
        let isChecked = document.getElementById(element.id).checked;
        if (isChecked) {
          await PostRestaurantFavouriteList(element.id, this.id, token);
        }
      });
    },
  },
};
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  font-family: "Josefin Sans", sans-serif;
}

.dark-mode {
  background-color: #1c1c1c;
  color: white;
}

.flex {
  display: flex;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.column {
  flex-direction: column;
}

.f-width {
  width: 100%;
}

.f-height {
  height: 100%;
}

.white {
  color: white;
}

.debug-border {
  border: 2px solid green;
}

.debug-bg {
  background-color: red;
}

.bold {
  font-weight: bold;
}

.underline {
  text-decoration: underline;
}

.underline-border {
  border-bottom: 2px solid white;
}

.unSelected {
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Chrome, Safari, Opéra depuis la version 15 */
  -ms-user-select: none; /* Internet explorer depuis la version 10 et Edge */
  user-select: none; /* Propriété standard */
}

/* ---------------------------------------------------------------- */

.containers {
  width: 100%;
  height: 100%;
  padding-left: 150px;
  padding-right: 150px;
  padding-top: 50px;
}

.upper-content {
  width: 100%;
  height: 50%;
}

.left-content,
.right-content {
  width: 50%;
  height: 100%;
  min-width: 320px;
}

.left-content {
  overflow-x: hidden;
}

.title-restaurant {
  font-size: 35px;
  font-weight: bold;
}

.add-to-fav-btn {
  width: auto;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: white;
  margin-top: 5px;
  margin-left: 15px;
  border-radius: 25px;
  cursor: pointer;
  transition-duration: 0.3s;
  padding-left: 25px;
  padding-right: 25px;
}

.add-to-fav-btn:hover {
  transform: scale(1.02);
}

.btn-opn-modal {
  width: auto;
  min-width: 100px;
  height: 45px;
  border-radius: 25px;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  margin-top: 5px;
  margin-left: 15px;
  cursor: pointer;
  transition-duration: 0.3s;
}

.btn-opn-modal:hover {
  transform: scale(1.02);
}

.rating-container {
  margin-left: 25px;
  text-align: center;
  width: auto;
  height: 100%;
  align-content: center;
  height: 50px;
}

.response-value {
  margin-left: 5px;
}

.hours-container {
  overflow: hidden;
  height: auto;
}

.lower-content {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding-bottom: 50px;
  padding-left: 25px;
}

.map-container {
  width: 70%;
  margin-left: 25px;
  overflow: hidden;
  border-radius: 8px;
  height: 100%;
}

.right-content {
  padding: 50px;
}

.txt-hours {
  width: 50px;
  font-weight: bold;
}

.date-container {
  padding: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  width: 80%;
}

.date-container:first-child {
  border-top: 0px;
}

.time-container {
  margin-top: 25px;
}

.tel-container {
  margin-top: 15px;
}

.carouselcontainer {
  overflow: hidden;
  border-radius: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.btn-itinerary {
  margin-left: 50px;
  background-color: black;
  color: white;
  font-weight: bold;
  width: 150px;
  border-radius: 24px;
  height: 44px;
  min-width: 150px;
}

.address-container {
  align-items: center;
}

.icon {
  color: #fba41b;
  margin-right: 5px;
}

.active {
  color: #fff;
}

.icon-nav {
  color: #fff;
  margin-left: 12px;
}

.fav-container {
  height: 350px;
  width: 25%;
  border: 4px solid #000;
  border-radius: 8px;
  align-items: center;
}

.fav-header {
  width: 80%;
  border-bottom: 1px solid black;
  height: 50px;
}

.fav-items {
  width: 90%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

.fav-items:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.254);
}

.items-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  overflow-y: scroll;
}

.validation-fav-button {
  width: 40%;
  height: 55px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 99999px;
  cursor: pointer;
  transition-duration: 0.3s;
}

.validation-fav-button:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 1160px) {
  .upper-content {
    flex-direction: column-reverse;
  }
  .right-content {
    width: 100%;
    min-height: 45%;
    padding: 0px;
  }
  .carouselcontainer {
    border-radius: 0px;
  }
  .containers {
    padding: 0px;
  }
  .left-content {
    width: 100%;
    padding-left: 50px;
    margin-bottom: 30px;
  }
  .address-container {
    flex-direction: column;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .btn-itinerary {
    margin-left: 0px;
    margin-top: 15px;
  }
  .restaurant-name {
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    margin-right: 25px;
  }
  .add-to-fav-btn,
  .btn-opn-modal {
    width: 80%;
  }
  .lower-content {
    flex-direction: column-reverse;
    align-items: center;
    gap: 15px;
  }
  .fav-container,
  .map-container {
    width: 80%;
    min-width: 300px;
    margin: 0;
  }
}
</style>
