import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    couter: 100
  }),
  getters: {
    doubleCount: (state) => state.couter * 2
  },
  actions: {
    changeCouterAction(newCounter: any) {
      this.couter = newCounter
    }
  }
})

export default useCounterStore
