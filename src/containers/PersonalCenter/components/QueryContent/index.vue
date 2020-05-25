<template>
  <div>
    <div class="service-detail" v-show="isHastextAre" id="search_textare">
      <p>{{textarea}}
        <i class="must-star">*</i>
      </p>
      <textarea v-model="queryContent" ref="queryContent" @blur="submitContent($event)" @click="$emit('popTop',$event)" :placeholder="textarea" @focus="focusContent($event)" maxlength="1000"></textarea>
      <div class="text-limit">
        <span :class="{'text-red':this.queryContent.length===1000}">{{this.queryContent.length}}</span>/1000</div>
    </div>
    <div class="service-write2 clearfix">
      <label class="attachment clearfix" v-show="isHastextAre">{{$t('message.me.addTicket.attachment')}}
        <!-- <span v-show="(images.length>0)?false:true">{{$t('message.me.addTicket.notSelected')}}</span> -->
      </label>
      <span v-show="isHastextAre" class="service-update">({{$t('message.me.addTicket.uploadLimit')}})</span>
      <!-- </div> -->
      <div class="clear"></div>
      <!--上传图片列表  两端对齐-->
      <div class="service-showImg clearfix" v-show="true">
        <form id="formdata">
          <div class="add-image-icon">
            <input type="file" class="service-file" id="fileImg" accept='image/*' @change="selectImage($event,images.length)" ref="avatarInput">
          </div>
          <div class="img-size service-img on" v-for="(image, index) in images" :key="'img'+index">
            <div class="img-deleted img-size">
              <div class="wrap-img-deleted img-size">
                <img :src="image.attachmentUrl" alt="">
              </div>
            </div>
            <em @click="deleteImage(index)" class="delete"></em>
            <div class="img-loadding img-size">
              <div class="wrap-img-loadding img-size">
                <mt-spinner type="fading-circle" color="#26a2ff" v-if="isLoaderIcon[index]"></mt-spinner>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { uploadImg } from '@/services'
import { mapState } from 'vuex'
import GhwBtn from '@/components/GhwBtn'
import imgBg from '@/assets/img/img_bg.jpg'
/**
 * @desc 用于输入文字和添加图片上传
 * @author chenzechao
 * @date 2018.5.28
 * @param {string} textarea - 文本域的值
 * @param {boolean} restImage-重置图片
 * @param {Boolean} isHastextAre-是否有文本域
 * @example 调用实例 <query-content @confirm='getImages' :textarea="$t('message.me.replyTicket.postReply')"></query-content>
 */

