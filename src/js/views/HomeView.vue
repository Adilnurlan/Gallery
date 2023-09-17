<template>
  <Hero @res-data="setData" />
  <div class="wrapper">
    <div class="container-fluid">
      <template v-if="data?.length">
        <ul ref="el" class="d-flex flex-wrap justify-content-between hover">
          <li class="mb-2" v-for="item in data" :key="item.id">
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
          <p>Ничего не найдено</p>
        </div>
      </template>
      <Spinner v-if="isLoading" />
    </div>
  </div>
  <ImageModal :id="modalId" :data="modalData" />
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import getPhotos from "../services/requests.js";
import Hero from "../components/Hero.vue";
import ImageModal from "../components/ImageModal.vue";
import Spinner from "../components/Spinner.vue";
import { Modal } from "bootstrap";

const imageModal = ref(null);
const modalId = ref("");
const modalData = ref(null);

const { data, error, isLoading, getRandomPhotos } = getPhotos();

const setData = (datas) => {
  console.log(datas);
  data.value = datas.results;
};

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

onMounted(() => {
  console.log("onmounted");
  getRandomPhotos();
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul::after {
  content: "";
  width: 400px;
}

.wrapper {
  width: 80vw;
  margin: 0 auto;
}

.hover picture img:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
</style>
