<!--  -->
<template>
  <div>
    <a @click='share2FB()'>fb</a>
    <a @click='share2FBM()'>fbm</a>
    <a @click='share2TW()'>tw</a>
    <a @click='share2GP()'>g+</a>
    <a @click='share2LI()'>LinkedIn</a>
  </div>
</template>

<script>
import GHWShare from '@/utils/ShareUtils'
export default {
  name: 'template',
  extends: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  watch: {
  },
  methods: {
    share2FB () {
      console.log('share2FB')
      GHWShare('FB', 'https://zhupinghuang.github.io/index.html')
    },
    share2FBM () {
      console.log('share2FBM', 'https://zhupinghuang.github.io/index.html')
      GHWShare('FBM', 'https://zhupinghuang.github.io/index.html')
    },
    share2TW () {
      console.log('share2TW', 'https://zhupinghuang.github.io/index.html')
      GHWShare('TW', 'https://zhupinghuang.github.io/index.html')
    },
    share2GP () {
      console.log('share2GP', 'https://zhupinghuang.github.io/index.html')
      GHWShare('GGP', 'https://zhupinghuang.github.io/index.html')
    },
    share2LI () {
      console.log('share2LI', 'https://zhupinghuang.github.io/index.html')
      GHWShare('LI', 'https://zhupinghuang.github.io/index.html')
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}

</script>
<style lang='scss' scoped>
</style>