export default {
  name: 'QueryContent',
  props: {
    textarea: {
      type: String,
      default: ''
    },
    restImage: {
      type: Boolean,
      default: false
    },
    isHastextAre: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      images: [],
      queryContent: '',
      showImg: false,
      isLoaderIcon: [true, true, true, true, true],
      isResetImage: false,
      amount: 0
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj
    })
  },
  components: {
    GhwBtn
  },
  watch: {
    restImage () {
      this.isResetImage = true
      this.showImg = false
      this.queryContent = ''
      this.images = []
      this.isLoaderIcon = [true, true, true, true, true]
      document.getElementById('formdata').reset()
    }
  },
  methods: {
    submitContent (event) {
      this.$emit('confirm', this.images, this.queryContent)
      event.target.parentElement.style.borderBottom = '1px solid #eee'
    },
    focusContent (event) {
      event.target.parentElement.style.borderBottom = '1px solid #1787DD'
    },

    // 添加图片
    selectImage: function (e, i) {
      let files = e.target.files[0] || e.dataTransfer.files[0]
      if (files.size > 1024 * 1024 * 5) {
        Toast({ message: this.$t('message.me.profile.picExceed5M'), position: 'bottom' })
        return false
      }
      if (this.images.length >= 5) {
        Toast({ message: this.$t('message.me.addTicket.uploadLimit'), position: 'bottom' })
        return false
      }
      this.isResetImage = false
      let imgObj = { 'attachmentName': files.name, 'attachmentUrl': imgBg }
      this.images.push(imgObj)
      this.setImageUrl(files, i)
    },
    setImageUrl (e, i) {
      let formdata = new FormData()
      formdata.append('attachData', e)
      formdata.append('userId', this.userObj.userId)
      formdata.append('userToken', this.userObj.h5Token)
      formdata.append('v', new Date().getTime())
      formdata.append('locale', (navigator.language || navigator.userLanguage).toString().replace(/-/, '_'))
      uploadImg(formdata).then(res => {
        // 网络慢时，当触发了重置图片按钮不加载图片
        if (this.isResetImage) { this.isResetImage = false; return }
        let imgs = new Image()
        imgs.src = res.data.attachUrl
        imgs.onload = () => {
          this.$set(this.isLoaderIcon, i, false)
        }
        this.showImg = true
        this.images[i].attachmentUrl = res.data.attachUrl
        this.$emit('confirm', this.images, this.queryContent)
      })
    },
    // 删除图片
    deleteImage (index) {
      this.isLoaderIcon[this.images.length - 1] = true
      this.images.splice(index, 1)
      if (this.images.length === 0) {
        this.showImg = false
      }
      this.isResetImage = true
      this.$emit('confirm', this.images, this.queryContent)
      document.getElementById('formdata').reset()
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
.service-detail {
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  .text-limit {
    padding-right: 11.5px;
    height: 28px;
    line-height: 28px;
    color: #cccccc;
    text-align: right;
  }
}
.service-detail p {
  color: #666666;
  font-size: 13px;
  font-family: 'Microsoft YaHei';
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eeeeee;
  padding-left: 12px;
}
.service-detail textarea {
  color: #cccccc;
  font-size: 13px;
  font-family: 'MicrosoftYaHei';
  padding: 0px 12px;
  margin: 15px 0px 0px;
  line-height: 15px;
  width: 100%;
  min-height: 90px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  resize: none;
  font-family: 'Microsoft YaHei';
}
.service-write2 {
  position: relative;
  width: 100%;
  margin: 8px 0 0 0;
  border-bottom: 1px solid #eeeeee;
  padding: 0 12px 8px 12px;
  font-family: 'Microsoft YaHei';
}
.add-image-icon {
  width: 55px;
  height: 56px;
  float: left;
  margin-right: 20px;
  margin-bottom: 15px;
  background: url('../../../../assets/img/add_image.svg') center/100% no-repeat;
}
.service-write2 label {
  font-size: 13px;
  text-align: left;
  color: #666;
}
.service-update {
  display: block;
  padding-top: 5px;
  color: #cccccc;
  font-size: 9px;
  font-family: 'Microsoft YaHei';
}
.service-write2 .attachment {
  font-family: 'Microsoft YaHei';
  color: #666666;
  font-size: 13px;
  width: auto;
  span {
    margin-left: 5px;
    font-size: 9px;
  }
}
.service-showImg {
  width: 100%;
  padding-top: 8px;
  text-align: justify;
  overflow: hidden;
}
.service-img {
  position: relative;
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 15px;
  background-color: #efeff4;
}
.img-deleted {
  position: absolute;
  z-index: 5;
  .wrap-img-deleted {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.service-img img {
  max-width: 100%;
  max-height: 100%;
}
.img-loadding {
  position: absolute;
  z-index: 10;
  .wrap-img-loadding {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.img-size {
  width: 55px;
  height: 55px;
}
.service-img.on .delete {
  display: block;
  position: absolute;
  top: -5px;
  right: -5px;
  width: 12px;
  height: 12px;
  z-index: 20;
  background: url('../../../../assets/img/del_image.svg') center/100% no-repeat;
}
.must-star {
  color: #ff4542;
  font-style: normal;
  margin-left: 4px;
}
.text-red {
  color: #ff4542;
}
.service-file {
  width: 55px;
  height: 55px;
  opacity: 0;
  -webkit-tap-highlight-color: transparent;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #cccccc;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #cccccc;
}
.warn-contet::-webkit-input-placeholder {
  color: #ff4542;
}
.warn-contet:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ff4542;
}
.warn-contet::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ff4542;
}
.warn-contet:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ff4542;
}
</style>
