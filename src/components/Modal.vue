<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header flex center">
        <div class="modal-title flex center">
          <h1 class="modal-h1">Rate us</h1>
        </div>
        <button type="button" class="btnclose" @click="close">X</button>
      </header>
      <div class="radio-container flex center">
        <ul class="rate-area">
          <input
            @click="number_star(5)"
            type="radio"
            id="5-star"
            name="rating"
            value="5"
          /><label for="5-star" title="Amazing">5 stars</label>
          <input
            @click="number_star(4)"
            type="radio"
            id="4-star"
            name="rating"
            value="4"
          /><label for="4-star" title="Good">4 stars</label>
          <input
            @click="number_star(3)"
            type="radio"
            id="3-star"
            name="rating"
            value="3"
          /><label for="3-star" title="Average">3 stars</label>
          <input
            @click="number_star(2)"
            type="radio"
            id="2-star"
            name="rating"
            value="2"
          /><label for="2-star" title="Not Good">2 stars</label>
          <input
            @click="number_star(1)"
            type="radio"
            id="1-star"
            name="rating"
            value="1"
          /><label for="1-star" title="Bad"> 1 star</label>
        </ul>
      </div>
      <div class="text-area-container">
        <textarea
          class="text-area"
          id="comment-content"
          placeholder="Comments..."
        ></textarea>
      </div>
      <div class="date-container-modal flex center">
        <input class="input-date" type="date" id="date" />
      </div>
      <div class="valid-btn-container flex center">
        <button type="button" class="btnmodal" @click="sendVisit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { PostRestaurantVisite } from "../api/User";

export default {
  props: { idRestaurant: String },
  name: "Modal",
  data() {
    return {
      comments: "",
      date: "",
      rating: "",
    };
  },
  methods: {
    number_star(star) {
      this.rating = star;
    },
    async sendVisit() {
      this.comments = document.getElementById("comment-content").value;
      this.date = document.getElementById("date").value;
	  let token = localStorage.getItem(token);
      await PostRestaurantVisite(
        "619fcadb71a43a000462a905",
        this.idRestaurant,
        this.comments,
        this.rating,
        this.date,
		token
      ).then((response) => {
        this.favourite = response.items;
      });
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent !important;
  backdrop-filter: blur(7px);
}

.modal {
  background: #fff;
  height: 60%;
  min-height: 400px;
  width: 30%;
  min-width: 300px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
}

.modal-h1 {
  margin-left: 25px;
}

.modal-header {
  background-color: #000;
  color: white;
  height: 15%;
}

.modal-title {
  width: 90%;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
}

.radio-container {
  width: 100%;
  height: 25%;
}

.btnclose {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  margin: 0;
}

.rate-area {
  float: left;
  border-style: none;
}
.rate-area:not(:checked) > input {
  position: absolute;
  top: -9999px;
  clip: rect(0, 0, 0, 0);
}
.rate-area:not(:checked) > label {
  float: right;
  width: 1em;
  padding: 0.1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 400%;
  line-height: 1.2;
  color: lightgrey;
  text-shadow: 1px 1px #bbb;
}
.rate-area:not(:checked) > label:before {
  content: "★ ";
}

.rate-area > input:checked ~ label {
  color: gold;
  text-shadow: 1px 1px #c60;
  font-size: 450% !important;
}

.rate-area:not(:checked) > label {
  padding: 0 !important;
}

.rate-area:not(:checked) > label:hover,
.rate-area:not(:checked) > label:hover ~ label {
  color: gold;
}

.rate-area > input:checked + label:hover,
.rate-area > input:checked + label:hover ~ label,
.rate-area > input:checked ~ label:hover,
.rate-area > input:checked ~ label:hover ~ label,
.rate-area > label:hover ~ input:checked ~ label {
  color: gold;
  text-shadow: 1px 1px goldenrod;
}
.rate-area > label:active {
  position: relative;
  top: 2px;
  left: 2px;
}

.text-area-container {
  width: 100%;
  padding: 15px;
  height: 35%;
}

.text-area {
  resize: none;
  border: 2px solid black;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 7px;
}

.valid-btn-container {
  width: 100%;
  height: 25%;
}

.btnmodal {
  width: 70%;
  height: 75px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border-radius: 25px;
  transition-duration: 0.3s;
}

.btnmodal:hover {
  transform: scale(1.02);
}

.date-container-modal {
  width: 100%;
  height: 45px;
}

.input-date {
  border: none;
  outline: none;
  height: 100%;
  width: 40%;
  display: flex;
  text-align: center;
  color: #fff;
  background-color: #000;
  border-radius: 25px;
  padding-right: 25px;
  cursor: pointer;
}

::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
