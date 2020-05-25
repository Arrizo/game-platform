<template>
  <div>
    <ghw-pop-up :isShowPopUp="accountFreeze" :isShowClose="true" @closePopUp="closePopUp" v-show="accountFreeze">
      <div slot="title">
        {{$t('message.buoy.privacy.privacyNotice')}}
      </div>
      <div slot="content" class="reminder-content">
        {{$t('message.buoy.privacy.privacyNoticeDesc')}}
      </div>
      <div slot="btn" class="add-freeze-btn">
        <ghw-btn :type="'rectangular'" :inputValue="$t('message.public.confirm')" :size="'public'" :ownStyle="'blue-btn'" :inputType="'button'" @triggerEvent="closePopUp"></ghw-btn>
      </div>
    </ghw-pop-up>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import GhwBtn from '@/components/GhwBtn'
import GhwPopUp from '@/components/GhwPopUp'
// import * as BrowserUtils from '@/utils/BrowserUtils'
export default {
  name: 'GhwAccountFreeze',
  props: {},
  data () {
    return {
      isGame: this.$route.query.isGame
    }
  },
  computed: {
    ...mapState({
      accountFreeze: state => state.user.isAccountFreeze
    })
  },
  components: {
    GhwBtn,
    GhwPopUp
  },
  watch: {},
  methods: {
    closePopUp () {
      this.$store.dispatch('accountFreeze', false)
      // BrowserUtils.historyBack(this.isGame)
    }
  }
}
</script>
<style lang="scss" scoped>
.reminder-content {
  font-size: 13px;
  color: rgba(76, 76, 76, 1);
  line-height: 20px;
  padding: 0 17px 0 11.5px;
  text-align: justify;
  word-break: break-all;
}
.add-freeze-btn {
  padding-bottom: 20px;
}
</style>
