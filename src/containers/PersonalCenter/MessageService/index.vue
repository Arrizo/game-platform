<template>
  <div>
    <!-- 头部信息 -->
    <personal-header :userIcon="userObj.iconUrl" :userName="userObj.nickname" :userId="userObj.userId" :linkTo="'PersonalCenter'"></personal-header>
    <!--留言板-->
    <div class="service-bookBox">

      <!--添加留言-->
      <a class="service-add on" @click='openNewTicket'>
        <span>{{$t('message.me.ticket.openNewTicket')}}</span>
      </a>

      <!--查看留言-->
      <a class="service-look on" @click="showCheckTicket">
        <span>{{$t('message.me.ticket.checkTicket')}}</span>
      </a>
    </div>

    <!--说明-->
    <div class="service-content">
      <div class="service-tips" v-html="$t('message.me.ticket.ticketNote')">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PersonalHeader from '@/containers/PersonalCenter/components/PersonalHeader'
export default {
  name: 'MessageService',
  extends: {},
  props: {},
  data () {
    return {
      selected: this.$route.params.selected
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj
    })
  },
  components: {
    PersonalHeader
  },
  watch: {

  },
  methods: {
    showCheckTicket: function () {
      this.$router.push({ name: 'ServiceMain', params: { 'selected': 'selecte2' } })
    },
    openNewTicket: function () {
      this.$router.push({ name: 'ServiceMain', params: { 'selected': 'selecte1' } })
    }
  },
  beforeMount: {},
  mounted: function () {
    if (this.selected) { this.showCheckTicket() }
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>

<style lang="scss" scoped>
.service-bookBox {
  width: 100%;
  height: 90px;
  padding: 13px 0 10px;
  border-bottom: 2px solid #e0e0e0;
}
.service-add,
.service-look {
  position: relative;
  width: 50px;
  height: 50px;
}
.service-add span,
.service-look span {
  position: absolute;
  bottom: -20px;
  left: -16px;
  width: 80px;
  text-align: center;
  font-size: 8px;
  height: 20px;
  line-height: 24px;
}
.service-add {
  float: left;
  margin-left: 20%;
  background: url("../../../assets/img/add_book.svg") no-repeat;
  background-size: 100% 100%;
  span {
    color: #1787dd;
  }
}
.service-look {
  float: right;
  margin-right: 20%;
  background: url("../../../assets/img/look_book.svg") no-repeat;
  background-size: 100% 100%;
  span {
    color: #1787dd;
  }
}

.service-tips {
  width: 88%;
  margin: 0 auto;
  font-size: 9px;
  line-height: 15px;
  color: #1787dd;
  padding: 10px 0 20px;
}
</style>
