<template>
  <div id="search" class="flex lg:flex-row flex-col lg:w-auto w-full">
    <div
      class="flex lg:order-1 order-2 lg:w-[254px] w-full h-[44px] bg-[#F5F5F5] rounded-md p-2"
    >
      <input
        class="bg-[#F5F5F5] flex w-full h-full outline-none"
        placeholder="Rechercher"
        type="text"
        v-model="searchQuery"
        @input="(event) => this.test()"
      />
    </div>
    <div class="lg:order-2 order-1 flex flex-row lg:mb-0 mb-2 lg:w-auto w-full">
      <div
        class="lg:w-[172px] lg:flex-auto flex-1 h-[44px] bg-[#F5F5F5] rounded-md p-2 lg:ml-5 mr-1"
      >
        <select
          v-model="priceRange"
          @change="(event) => this.test()"
          class="bg-[#F5F5F5] flex w-full h-full outline-none text-[##C6C6C6] text-[#c8c8c8]"
          name="avPrice"
          id="price"
        >
          <option value="">Average price</option>
          <option style="color: #c8c8c8" value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$+">$$$ +</option>
        </select>
      </div>
      <div
        class="w-[172px] lg:flex-auto flex-1 h-[44px] bg-[#F5F5F5] rounded-md p-2 lg:ml-5 ml-1"
      >
        <select
          class="bg-[#F5F5F5] flex w-full h-full outline-none text-[##C6C6C6] text-[#c8c8c8]"
          name="avPrice"
          id="price"
        >
          <option value="">Filter by</option>
          <option style="color: #c8c8c8" value="price">Price</option>
          <option value="popularity">Popularity</option>
          <option value="Fastest">Fastest</option>
          <option value="foodquality">Food Quality</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  data() {
    return {
      searchQuery: null,
      priceRange: null,
    };
  },
  methods: {
    test() {
      this.filterRestaurants(this.searchQuery, this.priceRange);
    },
  },
  setup(props, { emit }) {
    const filterRestaurants = (name, price_range) => {
      emit("filterRestaurants", name, price_range);
    };
    return { filterRestaurants };
  },
};
</script>
