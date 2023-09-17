import axios from "axios";
import { ref } from "vue";

const ApiKey = "kY6ys9ukZa9NN5T_NGg8iQErKeKswHzMLLJMpuwMrxs";
axios.defaults.baseURL = "https://api.unsplash.com/";

export default function getPhotos() {
  const data = ref(null);
  const downloadLink = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const getRandomPhotos = async () => {
    isLoading.value = true;
    await axios
      .get("/photos/random", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        params: {
          client_id: ApiKey,
          count: 8,
        },
      })
      .then((res) => {
        data.value = res.data;
        console.log(res.data);
      })
      .catch((err) => (error.value = err))
      .finally(() => {
        isLoading.value = false;
      });
  };

  const getPhotosWithSearch = async (value) => {
    isLoading.value = true;
    await axios
      .get("/search/photos", {
        params: {
          client_id: ApiKey,
          query: value,
        },
      })
      .then((res) => {
        data.value = res.data;
        console.log(res.data);
      })
      .catch((err) => (error.value = err))
      .finally(() => {
        isLoading.value = false;
      });
  };

  const downloadPhoto = async (id) => {
    await axios
      .get(`/photos/${id}/download`, {
        params: {
          client_id: ApiKey,
        },
      })
      .then((res) => {
        console.log(res.data.url);
        return res.data.url;
      })
      .catch((err) => (error.value = err));
  };

  return {
    data,
    error,
    downloadLink,
    getRandomPhotos,
    getPhotosWithSearch,
    downloadPhoto,
  };
}
