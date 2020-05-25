<template>
  <div id="full" class="gotop" ref="goTop" @click.stop="goTop()" v-show="returnTop">
    <a></a>
  </div>
</template>

<script>
export default {
  name: 'inde',
  data () {
    return {
      returnTop: false,
      interValTimer: null,
      isTop: true
    }
  },
  methods: {
    goTop () {
      let _this = this
      this.interValTimer = setInterval(function () {
        let scrolltop = document.getElementById('innerWrapper').scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-scrolltop / 6)
        _this.isTop = true
        if (ispeed === 0) {
          clearInterval(_this.interValTimer)
          _this.interValTimer = null
        }
        document.getElementById('innerWrapper').scrollTop = document.body.scrollTop = scrolltop + ispeed
      }, 30)
    },
    init () {
      let _this = this
      let clientHeight = document.body.clientHeight / 2 || document.getElementById('innerWrapper').clientHeight / 2
      document.getElementById('innerWrapper').addEventListener('scroll', function () {
        let scrolltop = document.getElementById('innerWrapper').scrollTop || document.body.scrollTop
        if (scrolltop > clientHeight) {
          _this.returnTop = true
        } else {
          _this.returnTop = false
        }
        if (!_this.isTop) {
          clearInterval(_this.interValTimer)
        }
        _this.isTop = false
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
/*返回顶部*/
.gotop {
  position: fixed;
  z-index: 30;
  text-align: center;
  cursor: pointer;
  right: 20px;
  bottom: 60px;
  background:rgba(0,0,0,0.5);
  border-radius: 50%;
  &:active,&:hover{
      background:rgba(0,0,0,0.7);
  }
}
.gotop a {
  width: 28px;
  height: 28px;
  display: block;
  background:  url('../../assets/img/top.svg') no-repeat center / 40%;
}
</style>
