<template>
  <div>
    <div class="service-add-box">
      <!-- 游戏名查询 -->
      <ghw-field :typeInput="'text'" v-model="serverAddArr.gameName" ref="search_name" :inputTitle="$t('message.me.addTicket.game')" :placeholder="$t('message.public.inputAppName')" @openPicker="popTop($event)" @searchGame="searchGame()" @hiddenGameList="searchGame('defaultDate')" @hiddenList="hiddenList()" class="search-game" :isMustField="true" id="game_Name" :isEditInput="!isShowAppName">
      </ghw-field>
      <div class="search-list" v-if="isGame">
        <div class="search-data" v-for="(item, index) in appSearchList" :key="'list'+index" @click="selectValue(item.appName,item.appId)">{{item.appName}}</div>
      </div>
      <!-- </div> -->
      <!-- 服务器查询 -->
      <!-- <ghw-field :typeInput="'text'" v-model="serverAddArr.serverName" ref="search_server" :inputTitle="$t('message.me.addTicket.server')" :placeholder="$t('message.me.addTicket.server')" @openPicker="popTop($event)">
        </ghw-field> -->
      <!-- 角色名查询 -->
      <ghw-field :typeInput="'text'" v-model="serverAddArr.characterName" ref="character_name" :inputTitle="$t('message.me.addTicket.name')" :placeholder="$t('message.me.addTicket.characterName')" @openPicker="popTop($event)" :isMustField="true" id="character_name">
      </ghw-field>
      <!-- 问题类别 -->
      <ghw-field :typeInput="'text'" v-model="serverAddArr.problemCategory" ref="search_problem" readonly :inputTitle="$t('message.me.addTicket.problemCategory')" :placeholder="$t('message.me.addTicket.problemCategory')" @openPicker="open('picker2',$event)" :isMustField="true" id="search_problem">
      </ghw-field>
      <template-picker ref="picker2" :dataDict="tikeTypeList" @confirm="confirmIndustry" :isRequested="requestComplete" :transDate="'ticketTypeName'" @cancel="cancelPicker"></template-picker>
      <!-- 问题描述 -->
      <!-- 日期时间 -->
      <ghw-field :typeInput="'text'" v-model="serverAddArr.problemDate" ref="search_date" readonly :inputTitle="$t('message.me.addTicket.problemDate')" @openPicker="open('picker1')" :isMustField="true" id="search_date">
      </ghw-field>
      <mt-datetime-picker ref="picker1" type="date" v-model="birthValue" @confirm="confirmBirthdate" :startDate="startDate" :endDate="endDate" :cancelText="$t('message.public.cancel')" :confirmText="$t('message.public.confirm')" @cancel="cancelPicker">
      </mt-datetime-picker>
      <!-- </div> -->
      <!-- 问题描述和添加图片 -->
      <query-content @confirm='getImages' :textarea="$t('message.me.addTicket.problemDesc')" @popTop="popTop($event)" :restImage="restImage"></query-content>
      <!--邮箱-->
      <ghw-field :typeInput="'email'" v-model="serverAddArr.email" ref="email" :inputTitle="$t('message.me.addTicket.email')" @openPicker="popTop($event)" :placeholder="$t('message.me.profile.email')" :isMustField="true" id="search_email">
      </ghw-field>
      <!--提交-->
      <div class="service-btn">
        <!-- <div class="service-reset" @click="restFormDate">
          <input type="button" />
          <span>{{$t('message.public.reset')}}</span>
        </div> -->

        <ghw-btn :inputType="'button'" :inputValue="$t('message.public.reset')" :size="'rectangular'" :type="'cancel'" @triggerEvent="restFormDate" />
        <ghw-btn :inputType="'button'" :size="'rectangular'" :type="'public'" :inputValue="$t('message.public.submit')" @triggerEvent="submitFormDate" class="service-submit" :isHasSpinner="true" :isShowSpinner="isShowSpinner" />
        <!-- <div class="service-cancel" @click="returnFormDate">
          <input type="button" />
          <span>{{$t('message.public.cancel')}}</span>
        </div> -->
        <!--消除浮动-->
        <!-- <div class="clear"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { Toast } from 'mint-ui'
import { getGameNameList, getTikeTypeList, addMessage } from '@/services'
import { mapState } from 'vuex'
import TemplatePicker from '@/containers/PersonalCenter/components/TemplatePicker'
import QueryContent from '@/containers/PersonalCenter/components/QueryContent'
import GhwBtn from '@/components/GhwBtn'
import GhwField from '@/components/GhwField'

