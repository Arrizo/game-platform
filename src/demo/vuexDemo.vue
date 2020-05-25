<template>
  <div>{{ count }}
    <button @click="addADd()">加加加</button>{{this.$route.path}}
    {{doneTodos}}
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // count: this.$store.state.count
    }
  },
  computed: {
    ...mapState({
      count: state => state.user.count
    }),
    doneTodos () {
      return this.$store.getters['user/doneTodosCount']
    }
  },
  methods: {
    addADd () {
      console.log('this.$route.path:::', this.$route.path)
      this.$store.dispatch('increment', {name: this.$route.name})
    }
  },
  mounted () {
    // storeTest()
  }
}
</script>
<style lang="scss" scoped>

</style>
