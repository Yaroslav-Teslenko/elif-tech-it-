<template>
  <Loader v-if="loading" />
  <form class="form" v-else @submit.prevent="handleSubmit">
    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="curBank.name"
        :class="{
          invalid: $v.name.$dirty && !$v.name.required,
        }"
      />

      <label for="name">Описание</label>
      <span
        v-if="$v.name.$dirty && !$v.name.required"
        class="helper-text invalid"
      >
        Введите описание
      </span>
    </div>
  </form>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'BankEdit',
  props: ['bank'],
  data: () => ({
    loading: true,
    curBank: {
      name: '',
      interestRate: 0,
      maxLoan: 0,
      minDownPayment: 0,
      loanTerm: 0,
    },
  }),
  validations: {
    name: { required },
  },
  async mounted() {
    this.loading = false
    console.log(this.$route.name)
    if (this.$route.name !== 'new-bank') {
      curBank = Object.assign(bank)
    }
  },
  methods: {
    async refresh() {
      this.loading = true

      this.loading = false
    },
  },
}
</script>
