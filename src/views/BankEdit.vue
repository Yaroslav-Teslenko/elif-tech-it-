<template>
  <Loader v-if="loading" />
  <form class="form" v-else @submit.prevent="handleSubmit">
    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="name"
        :class="{
          invalid: $v.name.$dirty && !$v.name.required,
        }"
      />

      <label for="name">Название банка</label>
      <span
        v-if="$v.name.$dirty && !$v.name.required"
        class="helper-text invalid"
      >
        Введите название банка
      </span>
    </div>

    <div class="input-field">
      <input
        id="interestRate"
        type="text"
        v-model="interestRate"
        :class="{
          invalid:
            $v.interestRate.$dirty &&
            (!$v.interestRate.required || !$v.interestRate.decimal),
        }"
      />

      <label for="interestRate">Процентная ставка</label>
      <span
        v-if="
          $v.interestRate.$dirty &&
          (!$v.interestRate.required || !$v.interestRate.decimal)
        "
        class="helper-text invalid"
      >
        Введите процентную ставку
      </span>
    </div>

    <div class="input-field">
      <input
        id="maxLoan"
        type="text"
        v-model="maxLoan"
        :class="{
          invalid:
            $v.maxLoan.$dirty && (!$v.maxLoan.required || !$v.maxLoan.decimal),
        }"
      />

      <label for="maxLoan">Максимальная сумма кредита</label>
      <span
        v-if="
          $v.maxLoan.$dirty && (!$v.maxLoan.required || !$v.maxLoan.decimal)
        "
        class="helper-text invalid"
      >
        Введите максимальную сумму кредита
      </span>
    </div>

    <div class="input-field">
      <input
        id="minDownPayment"
        type="text"
        pattern="\d+(.\d{2})?"
        v-model="minDownPayment"
        :class="{
          invalid:
            $v.minDownPayment.$dirty &&
            (!$v.minDownPayment.required || !$v.minDownPayment.decimal),
        }"
      />

      <label for="minDownPayment">Минимальный первоначальный взнос</label>
      <span
        v-if="
          $v.minDownPayment.$dirty &&
          (!$v.minDownPayment.required || !$v.minDownPayment.decimal)
        "
        class="helper-text invalid"
      >
        Введите минимальный первоначальный взнос
      </span>
    </div>

    <div class="input-field">
      <input
        id="loanTerm"
        type="text"
        v-model="loanTerm"
        :class="{
          invalid: $v.loanTerm.$dirty && !$v.loanTerm.required,
        }"
      />

      <label for="loanTerm">Срок ссуды </label>
      <span
        v-if="$v.loanTerm.$dirty && !$v.loanTerm.required"
        class="helper-text invalid"
      >
        Введите срок ссуды
      </span>
    </div>
    <button class="btn waves-effect waves-light" type="submit">
      <i class="material-icons left">save</i>
      Сохранить
    </button>
  </form>
</template>
<script>
import {
  required,
  minValue,
  maxValue,
  numeric,
  decimal,
} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
// TODO add  validation nubder
export default {
  name: 'BankEdit',

  data: () => ({
    loading: true,
    edtMode: false,
    name: '',
    interestRate: 0,
    maxLoan: 0,
    minDownPayment: 0,
    loanTerm: 1,
  }),
  validations: {
    name: { required },
    interestRate: { required, decimal },
    maxLoan: { required, decimal },
    minDownPayment: { required, decimal },
    loanTerm: { required, numeric, minValue: minValue(1) },
  },
  async mounted() {
    if (this.$route.name == 'edit-bank') {
      this.edtMode = true
      const edtBank = await this.$store.dispatch(
        'fetchBankById',
        this.$route.params.id
      )
      this.name = edtBank.name
      this.interestRate = edtBank.interestRate
      this.maxLoan = edtBank.maxLoan
      this.minDownPayment = edtBank.minDownPayment
      this.loanTerm = edtBank.loanTerm
    }

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
    this.loading = false
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        let payload = {
          name: this.name,
          interestRate: this.interestRate,
          maxLoan: this.maxLoan,
          minDownPayment: this.minDownPayment,
          loanTerm: this.loanTerm,
          dateRec: new Date().toJSON(),
        }
        if (this.edtMode) {
          payload['id'] = this.$route.params.id
        }
        console.log(payload)
        await this.$store.dispatch(
          this.edtMode ? 'updateBank' : 'createBank',
          payload
        )

        this.$message(
          'Запись успешно ' + (this.edtMode ? 'обновлена' : 'создана')
        )
        console.log(this.$v)
        this.$v.$reset()
      } catch (error) {
        throw error
      }
    },
  },
}
</script>
