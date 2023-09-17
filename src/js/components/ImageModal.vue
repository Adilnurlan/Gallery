<template>
  <div
    :id="props.id"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex">
            <img
              class="object-fit-cover border rounded me-2"
              :src="data?.user.profile_image.small"
              alt="profileImage"
            />
            <div class="align-middle">
              <p class="m-0">{{ data?.user.name }}</p>
              <i>@{{ data?.user.instagram_username }}</i>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-0 mx-auto">
          <figure>
            <img
              class="bigImage object-fit-contain border rounded img-fluid"
              :src="data?.urls.regular"
              :alt="data?.alt_description"
            />
          </figure>
          <i class="text-align">{{ data?.description }}</i>
        </div>
        <div class="modal-footer">
          <button
            @click="toggleFavoriteHandler(data)"
            type="button"
            class="btn btn-secondary"
          >
            <img
              v-if="isAdded"
              src="../assets/heartFill.svg"
              width="20"
              height="20"
              alt="heartFill"
            />
            <img
              v-else
              src="../assets/heart.svg"
              width="20"
              height="20"
              alt="heart"
            />
          </button>
          <a
            v-if="data?.id"
            ref="download"
            :href="data?.links.download"
            download
            class="btn btn-warning"
          >
            <img src="../assets/download.svg" alt="download" />
            Download
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useFavoritePhotosStore } from "../stores/favoritesStore";
import getPhotos from "../services/requests.js";

const isAdded = ref(false);
const props = defineProps(["id", "data"]);
const store = useFavoritePhotosStore();
const { downloadPhoto } = getPhotos();

const url = computed(() => {
  return downloadPhoto(props.data?.id);
});

const toggleFavoriteHandler = (image) => {
  if (store.favoriteList.length) {
    const isAlreadyExist = store.favoriteList.find(
      (obj) => obj.id === image.id
    );
    if (isAlreadyExist) {
      isAdded.value = false;
      store.removeFromFavorites(image);
    } else {
      isAdded.value = true;
      store.addToFavorites(image);
    }
  } else {
    console.log("emptyarray:", image);
    store.addToFavorites(image);
    isAdded.value = true;
  }
};

watch(
  () => props.id,
  (newId) => {
    const isAlreadyExist = store.favoriteList.find((obj) => obj.id === newId);
    if (isAlreadyExist) {
      isAdded.value = true;
    } else {
      isAdded.value = false;
    }
  }
);

onMounted(() => {
  console.log("modal");
});
</script>

<style scoped>
.bigImage {
  height: 80vh;
}
</style>
