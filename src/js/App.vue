<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="container-fluid p-0">
      <nav class="navbar navbar-expand-lg bg-dark" style="height: 120px">
        <div class="container-xxl h-100">
          <ul class="w-100 me-auto d-flex justify-content-between">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <img
                  src="./assets/OBJECTS.svg"
                  width="112"
                  class="img-fluid"
                  alt="logo"
                />
              </router-link>
            </li>
            <li class="nav-item d-flex align-items-center">
              <router-link
                to="/favorites"
                class="nav-link text-white d-flex align-items-center gap-2"
              >
                <img src="./assets/heart.svg" class="img-fluid" alt="heart" />
                <p class="d-none d-sm-block">Избранное</p>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <section>
    <router-view></router-view>
  </section>
</template>

<style scoped>
p {
  margin: 0;
  color: #fff;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
