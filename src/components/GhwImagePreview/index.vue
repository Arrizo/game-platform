<template>
  <div id="service_mask" v-show="isShowImage" @click="$emit('restoreImage')">
    <div class="wrap-img">
      <img ref="scaleImg" :src="imgUrl" alt="" id="previewImg" :class="{'full-image':fullImagePreview}" class="scaleImg">
    </div>
  </div>
</template>
<script>
/**
 * @desc 用于图片预览功能
 * @author chenzechao
 * @date 2018.6.5
 * @param {Boolean} isShowImage -是否显示预览效果
 * @param {String} imgUrl-预览的图片路径
 * @example 调用实例 <ghw-image-preview :isShowImage="isShowImage" :imgUrl="imgUrl" @restoreImage="restoreImage"/>
  */
export default {
  name: 'GhwImagePreview',
  props: {
    isShowImage: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    },
    fullImagePreview: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mySwiper: null
    }
  },
  // watch: {
  //   isShowImage () {
  //     if (!this.isShowImage) {
  //       this.$refs.scaleImg.offsetWidth = this.imgW
  //       this.$refs.scaleImg.offsetHeight = this.imgH
  //     }
  //   }
  // },
  methods: {

    sliderImage ($event) {
      let img = document.getElementById('previewImg')
      let startX, endX, scaleX
      // $event.preventDefault()
      img.addEventListener('touchstart', function (e) {
        // e.preventDefault()
        // 触发的点数目
        if (e.touches.length > 1) {
          startX = Math.abs(e.touches[1].clientX - e.touches[0].clientX)
        }
      }, false)

      img.addEventListener('touchmove', function (e) {
        // e.preventDefault()
        let imgWidth = img.offsetWidth
        if (e.touches.length > 1) {
          endX = Math.abs(e.touches[1].clientX - e.touches[0].clientX)
          scaleX = endX - startX
          img.style.width = (imgWidth + scaleX) + 'px'
        }
      }, false)
      img.addEventListener('touchend', function (e) {
        // img.style.width = 'auto'
        // e.preventDefault()
      }, false)
    }
  },
  mounted: function () {

  },
  beforeUpdate: function () {
    this.sliderImage()
  },
  updated: function () {
    this.sliderImage()
  }
}
</script>

<style lang="scss" scoped>
#service_mask {
  position: fixed;
  z-index: 900;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.wrap-img {
  position: relative;
  width: 70%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scaleImg {
  width: auto;
  min-width: 100px;
  max-width: 100%;
}
.full-image{
  min-width: 100%
}
</style>
