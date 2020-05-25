<template>
  <div>
    <div class="warp">
      <!--内容区域-->
      <div class="main">
        <!--头像-->
        <ghw-header-title :headerContent="$t('message.me.bingAcct')" @goBack="goBack" :isShowWarn="true" :warnContent="warnContent" :isChangeContent='isChangeContent' @hanlderMessage='hanlderMessage' :showEditSave='showEditSave' :EditText="EditText" :iconStyle="iconString"></ghw-header-title>
        <div class="headsBox clearfix">
          <div class="heads heads-center">
            <header-icon :hasLoadingIcon='false' :userIcon="userObj.iconUrl" :uploading="uploading" :userIconSize="'small'" />
          </div>
          <form id="imgform" class="file">
            <ghw-btn :inputType="'file'" @changeImage="changeImage($event)" :disabled="uploading" :accept="'image/*'" />
          </form>
          <header-message :MessageType="'default'" :userName="userObj.nickname" :userId="userObj.userId" />
        </div>
        <div class="bind-infoBox bind-borderBt">
          <!-- 输入昵称 -->
          <ghw-field :typeInput="'text'" :isEditInput="isEdit" v-model="account.nickname" :inputTitle="$t('message.me.profile.nickname')" :placeholder="$t('message.me.profile.clickEdit')" @searchGame="getContentLength(account.nickname,22)" :isMustField="true" id="account_name">
          </ghw-field>
          <!-- 选择性别 -->
          <ghw-field :typeInput="'text'" :isEditInput="isEdit" v-model="genderValue" :readonly="true" :inputTitle="$t('message.me.profile.gender')" @openPicker="open('picker3')" :placeholder="$t('message.me.profile.clickEdit')">
          </ghw-field>
          <template-picker ref="picker3" :dataDict="account.gender.dataDict" @confirm="confirmGender" :isRequested="requestComplete" :defaultIndex='genderIndex' :transDate="'value'" @cancel="cancelPicker">
          </template-picker>
          <!-- 选择生日 -->
          <ghw-field :typeInput="'text'" :isEditInput="isEdit" v-model="account.birthdate" :inputTitle="$t('message.me.profile.birthdate')" @openPicker="open('picker1')" :readonly="true" :placeholder="$t('message.me.profile.clickEdit')">
          </ghw-field>
          <mt-datetime-picker ref="picker1" type="date" v-model="birthValue" @confirm="confirmBirthdate" :startDate="startDate" :endDate="endDate" :disabled="!isEdit" :cancelText="$t('message.public.cancel')" :confirmText="$t('message.public.confirm')" @cancel="cancelPicker">
          </mt-datetime-picker>
          <!-- 输入邮箱 -->
          <ghw-field :typeInput="'text'" :isEditInput="isEdit" v-model="account.email" :inputTitle="$t('message.me.profile.email')" :placeholder="$t('message.me.profile.clickEdit')" id="account_email">
          </ghw-field>
          <!-- 输入手机 -->
          <!-- <ghw-field :typeInput="'tel'" :isEditInput="isEdit" v-model="account.mobile" :inputTitle="$t('message.me.profile.phoneNum')" :placeholder="$t('message.me.profile.clickEdit')" :maxlength="22" @searchGame="account.mobile=account.mobile.replace(/[^(\d\+\-\(\))$]/g,'')"> -->
          <ghw-field :typeInput="'tel'" :isEditInput="isEdit" v-model="account.mobile" :inputTitle="$t('message.me.profile.phoneNum')" :placeholder="$t('message.me.profile.clickEdit')" :maxlength="22" id="account_mobile">
          </ghw-field>
          <!-- 职业选择  -->
          <ghw-field :typeInput="'text'" :isEditInput="isEdit" v-model="industryValue" :inputTitle="$t('message.me.profile.industry')" @openPicker="open('picker2')" :readonly="true" :placeholder="$t('message.me.profile.clickEdit')">
          </ghw-field>

          <template-picker ref="picker2" :dataDict="account.industry.dataDict" @confirm="confirmIndustry" :isRequested="requestComplete" :defaultIndex='industryIndex' :transDate="'value'" @cancel="cancelPicker">
          </template-picker>

          <!-- <div class="bootomBox clearfix">
            <ghw-btn :inputType="'button'" :inputValue="$t('message.public.edit')" :size="'rectangular'" :type="'public'" @triggerEvent='hanlderMessage' v-if="!isEdit" />
            <ghw-btn :inputType="'button'" :inputValue="$t('message.public.cancel')" :size="'rectangular'" :type="'cancel'" @triggerEvent="goBack" v-if="isEdit" class="heads-rg cancel-position" :isShowSpinner="isShowSpinner" />
            <ghw-btn :inputType="'button'" :inputValue="$t('message.public.save')" :size="'rectangular'" :type="'public'" @triggerEvent="hanlderMessage" v-if="isEdit" class="heads-rg" :isHasSpinner="true" :isShowSpinner='isShowSpinner' />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import { getAccount, editAccount, uploadImg } from '@/services'