const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'ServiceAdd',
  extends: {},
  props: {
    isShowAppName: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      url: '',
      isShowSpinner: false,
      serverAddArr: {
        gameName: '',
        appId: '',
        characterName: '',
        email: '',
        images: [],
        serverName: 'ALL_SERVERS',
        problemCategory: '',
        problemDate: this.getNowTime(this.endDate),
        problemDesc: '',
        ticketTypeId: ''
      },
      page: 1,
      pageSize: 10,
      // keyWord: '',
      isGame: false,
      isQueryList: false,
      appSearchList: [],
      tikeTypeList: [],
      startDate: new Date('2013-01-01'),
      endDate: new Date('2023-12-30'),
      birthValue: new Date(),
      requestComplete: false,
      restImage: true
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj,
      appName: state => state.user.appName,
      appId: state => state.user.appId
    })
  },
  components: {
    TemplatePicker,
    QueryContent,
    GhwBtn,
    GhwField
  },
  watch: {
  },
  methods: {
    getImages (image, content) {
      this.images = image
      this.serverAddArr.problemDesc = content
    },
    // 失去焦点时隐藏列表
    hiddenList () {
      delay(() => {
        this.isGame = false
      }, 200)
    },
    cancelPicker () {
      this.$store.dispatch('showFooter', true)
    },
    // 验证数据为必填
    submitFormDate: function () {
      if (!this.serverAddArr.gameName) {
        console.log('this.serverAddArr.gameName', this.serverAddArr.gameName)
        this.$emit('warnHandler', this.$t('message.public.inputAppName'))
        this.showWarnPop('game_Name')
        return false
      }
      // if (!this.serverAddArr.serverName) {
      //   Toast({ message: this.$t('message.me.addTicket.serverNotEmpty'), position: 'middle' })
      //   return false
      // }
      // this.submit()
      if (!this.serverAddArr.characterName) {
        this.$emit('warnHandler', this.$t('message.me.addTicket.characterNameNotEmpty'))
        this.showWarnPop('character_name')
        return false
      }
      if (!this.serverAddArr.problemCategory) {
        this.$emit('warnHandler', this.$t('message.me.addTicket.selProblemType'))
        this.showWarnPop('search_problem')
        return false
      }
      if (!this.serverAddArr.problemDate) {
        this.$emit('warnHandler', this.$t('message.me.addTicket.problemDate'))
        this.showWarnPop('search_date')
        return false
      }
      if (!this.serverAddArr.problemDesc) {
        this.$emit('warnHandler', this.$t('message.me.addTicket.fillInProblemDesc'))
        this.showWarnPop('search_textare', true)
        return false
      }
      var reg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!this.serverAddArr.email || !reg.test(this.serverAddArr.email)) {
        this.$emit('warnHandler', this.$t('message.me.profile.mailFormatInvalid'))
        this.showWarnPop('search_email')
        return false
      }
      if (!this.serverAddArr.appId || this.serverAddArr.appId === '') {
        this.$emit('warnHandler', this.$t('message.public.inputAppName'))
        this.showWarnPop('game_Name')
        return false
      }
      this.isShowSpinner = true
      this.setAddMessage()
      this.restFormDate()
    },
    returnFormDate: function () {
      this.$emit('jumpMessage', 'selecte1')
    },
    // 数据重置
    restFormDate: function () {
      this.serverAddArr = { problemDate: this.getNowTime(new Date()), problemCategory: '', serverName: 'ALL_SERVERS' }
      this.birthValue = new Date()
      this.images = []
      this.restImage = !this.restImage
      this.serverAddArr.email = this.userObj.email
    },
    setTikeTypeList () {
      let obj = {
        userToken: this.userObj.h5Token,
        page: this.page,
        pageSize: this.pageSize
      }
      // 获取问题类别
      getTikeTypeList(obj).then(res => {
        this.requestComplete = true
        if (res.data) {
          this.tikeTypeList = res.data.ticketTypeList
        }
      })
    },
    open (picker) {
      this.$refs[picker].open()
      this.$store.dispatch('showFooter', false)
      let _this = this
      setTimeout(function () {
        document.getElementsByClassName('v-modal')[0].addEventListener('click', function () {
          _this.$store.dispatch('showFooter', true)
        })
      }, 500)
    },
    popTop (event, flag) {
      let pop = flag ? event.offsetTop : event.target.parentElement.offsetTop
      let Safari = navigator.userAgent.toLowerCase()
      let titleHeight = document.getElementById('title_height').scrollHeight
      let serviceBookBox = document.getElementById('service-book-box').scrollHeight
      if ((Safari.indexOf('safari') > 0 && (Safari.indexOf('iphone') > 0 || Safari.indexOf('ipad') > 0 || Safari.indexOf('windows nt') > 0)) && !flag) {
      } else {
        document.getElementById('innerWrapper').scrollTop = document.body.scrollTop = (pop - titleHeight - serviceBookBox)
        try {
          document.getElementById('service_scroll').scrollTop = pop - serviceBookBox
        } catch (e) { }
      }
    },
    // 搜索游戏
    searchGame (data) {
      this.fetchData(data)
    },
    // 选择游戏名字 Safari.indexOf('windows nt') > 0
    selectValue: function (appgame, appid) {
      this.serverAddArr.gameName = appgame
      this.serverAddArr.appId = appid
      this.isGame = false
    },
    // 选择问题类型
    selectProblem: function (problemCategory, ticketTypeId) {
      this.serverAddArr.problemCategory = problemCategory
      this.serverAddArr.ticketTypeId = ticketTypeId
      this.isQueryList = false
    },
    fetchData (data) {
      var word = this.$refs.search_name.value
      let obj = {}
      console.log(data)
      if (word === '') {
        obj = {
          userToken: this.userObj.h5Token,
          page: this.page,
          pageSize: this.pageSize,
          v: new Date().getTime()
        }
      } else {
        obj = {
          userToken: this.userObj.h5Token,
          page: this.page,
          pageSize: this.pageSize,
          appName: word,
          v: new Date().getTime()
        }
      }
      // word = word.replace(/'/g, '') // 去除单引号
      // this.keyWord = word
      this.isGame = true
      getGameNameList(obj).then(res => {
        if (res.data) {
          // 没有数据时或没更多数据时隐藏load按钮
          this.appSearchList = res.data.appList
        }
        // 判断如果是输入的值与列表有匹配，进行id赋值
        let dataList = res.data.appList
        for (let i = 0; i < dataList.length; i++) {
          if (word === dataList[i].appName) {
            this.serverAddArr.appId = dataList[i].appId
          }
        }
      }, error => {
        console.log(error)
      })
    },
    setAddMessage () {
      let obj = {
        userToken: this.userObj.h5Token,
        appId: this.serverAddArr.appId,
        serverName: this.serverAddArr.serverName,
        roleName: this.serverAddArr.characterName,
        ticketTypeId: this.serverAddArr.ticketTypeId,
        occurTime: new Date(this.serverAddArr.problemDate).getTime(),
        queryContent: this.serverAddArr.problemDesc,
        attachments: JSON.stringify(this.images),
        email: this.serverAddArr.email
      }
      addMessage(obj).then(res => {
        if (res.code === 200) {
          this.isShowSpinner = false
          this.$emit('jumpMessage', 'selecte1')
        }
      })
    },
    confirmBirthdate: function (value) {
      this.serverAddArr.problemDate = this.$moment(new Date(value)).format('YYYY-MM-DD')
      this.$store.dispatch('showFooter', true)
    },
    // 获取当前时间格式
    getNowTime (time) {
      return this.$moment(time).format('YYYY-MM-DD')
    },
    confirmIndustry: function (data) {
      this.serverAddArr.problemCategory = data.ticketTypeName
      this.serverAddArr.ticketTypeId = data.ticketTypeId
      this.$store.dispatch('showFooter', true)
    },
    // 必填输入框的提示
    showWarnPop (idValue) {
      let arrId = document.getElementById(idValue)
      arrId.style.borderBottom = '1px solid #FF4542'
      this.popTop(arrId, true)
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
    // 如果是浮标的客服，则显示当前游戏名并禁止点击
    if (this.isShowAppName) {
      this.serverAddArr.gameName = this.appName
      this.serverAddArr.appId = this.appId
    }
    this.setTikeTypeList()
    this.serverAddArr.email = this.userObj.email
    window.onresize = () => {
      return (() => {
        // document.documentElement.clientHeight = document.body.clientHeight
        // document.getElementById('innerWrapper').style.height = document.body.clientHeight + 'px'
      })()
    }
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
.service-add-box {
  margin: 0 auto;
  // min-height: 100px;
  padding-bottom: 20px;
  background: #fff;
}
.search-game {
  position: static;
}
.search-list {
  text-align: right;
  font-size: 13px;
  width: 90%;
  background: #fafafa;
  z-index: 50;
  border-radius: 5px;
  position: absolute;
  right: 0px;
  box-shadow: 1px 5px 5px #888888;
  .search-data {
    height: 26px;
    line-height: 26px;
    padding-right: 12px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    cursor: default;
  }
}
// .service-cancel {
//   background: url('../../../../assets/img/cancel_msg.svg') center top/70% no-repeat;
// }
// .service-cancel,
// .service-reset {
//   width: 25px;
//   height: 25px;
// }
// .service-cancel span,
// .service-reset span {
//   font-size: 9px;
//   font-family: 'Microsoft YaHei';
//   color: #1787dd;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .service-cancel input,
// .service-reset input {
//   display: block;
//   height: 20px;
//   width: 20px;
//   background: transparent;
// }
// .service-reset {
//   background: url('../../../../assets/img/reset_msg.svg') center top/70% no-repeat;
// }
// .service-submit,
// .service-reset {
//   margin-right: 12.5%;
// }
.service-btn {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  // padding: 0 50px;
}
</style>
<style>
.mint-datetime-confirm {
  text-align: right !important;
  padding-right: 10px !important;
}
.mint-datetime-cancel {
  text-align: left !important;
  padding-left: 13px !important;
  color: #999999 !important;
}
</style>
