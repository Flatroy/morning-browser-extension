<script setup lang="ts">
import Settings from '~/pages/settings.vue'
// import Index from "~/popup/pages/index.vue";
</script>

<template>
  <div class="text-center m-4">
    <h1 class="text-3xl font-bold pb-6">Extension Options</h1>

    <!--    <RouterLink to="/about">About</RouterLink>-->
  </div>

  <settings :is-page="true"></settings>
  <div class="p-4">
    Note: You can close Extension Options after you set your token and secret.
  </div>
  <!--  <Index></Index>-->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