import Exif from 'exif-js'
import TemplatePicker from '@/containers/PersonalCenter/components/TemplatePicker'
import GhwField from '@/components/GhwField'
import * as constVar from '@/config/const'
import * as postMessageEvent from '@/config/postMessageEvent'
import GhwBtn from '@/components/GhwBtn'
import HeaderMessage from '@/containers/PersonalCenter/components/PersonalHeader/components/HeaderMessage'
import HeaderIcon from '@/containers/PersonalCenter/components/PersonalHeader/components/HeaderIcon'
import StoreUtil from '@/utils/StoreUtil'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import GhwToast from '@/components/GhwToast/index.js'
export default {
  name: 'BindAccount',
  extends: {},
  props: {},
  data () {
    return {
      checkedValue: '',
      isEdit: false,
      startDate: new Date('1900/1/1'),
      endDate: new Date(),
      industryValue: null,
      genderValue: null,
      EditText: this.$t('message.public.edit'),
      isChangeContent: false,
      warnContent: '',
      iconString: '',
      isShowSpinner: false,
      showEditSave: true,
      account: {
        gender: { selectedKey: null, dataDict: [] },
        birthdate: null,
        email: '',
        mobile: '',
        industry: { selectedKey: null, dataDict: [] }
      },
      birthValue: null,
      popupVisible: false,
      currentIndustry: null,
      dataDictIndus: [],
      industrySlots: [{
        flex: 1,
        className: 'slot1',
        textAlign: 'center'
      }],
      requestComplete: false,
      uploading: false,
      oldAccount: {},
      industryIndex: 0,
      genderIndex: 0,
      headerImage: '',
      picValue: '',
      isShowInput: true,
      oldIndustryIndex: 0
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj,
      userId: state => state.user.userObj.userId,
      showFooterFlag: state => state.home.showFooterFlag,
      userToken: state => state.user.userObj.h5Token
    })
  },
  components: {
    TemplatePicker,
    GhwField,
    GhwBtn,
    HeaderMessage,
    HeaderIcon,
    GhwHeaderTitle
  },
  watch: {
    userId: function (newvalue, oldvalue) {
      this.initAccountMsg()
    }
  },
  methods: {
    getGender (key) {
      let gander = 0
      if (key === '0') {
        gander = 1
      } else {
        gander = 0
      }
      return gander
    },
    changeSelectedKey (data) {
      this.account.gender.selectedKey = data.key
    },
    // 打开时间行业选择器
    open (picker) {
      if (this.isEdit) {
        this.$refs[picker].open()
        let _this = this
        setTimeout(function () {
          document.getElementsByClassName('v-modal')[0].addEventListener('click', function () {
            _this.$store.dispatch('showFooter', true)
          })
        }, 500)
        this.$store.dispatch('showFooter', false)
      }
    },
    confirmGender (val) {
      this.genderValue = val.value
      this.account.gender.selectedKey = val.key
      this.$store.dispatch('showFooter', true)
    },
    confirmIndustry (value) {
      this.industryValue = value.value
      this.account.selectedKey = value.key
      this.$store.dispatch('showFooter', true)
    },
    confirmBirthdate (value) {
      this.account.birthdate = this.$moment(new Date(value)).format('YYYY-MM-DD')
      this.$store.dispatch('showFooter', true)
    },
    // 上传个人头像图片附件
    changeImage (e) {
      this.uploading = true
      let files = e.target.files || e.dataTransfer.files
      var imgform = document.getElementById('imgform')
      if (!files.length) return
      this.picValue = files[0]
      if (this.picValue > 1024 * 1024 * 5) {
        Toast({ message: this.$t('message.me.profile.picExceed5M'), position: 'bottom' })
        imgform.reset()
        return
      }
      this.imgPreview(this.picValue)
    },
    goBack () {
      if (this.EditText === this.$t('message.public.save')) {
        this.cancleAccountMsg()
        this.goBackHandler()
      } else {
        this.$router.push({ name: 'PersonalCenter' })
      }
    },
    goBackHandler () {
      this.iconString = ''
      this.EditText = this.$t('message.public.edit')
    },
    postImg () {
      var imgform = document.getElementById('imgform')
      let formdata = new FormData()
      formdata.append('attachData', this.convertBase64UrlToBlob(this.headerImage))
      formdata.append('userId', this.userId)
      formdata.append('userToken', this.userToken)
      formdata.append('v', new Date().getTime())
      formdata.append('locale', (navigator.language || navigator.userLanguage).toString().replace(/-/, '_'))
      if (this.userId != null && this.userToken != null) {
        uploadImg(formdata).then(res => {
          if (res.data) {
            this.updateImage(res.data.attachUrl)
            this.account.iconUrl = res.data.attachUrl
          }
        }, error => {
          console.log(error)
        })
      }
      imgform.reset()
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result
            self.postImg()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.headerImage = data
              self.postImg()
            }
          }
        }
      }
    },
    convertBase64UrlToBlob (urlData) {
      // 去掉url的头，并转换为byte
      var bytes = window.atob(urlData.split(',')[1])
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/png' })
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0
      const maxStep = 3
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        // 计算要分成多少块瓦片
        count = ~~(Math.sqrt(count) + 1)
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    },
    // 上传附件后修改头像
    updateImage (iconUrl) {
      var obj = {
        userId: this.userId,
        userToken: this.userToken,
        iconUrl: iconUrl
      }
      editAccount(obj).then(res => {
        if (res.code === 200) {
          this.uploading = false

          // Updated by Zping on 20180611
          // 尝试写session，无痕模式不支持的情况下写cookie
          StoreUtil.getInstance().setItemToSSCookie(constVar.SESSION_ICON_URL, iconUrl)
          // End

          var userObj = JSON.parse(JSON.stringify(this.userObj))
          userObj.iconUrl = iconUrl
          this.$store.dispatch('updateUserInfo', { userObj: userObj })
          if (top.location !== self.location) {
            // 判断到是处于iframe中，向父窗口发消息
            top.postMessage(JSON.stringify({
              cmd: postMessageEvent.MY_ACCOUNT,
              data: {
                iconUrl: iconUrl
              }
            }), '*')
          }
        }
      }, error => {
        console.log(error)
      })
    },
    // 获取个人资料信息
    initAccountMsg () {
      console.log('0-0-0-0-0-0-', this.userToken)
      var obj = {}
      if (this.userId != null && this.userToken != null) {
        obj = {
          userId: this.userId,
          userToken: this.userToken
        }
        console.log(333333)
      } else {
        return false
      }
      getAccount(obj).then(res => {
        if (res.data) {
          this.oldAccount = JSON.parse(JSON.stringify(res.data))
          this.account = res.data
          this.requestComplete = true
          if (res.data.birthdate) {
            this.birthValue = res.data.birthdate
          } else {
            this.birthValue = '2000-01-01'
          }
          var industry = this.account.industry.dataDict
          var selectedKeyIndus = res.data.industry.selectedKey
          for (var i = 0; i < industry.length; i++) {
            if (selectedKeyIndus === industry[i].key) {
              this.industryIndex = i
              this.oldIndustryIndex = i
              this.industryValue = industry[i].value
              this.oldIndustryValue = industry[i].value
            }
          }
          // this.account.gender.selectedValue = this.getSeletedValue(res.data.gender.selectedKey, this.account.gender.dataDict)
          this.genderValue = this.getSeletedValue(res.data.gender.selectedKey, this.account.gender.dataDict)
          this.genderIndex = this.getSelectedIndex(res.data.gender.selectedKey, this.account.gender.dataDict)
        }
      }, error => {
        console.log(error)
      })
    },
    // 查找选中的value
    getSeletedValue (selectedValue, arr) {
      for (var j = 0; j < arr.length; j++) {
        if (selectedValue === arr[j].key) {
          return arr[j].value
        }
      }
    },
    getSeletedKey (selectedValue, arr) {
      for (var j = 0; j < arr.length; j++) {
        if (selectedValue === arr[j].value) {
          return arr[j].key
        }
      }
    },
    getSelectedIndex (selectedKey, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (selectedKey === arr[i].key) {
          return i
        }
      }
    },
    // 触发编辑按钮
    hanlderMessage () {
      if (this.EditText === this.$t('message.public.save')) {
        this.editAccountMsg()
      } else {
        this.EditText = this.$t('message.public.save')
        this.isEdit = true
        this.iconString = 'none'
      }
    },
    // 编辑个人资料信息
    editAccountMsg () {
      if (!this.account.nickname) {
        this.changeWranContent('account_name', this.$t('message.me.profile.nicknameNotEmpty'))
        return
      }
      // 邮箱校验
      var emailReg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/
      if (this.account.email && !emailReg.test(this.account.email)) {
        this.changeWranContent('account_email', this.$t('message.me.profile.mailFormatInvalid'))
        return
      }
      // 手机校验
      /* eslint-disable-next-line */
      var mobileReg = /[^(\d\+\-\(\))$]/
      console.log('mobileReg.test(this.account.mobile):::', mobileReg.test(this.account.mobile))
      if (this.account.mobile && mobileReg.test(this.account.mobile)) {
        this.changeWranContent('account_mobile', this.$t('message.me.profile.mobileFormatInvalid'))
        return
      }
      var obj = {}
      if (this.userId != null && this.userToken != null) {
        obj = {
          userId: this.userId,
          userToken: this.userToken,
          nickname: this.account.nickname,
          gender: this.account.gender.selectedKey,
          birthdate: this.account.birthdate,
          email: this.account.email,
          mobile: this.account.mobile,
          industry: this.getSeletedKey(this.industryValue, this.account.industry.dataDict)
        }
        this.isShowSpinner = true
      } else {
        return false
      }
      editAccount(obj).then(res => {
        if (res.code === 200) {
          this.isShowSpinner = false
          GhwToast({
            message: this.$t('message.me.profile.saved'),
            iconClass: 'iconfont icon-toast-tick'
          })
          this.oldAccount = JSON.parse(JSON.stringify(this.account))
          this.isEdit = false
          this.goBackHandler()
          this.account.gender.selectedValue = this.getSeletedValue(obj.gender, this.account.gender.dataDict)
          // Updated by Zping on 20180611
          // 尝试写session，无痕模式不支持的情况下写cookie
          StoreUtil.getInstance().setItemToSSCookie(constVar.SESSION_NICKNAME, this.account.nickname)
          StoreUtil.getInstance().setItemToSSCookie(constVar.SESSION_EMAIL, this.account.email)
          // End

          var userObj = JSON.parse(JSON.stringify(this.userObj))
          userObj.nickname = this.account.nickname
          userObj.email = this.account.email
          this.$store.dispatch('updateUserInfo', { userObj: userObj })
          if (top.location !== self.location) {
            // 判断到是处于iframe中，向父窗口发消息
            top.postMessage(JSON.stringify({
              cmd: postMessageEvent.MY_ACCOUNT,
              data: {
                nickname: this.account.nickname
              }
            }), '*')
          }
        }
      }, error => {
        console.log(error)
      })
    },
    // 取消编辑个人资料
    cancleAccountMsg () {
      this.account = JSON.parse(JSON.stringify(this.oldAccount))
      this.genderValue = this.getSeletedValue(this.oldAccount.gender.selectedKey, this.account.gender.dataDict)
      this.industryValue = this.getSeletedValue(this.oldAccount.industry.selectedKey, this.account.industry.dataDict)
      this.isEdit = false
      this.isShowSpinner = false
    },
    cancelPicker () {
      this.$store.dispatch('showFooter', true)
    },
    getContentLength (str, Maxlength) {
      let tempCount = 0
      for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i)
        if ((char >= 0x0001 && char <= 0x007e) || (char >= 0xff60 && char <= 0xff9f)) {
          tempCount++
        } else {
          tempCount += 2
        }
        if (tempCount > Maxlength) {
          this.account.nickname = str.substr(0, i)
          break
        }
      }
    },
    changeWranContent (idVal, content) {
      let arrId = document.getElementById(idVal)
      arrId.style.borderBottom = '1px solid #FF4542'
      this.warnContent = content
      this.isChangeContent = !this.isChangeContent
      let titleHeight = document.getElementById('title_height').scrollHeight
      document.getElementById('innerWrapper').scrollTop = document.body.scrollTop = (arrId.offsetTop - titleHeight)
    }
  },
  beforeMount () {
    console.log(this.nickname1)
  },
  mounted () {
    this.initAccountMsg()
    console.log('<><><><><>', this.userObj)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>

<style lang="scss" scoped>
.mint-popup-4 {
  width: 100%;
  .picker-slot-wrapper,
  .picker-item {
    backface-visibility: hidden;
  }
}
.picker-top {
  margin-top: 50px;
}
.headsBox {
  margin-top: 51px;
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 25px;
  background-color: #ffffff !important;
  border-bottom: 0.5px solid #eee;
  overflow: hidden;
}
.heads {
  width: 35px;
  height: 50px;
  float: right;
  margin-right: 10px;
  // border-radius: 50%;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.heads img {
  float: left;
  width: 35px;
}
.bootomBox {
  width: 100%;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.cancel-position {
  margin-right: 30px;
  border-radius: 30px;
}
.edit-button {
  background: url('../../../assets/img/user_btn.png') no-repeat;
}
.file {
  position: absolute;
  display: inline-block;
  width: 13px;
  height: 13px;
  background: url('../../../assets/img/camera.svg') no-repeat 100%;
  bottom: 6px;
  right: 10px;
}

.bind-infoBox {
  width: 100%;
  // padding: 5px 7.8%;
  min-height: 410px;
}

.bind-write-gender {
  width: 53%;
  height: 25px;
  // line-height: 32px;
  float: left;
  border-bottom: 1px solid #e0e0e0;
}

.write-unable {
  background-size: 0 !important;
  border: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 53% !important;
  text-indent: 0 !important;
  height: 30px;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Microsoft Yahei';
}
.bind-modify,
.bind-save {
  float: left;
  width: 15%;
  background-color: transparent;
  color: #1787dd;
  text-align: right;
  line-height: 22px;
  font-size: 12px;
}
.bind-radio {
  position: relative;
  float: left;
  width: 64px;
  height: 22px;
  background: url('../../../assets/img/bind_radio.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.bind-radioGirl,
.bind-radioBoy {
  width: 27px;
  height: 100%;
  border-radius: 50%;
  line-height: 22px;
  text-align: center;
  background-color: transparent;
  color: #565656;
}
.bind-radioGirl {
  float: left;
}
.bind-radioBoy {
  float: right;
}
#bind-woman,
#bind-man {
  position: absolute;
  top: 0;
  width: 27px;
  height: 100%;
  opacity: 0;
}
#bind-woman {
  left: 0;
}
#bind-man {
  right: 0;
}
#bind-woman:checked + .bind-radioGirl {
  color: #ffffff;
  background-color: #de51b5;
}
#bind-man:checked + .bind-radioBoy {
  color: #ffffff;
  background-color: #00a0e9;
}
.bind-select {
  position: relative;
  float: left;
  width: 53%;
  height: 22px;
  overflow: hidden;
  background: url('../../../assets/img/bind_write.png') no-repeat;
  background-size: 100% 100%;
  text-indent: 3%;
  // padding-top: 1px;
}
.bind-select span {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  line-height: 22px;
  text-align: right;
  color: #444444;
  font-size: 10px;
}
#bind-year,
#bind-month {
  float: right;
  width: 65%;
  height: 22px;
  line-height: 22px;
  background-color: transparent;
  color: #444444;
  font-size: 10px;
}
#bind-month {
  width: 50%;
}
.bind-country,
.bind-state,
.bind-city {
  position: relative;
  float: left;
  width: 36%;
  height: 100%;
  text-indent: 8px;
  background: url('../../../assets/img/bind_select2.png') no-repeat;
  background-size: 100% 100%;
}
.bind-state,
.bind-city {
  width: 23%;
  margin-left: 1%;
}
.bind-title {
  font-size: 12px;
  line-height: 30px;
}
.bind-account {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 20px;
  line-height: 20px;
  font-size: 11px;
}
.bind-account input[type='radio'] {
  vertical-align: -2px;
  margin-right: 2px;
}
.bind-account span {
  float: right;
  width: 25%;
  text-align: right;
  color: #00a0e9;
}
.selectIcon {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
  position: relative;
  right: 15px;
  top: 9px;
}
</style>
<style >
.mint-datetime-confirm {
  text-align: right !important;
  padding-right: 10px !important;
}
.mint-datetime-cancel {
  text-align: left !important;
  padding-left: 13px !important;
  color: #999999 !important;
}
.border-img {
  display: flex !important;
}
</style>
