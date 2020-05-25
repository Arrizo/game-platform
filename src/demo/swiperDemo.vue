<template>
  <div id="bannerSwiper" class="banner-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in bannerSwiperArr" :key="'banner'+index">
        <a :href="item.appLink"><img :src="item.slideshowImage"></a>
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import { getSlideList } from '@/services'
import imgSlide from '@/assets/img/1.jpg'

import 'swiper/dist/css/swiper.min.css'

export default {
  data () {
    return {
      bannerSwiperArr: [
        {
          src: imgSlide,
          href: '/game1',
          id: '1',
          name: 'DDTank1'
        }, {
          src: imgSlide,
          href: '/game2',
          id: '2',
          name: 'DDTank2'
        }, {
          src: imgSlide,
          href: '/game3',
          id: '3',
          name: 'DDTank3'
        }, {
          src: imgSlide,
          href: '/game4',
          id: '4',
          name: 'DDTank4'
        }
      ],
      bannerSwiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // loop: true,
        pagination: {
          el: '.swiper-pagination',
          element: 'li'
        },
        observer: true
      },
      bannerSwiper: null
    }
  },
  mounted () {
    this.setSlideList()
    this.bannerSwiper = this.createSwiper('#bannerSwiper'
      , {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          element: 'li'
        },
        observer: true
      })
  },
  methods: {
    createSwiper (name, options) {
      let swipe = new Swiper(name, options)
      return swipe
    },
    setSlideList () {
      const obj = {
        location: '0',
        pageSize: '9',
        page: '1'
      }
      const self = this
      getSlideList(obj).then(res => {
        // TODO: 优化动态变化swiper的元素，swiper API文档：http://www.swiper.com.cn/api/methods/257.html
        console.log('this.bannerSwiperArr::', this.bannerSwiperArr, ',this.bannerSwiper:::', self.bannerSwiper)
        self.$nextTick(function () {
          self.bannerSwiperArr = res.data.slideshowList
          self.bannerSwiper.update(true)
          console.log('this.bannerSwiperArr::', this.bannerSwiperArr, ',this.bannerSwiper.params:::', this.bannerSwiper.params)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/*头部 轮播图*/
.top-box {
  position: relative;
  width: 100%;
  .top-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    z-index: 0;
  }
  .banner-swiper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    opacity: 0.9;
    background: #ffffff;
  }
  .swiper-pagination-bullet-active {
    background: #1787dd;
  }
}
</style>
