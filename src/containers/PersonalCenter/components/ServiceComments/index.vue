<template>
  <div id="warp_service_box">
    <div class="player-box clearfix" v-if="convType===1">
      <h3>
        <span>{{this.getTime(convTime)}}</span>
      </h3>
      <div class="clearfix player-lf">
        <div class="player-header lf"><img :src="service" alt=""></div>
        <div class="wrap-servie-dialog clearfix">
        <div class="player-dialog lf">
          {{convContent}}
        </div>
        </div>
        <div class="warp-star lf">
          <div id="starBox" v-if="convRate===0">
            <img v-for="(value,index) in parseInt(detailRoteList[convContentId])" :key="'iconStarFill'+index" :src="bstar2" @click="selectStar(index+1,convContentId)"><img v-for="(value,index) in 5-parseInt(detailRoteList[convContentId])" :key="'iconStarHollow'+index" :src="bstar" @click="selectStar(parseInt(detailRoteList[convContentId])+index+1,convContentId)">
          </div>
          <!-- 已评过星 -->
          <div id="starBox" v-else>
            <img v-for="(value,index) in parseInt(detailRoteList[convContentId])" :key="'iconStarFill'+index" :src="bstar2"><img v-for="(value,index) in 5-parseInt(detailRoteList[convContentId])" :key="'iconStarHollow'+index" :src="bstar">
          </div>
        </div>
        <!-- 进行评星 -->

      </div>
      <div class="clearfix player-lf" v-for="(value,index) in attachment" :key="'imag'+index">
        <div class="player-header lf"><img :src="service" alt=""></div>
        <div class="player-img lf">
          <img :src="value.attachmentUrl" alt="">
        </div>
      </div>
    </div>

    <!--返回用户信息-->
    <div class="service-box clearfix" v-else-if="convType===0">
      <div v-if="convContent!==DEFAULT_TEXT">
        <h3>
          <span>{{getTime(convTime)}}</span>
        </h3>
        <div class="clearfix service-rg">
          <header-icon :userIcon="userObj.iconUrl" :userIconSize="'small'" />
          <div class="service-dialog rg triangle">
            {{convContent}}
          </div>
        </div>
      </div>
      <div class="clearfix service-rg" v-for="(value, index) in attachment" :key="'imag'+index">
        <div class="player-header rg"><img :src="userObj.iconUrl" alt=""></div>
        <div class="service-img rg">
          <img :src="value.attachmentUrl" alt="" @click="PreviewImage($event)">
        </div>
      </div>
    </div>
    <!-- 图片预览功能 -->
    <ghw-image-preview :isShowImage="isShowImage" :imgUrl="imgUrl" @restoreImage="restoreImage" />
  </div>
</template>
<script>
/**
 * @desc 用户追加评论和评星功能
 * @author chenzechao
 * @date 2018.5.28
 * @param {Number} convType -显示用户还是客服模块
 * @param {Number} convTime-显示时间
 * @param {String} convContent-评论内容
 * @param {Number} convRate-显示是否评论过
 * @param {Object} detailRoteList-评论星的数量
 * @param {Array} attachment-客服返回的图片
 * @param {Number} convUserIconUrl-返回用户头像
 * @param {Number} convContentId-每条信息的id
 * @example 调用实例 <service-comments :convType='item.convType' :convTime="item.convTime" :convContent="item.convContent" :convRate="item.convRate" :convUserIconUrl="item.convUserIconUrl" :attachment="item.attachment" :detailRoteList="detailRoteList" :convContentId="item.convContentId" @getstar="getComment"></service-comments>
 */
