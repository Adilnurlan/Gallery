const path = require("path");
import vue from "@vitejs/plugin-vue";

export default {
  plugins: [vue()],
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
  },
  server: {
    port: 8080,
  },
};
