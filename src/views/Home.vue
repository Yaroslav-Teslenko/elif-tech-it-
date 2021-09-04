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
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Название банка</th>
            <th>Процентная ставка</th>
            <th>Mак. сумма кредита</th>
            <th>Мин. первоначальный взнос</th>
            <th>Срок ссуды</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(bank, idx) of banks" :key="bank.id">
            <td>{{ idx + 1 }}</td>

            <td>{{ bank.name }}</td>
            <td>{{ bank.interestRate }}</td>
            <td>{{ bank.maxLoan }}</td>
            <td>{{ bank.minDownPayment }}</td>
            <td>{{ bank.loanTerm }}</td>
            <td>{{ bank.dateRec | date('date-short') }}</td>
            <td>
              <button
                v-tooltip="'Посмотреть запись'"
                class="btn-small btn"
                @click="$router.push('/edit-bank/' + bank.id)"
              >
                <i class="material-icons">edit</i>
              </button>
            </td>
            <td>
              <button
                v-tooltip="'Удалить запись'"
                class="btn-small btn"
                @click="deleteBankByID(bank.id)"
              >
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
export default {
  name: 'Home',
  data: () => ({ banks: [], loading: true }),
  async mounted() {
    this.banks = await this.$store.dispatch('fetchBanks')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.banks = await this.$store.dispatch('fetchBanks')
      this.loading = false
    },
    async deleteBankByID(id) {
      try {
        await this.$store.dispatch('deleteBankById', id)
        this.banks = await this.$store.dispatch('fetchBanks')
      } catch (error) {}

      this.loading = false
    },
  },
  components: {},
}
</script>
<style scoped>
.btn {
  margin: 2px;
}
</style>
