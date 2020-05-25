<template>
  <div>
    <div class="gameLoadedIcon">
      <img :src="gameLoaded">
    </div>
  </div>
</template>

<script>
import gameLoaded from '@/assets/img/game-start-page.png'
import gameStart from '@/utils/gameStart'
import * as constVar from '@/config/const'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  extends: {
  },
  props: {
  },
  data () {
    return {
      gameLoaded
    }
  },
  computed: {
    ...mapState({
      appId: state => state.user.appId,
      isLogin: state => state.user.isLogin,
      reLoginWatch: state => state.user.reLoginWatch
    })
  },
  components: {
  },
  watch: {
    reLoginWatch: {
      handler (val) {
        if (!val) {
          gameStart(this.isLogin, this.$route.query.appId, '', '', this, constVar.COME_FROM_OUTER)
        }
      },
      immediate: true
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
.gameLoadedIcon {
  height: 100%;
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0px;
  top: 0px;
  background: #cfeeff;
}
.gameLoadedIcon img:first-child {
  height: 100%;
}
</style>
