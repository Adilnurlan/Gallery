<template>
  <Hero v-if="false" />
  <h1 class="title mt-4 me-auto">Избранное</h1>
  <div class="wrapper">
    <div class="container-fluid">
      <template v-if="store.favoriteList.length">
        <ul class="d-flex flex-wrap justify-content-between hover">
          <li class="mb-2" v-for="item in store?.favoriteList" :key="item.id">
            <picture>
              <img
                ref="imageModal"
                @click="clickHandler(item)"
                class="object-fit-cover border rounded img-fluid"
                :src="item?.urls.small"
                :alt="item?.alt_description"
              />
            </picture>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="d-flex justify-content-center">
          <p>ПУСТО</p>
        </div>
      </template>
    </div>
  </div>
  <ImageModal :id="modalId" :data="modalData" />
</template>
<script setup>
import { ref, nextTick, onMounted, watch } from "vue";
import Hero from "../components/Hero.vue";
import ImageModal from "../components/ImageModal.vue";
import { useFavoritePhotosStore } from "../stores/favoritesStore";
import { Modal } from "bootstrap";

const imageModal = ref(null);
const modalId = ref("");
const modalData = ref(null);
const store = useFavoritePhotosStore();

const clickHandler = (image) => {
  modalId.value = image.id;
  nextTick(() => {
    imageModal.value = new Modal(`#${modalId.value}`, {
      keyboard: false,
    });
    imageModal.value.show();
    modalData.value = image;
  });
};
</script>

<style scoped>
.wrapper {
  width: 75vw;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
}

ul::after {
  content: "";
  width: 400px;
}

.title {
  display: flex;
  justify-content: center;
}

.hover picture img:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
</style>
