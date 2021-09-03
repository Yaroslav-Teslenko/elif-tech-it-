<template>
  <div>
    <div class="page-title">
      <h3>Банки</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!banks.length">
      Записей пока нет.
      <router-link to="/new-bank">Добавить банк</router-link>
    </p>
    <div v-else class="row">
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">
            <i class="material-icons">filter_drama</i>First
          </div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">place</i>Second
          </div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">whatshot</i>Third
          </div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/new-bank"
        v-tooltip="'Добавить банк'"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({ banks: [], loading: true }),
  async mounted() {
    this.banks = await this.$store.dispatch('fetchBanks')
    console.log(this.banks)
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      //  this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },
  components: {},
}
</script>
