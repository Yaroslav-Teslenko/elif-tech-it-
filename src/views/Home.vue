<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Create' | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrency from '@/components/HomeCurrency.vue'
export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill'),
    }
  },
  data: () => ({ loading: true }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    //console.log(this.currency);
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },
  components: { HomeBill, HomeCurrency },
}
</script>
