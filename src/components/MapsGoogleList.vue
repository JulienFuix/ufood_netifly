<template>
  <GoogleMap
    api-key="AIzaSyBSxrTGq8RZGNlrOJ_XXYeXelSwdA6agEw"
    style="width: 100%; height: 600px"
    :center="{
      lat: RestaurantList[0]?.location?.coordinates[1] || 0,
      lng: RestaurantList[0]?.location?.coordinates[0] || 0,
    }"
    :zoom="12.5"
  >
    <MarkerCluster>
      <div v-for="list in RestaurantList" :key="list?.id">
        <CustomMarker
          :options="{
            position: {
              lat: list?.location?.coordinates[1] || 0,
              lng: list?.location?.coordinates[0] || 0,
            },
            anchorPoint: 'BOTTOM_CENTER',
          }"
          @click="$router.push({ name: 'Restaurant', params: { id: list.id } })"
        >
          <div style="text-align: center">
            <div style="font-size: 1.125rem">{{ list?.name }}</div>
            <img
              src="https://cdn0.iconfinder.com/data/icons/travel-vacation/290/travel-transport-hotel-vacation-holidays-tourist-tourism-travelling-traveling_149-1024.png"
              width="50"
              height="50"
              style="margin-top: 8px"
            />
          </div>
        </CustomMarker>
      </div>
    </MarkerCluster>
  </GoogleMap>
</template>
<script>
import { defineComponent } from "vue";
import { GoogleMap, MarkerCluster, CustomMarker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, CustomMarker, MarkerCluster },
  props: ["RestaurantList"],
});
</script>
