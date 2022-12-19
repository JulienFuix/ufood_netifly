<template>
  <GoogleMap
    api-key="AIzaSyBSxrTGq8RZGNlrOJ_XXYeXelSwdA6agEw"
    style="width: 100%; height: 350px"
    :center="{ lat: lat || 0, lng: lng || 0 }"
    :zoom="15"
  >
    <GMarker :options="{ position: { lat: lat || 0, lng: lng || 0 } }" />
  </GoogleMap>
</template>
<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker as GMarker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, GMarker },
  props: ["lat", "lng"],
});
</script>
