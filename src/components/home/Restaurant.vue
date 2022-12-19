<template>
  <div
    id="restaurant"
    class="flex flex-col lg:w-[356px] w-full h-[298px] bg-[#FFFFFF] border-[2px] border-[#F3F3F3] rounded-md items-center py-5 mx-5 my-5"
  >
    <img
      :src="this.restaurant.pictures[0]"
      class="max-h-[70%] min-h-[70%] object-cover min-w-[90%] max-w-[90%]"
    />
    <h1 class="text-[18px] mt-2">{{ this.restaurant.name }}</h1>
    <p>{{ this.restaurant.rating?.toFixed(1) }}</p>
    <div class="flex flex-row items-center">
      <p>Price range :</p>
      &nbsp;
      <p
        v-for="range in this.restaurant.price_range"
        :key="range"
        class="font-bold"
      >
        $
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "restaurant"],
  name: "restaurant",
};
</script>