import service from '@/assets/img/service.png'
import bstar from '@/assets/img/star2.svg'
import bstar2 from '@/assets/img/star1.svg'
import HeaderIcon from '@/containers/PersonalCenter/components/PersonalHeader/components/HeaderIcon'
import { mapState } from 'vuex'
import GhwImagePreview from '@/components/GhwImagePreview'
export default {
  name: 'Comments',
  props: {
    convType: {
      type: Number,
      default: 0
    },
    convTime: {
      type: String,
      default: ''
    },
    convContent: {
      type: String,
      default: ''
    },
    convRate: {
      type: Number,
      default: 0
    },
    detailRoteList: {
      type: Object,
      default () {
        return {}
      }
    },
    attachment: {
      type: Array,
      default () {
        return ['url']
      }
    },
    convUserIconUrl: {
      type: String,
      default: ''
    },
    convContentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      bstar,
      bstar2,
      service,
      isShowImage: false,
      imgUrl: '',
      DEFAULT_TEXT: 'fbcdde0a177a1111' // 'SERVICE_DIALOG_DEFAULT_TEXT'
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj
    })
  },
  components: {
    HeaderIcon,
    GhwImagePreview
  },
  methods: {
    getTime (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD HH:mm')
    },
    // 选择星星数量
    selectStar (startNum, index) {
      this.detailRoteList[index] = startNum
      this.$forceUpdate()
      this.$emit('getstar', this.detailRoteList)
    },
    PreviewImage (e) {
      this.isShowImage = true
      this.imgUrl = e.target.src
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      document.getElementsByClassName('inner-wrapper')[0].style.overflow = 'hidden '
      // document.getElementById('innerWrapper').style.overflow = 'hidden !important'
      // this.$store.dispatch('showFooter', false)
    },
    restoreImage () {
      this.isShowImage = false
      document.getElementsByClassName('inner-wrapper')[0].style.overflow = 'auto'
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      // this.$store.dispatch('showFooter', true)
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
  },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }

}
</script>
<style lang="scss" scoped>
.player-box {
  margin-top: 8px;
  width: 100%;
  color: #6c6c6d;
}
.player-lf {
  padding-left: 11.5px;
}
#service_mask {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.player-box h3,
.service-box h3 {
  display: block;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 9px;
  padding: 15px 0px 10px 0px;
  span {
    display: inline-block;
    background: #cecece;
    border-radius: 5px;
    padding: 4px 10px;
    font-family: 'Microsoft YaHei';
  }
}

.player-header {
  margin-top: 8px;
  width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}
.player-header img {
  width: 100%;
}
.service-box .player-header {
  margin-left: 8px;
}
.lf {
  float: left;
}
.rg {
  float: right;
}
.player-dialog,
.service-dialog {
  position: relative;
  margin-left: 8px;
  color: #fff;
  margin-top: 8px;
  max-width: 69%;
  padding: 8px 8px;
  min-height: 35px;
  line-height: 19.5px;
  font-size: 13px;
  word-wrap: break-word;
  word-break: normal;
  font-family: 'Microsoft YaHei';
  background-color: #1787dd;
  border-radius: 10px;
}
.warp-star {
  position: relative;
  border-radius: 10px;
  height: 35px;
  padding: 0px 10px;
  margin-top: 12px;
  line-height: 35px;
  margin-left: 40px;
  background: #fff;
}
.service-dialog::after {
  content: '';
  position: absolute;
  top: 13px;
  right: -4px;
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #1787dd;
}
.player-dialog::after,
.warp-star::after {
  content: '';
  position: absolute;
  top: 13px;
  left: -4px;
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid#fff;
}
.wrap-servie-dialog{
  width: 100%;
}
.player-dialog {
  background: #fff;
  color: #4c4c4c;
  border: 1px solid #eee;
}
#starBox {
  margin-top: 8px;
}
#starBox img {
  display: inline-block;
  width: 20px;
  height: 18px;
  margin-left: 2px;
}
.player-img {
  position: relative;
  width: 60%;
  margin-top: 10px;
  margin-left: 8px;
}
.player-img img {
  width: 70%;
}
.service-box {
  width: 100%;
  color: #ffffff;
}
.service-rg {
  padding-right: 11.5px;
}

.service-img {
  position: relative;
  width: 60%;
  margin-top: 10px;
}
.service-img img {
  width: 50%;
  margin-left: 50%;
}
.player-dialog:before {
  position: absolute;
  top: 5px;
  left: -4px;
  content: '';
  width: 0;
  height: 0;
  border-right: 5px solid #f5f5f5;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .warp-star {
    margin-left: 13px;
  }
}
</style>
