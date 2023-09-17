<template>
  <div class="container-fluid p-0 mb-5">
    <div class="hero">
      <form
        @submit.prevent="submitSearch"
        class="h-100 w-100 d-flex justify-content-center align-items-center"
        role="search"
      >
        <input
          v-model.trim="search"
          style="max-width: 866px; height: 70px"
          class="form-control mx-5 mx-sm-5"
          type="search"
          placeholder="Поиск"
          aria-label="Search"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import getPhotos from "../services/requests";

const emit = defineEmits(["resData"]);

const search = ref("");
const { data, getPhotosWithSearch } = getPhotos();

const submitSearch = async () => {
  await getPhotosWithSearch(search.value);
  emit("resData", data.value);
  console.log("submit");
};
</script>

<style scoped>
.hero {
  height: 230px;
  width: 100%;
  background: url(../assets/smallBackground.png);
  object-fit: cover;
}

@media (min-width: 768px) {
  .hero {
    background: url(../assets/bigBackground.png);
    height: 260px;
  }
}
</style>
