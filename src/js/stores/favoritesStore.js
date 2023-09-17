import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFavoritePhotosStore = defineStore("favoritePhotos", () => {
  const favoriteList = ref([]);

  function addToFavorites(value) {
    favoriteList.value.push(value);
  }

  function removeFromFavorites(value) {
    favoriteList.value = favoriteList.value.filter(
      (obj) => obj.id !== value.id
    );
  }

  return { favoriteList, addToFavorites, removeFromFavorites };
});
