<template>
  <div>
    <div class="page-title">
      <h3>Расчитать</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <form class="form" v-else>
      <div class="input-field">
        <input
          id="initialLoan"
          type="text"
          v-model="initialLoan"
          :class="{
            invalid: $v.initialLoan.$dirty && !$v.initialLoan.required,
          }"
        />

        <label for="initialLoan">Первоначальный заем</label>
        <span
          v-if="$v.initialLoan.$dirty && !$v.initialLoan.required"
          class="helper-text invalid"
        >
          Введите первоначальный заем
        </span>
      </div>

      <div class="input-field">
        <input
          id="downPayment"
          type="text"
          v-model="downPayment"
          :class="{
            invalid: $v.downPayment.$dirty && !$v.downPayment.required,
          }"
        />

        <label for="downPayment">Первоначальный взнос</label>
        <span
          v-if="$v.downPayment.$dirty && !$v.downPayment.required"
          class="helper-text invalid"
        >
          Введите первоначальный взнос
        </span>
      </div>
      <div class="input-field">
        <select ref="select" v-model="bank">
          <option v-for="c in banks" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
        <label>Выберите банк</label>
      </div>

      <p>Eжемесячный платеж составит</p>

      <div v-if="errYes">
        <div v-for="(el, idx) in errMessage" :key="idx">
          <p class="error">{{ el }}</p>
        </div>
      </div>
      <p v-else>{{ monthlyPayment }}</p>

      <p>При требованиях банка</p>
      <p>Годовая процентная ставка {{ interestRate }} %</p>
      <p>Срок ссуды {{ loanTerm }} мес</p>

      <p></p>
      <p></p>
      <p></p>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'Calculate',

  data: () => ({
    errMessage: [],
    errYes: false,
    loading: true,
    select: null,
    banks: [],
    bank: null,
    initialLoan: 0,
    downPayment: 0,
    name: '',
    interestRate: 0,
    maxLoan: 0,
    minDownPayment: 0,
    loanTerm: 0,
    monthlyPayment: 0,
  }),
  validations: { initialLoan: { required }, downPayment: { required } },
  watch: {
    bank(bankId) {
      const edtBank = this.banks.find((c) => c.id === bankId)

      this.interestRate = edtBank.interestRate
      this.maxLoan = edtBank.maxLoan
      this.minDownPayment = edtBank.minDownPayment
      this.loanTerm = edtBank.loanTerm
      this.calcMonthlyPayment()
    },
    initialLoan() {
      this.calcMonthlyPayment()
    },
    downPayment() {
      this.calcMonthlyPayment()
    },
  },
  async mounted() {
    this.banks = await this.$store.dispatch('fetchBanks')
    this.loading = false

    if (this.banks.length) {
      this.bank = this.banks[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {},
  methods: {
    async refresh() {
      this.loading = true
      this.calcMonthlyPayment()
      this.loading = false
    },
    calcMonthlyPayment() {
      this.errMessage = []
      this.errYes = false
      try {
        this.monthlyPayment =
          (this.initialLoan * (1 + this.interestRate / 12) ** this.loanTerm) /
          ((1 + this.interestRate / 12) ** this.loanTerm - 1)
        this.monthlyPayment = Math.floor(this.monthlyPayment, 2)

        //console.log(this.monthlyPayment)
      } catch (error) {}
      if (isNaN(this.monthlyPayment)) {
        this.errMessage.push('Ошибка в расчете. Проверьте данные.')
      }

      if (this.initialLoan - this.maxLoan > 0) {
        this.errMessage
          .push(`Сумма заема ${this.initialLoan} превышает предлагаемеую банком
        ${this.maxLoan}`)
      }

      if (this.minDownPayment - this.downPayment > 0) {
        this.errMessage.push(
          `Первоначальный взнос меньше требуемого банком ${this.minDownPayment}`
        )
      }
      if (this.errMessage.length > 0) this.errYes = true
    },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>
<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
