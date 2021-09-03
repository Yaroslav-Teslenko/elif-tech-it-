<template>
  <div id="app">
    <component :is="layout"> </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/emptyLayout.vue";
import MainLayout from "@/layouts/mainLayout.vue";
export default {
  computed: {
    layout() {
      //console.log();
      // ???  подозреваю авто трансляцию
      // имени компонта из camel-style в kebab
      // EmptyLayout  empty-layout
      // да, так и есть. Во vue  они равнозначны
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: { EmptyLayout, MainLayout },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
