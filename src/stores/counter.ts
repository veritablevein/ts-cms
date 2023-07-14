import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCount: state => state.counter * 2
  },
  actions: {
    changeCounterAction(newCounter: any) {
      this.counter = newCounter
    }
  }
})

export default useCounterStore
