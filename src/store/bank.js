import firebase from 'firebase/app'

export default {
  actions: {
    async createBank({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        //console.log(record)
        return await firebase
          .database()
          .ref(`/users/${uid}/banks`)
          .push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async updateBank(
      { commit, dispatch },
      { id, name, interestRate, maxLoan, minDownPayment, loanTerm }
    ) {
      console.log('updateBank')
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/banks`)
          .child(id)
          .update({ name, interestRate, maxLoan, minDownPayment, loanTerm })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchBanks({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/banks`)
              .once('value')
          ).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchBankById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/banks`)
              .child(id)
              .once('value')
          ).val() || {}
        return { ...record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteBankById({ dispatch, commit }, id) {
      try {
        console.log('jjj')
        const uid = await dispatch('getUid')

        await firebase
          .database()
          .ref(`/users/${uid}/banks`)
          .child(id)
          .remove()

        return 'ok'
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
