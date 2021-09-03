<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @SidebarToggle="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <!-- :class="{ full: !isOpen }" добавляем класс full
        для растягивания контента, если Sidebar скрыт
         -->
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'
export default {
  name: 'main-layout',
  data: () => ({ isOpen: true, loading: true }),
  components: { Navbar, Sidebar },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      // если this.$store.getters.info пустой
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error(fbError) {
      // console.log(fbError);
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    },
  },
}
</script>
