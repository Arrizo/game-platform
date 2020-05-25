<template>
  <div>
    <!--头像-->
    <div class="headsBox clearfix">
      <div class="heads"><img :src="personCenter.iconUrl"></div>
      <div class="heads_lf">
        <h3>{{personCenter.nickname}} </h3>
        ID : <span>xxxxxxx</span>
      </div>
      <a class="heads_rg" href="javascript:;">切换账号</a>
    </div>
    <!--其他操作方式-->
    <div class="othersBox">
      <a href="bind_account.html" class="others">
        <img :src="IconPersonal1">
        <span>绑定账号</span>
      </a>
      <a href="#" class="others">
        <img :src="IconPersonal2">
        <span>我的礼包</span>
      </a>
      <a href="message_index.html" class="others">
        <img :src="IconPersonal3">
        <span>我的消息</span>
      </a>
      <a href="service_index.html" class="others">
        <img :src="IconPersonal4">
        <span>咨询客服</span>
      </a>
    </div>
    <!--我最近玩过的-->
    <div class="rankBox">
      <!--我玩过的-->
      <p class="personal_played">我玩过的游戏</p>

      <!--推荐-->
      <div class="rankList">
        <!-- 1 -->
        <mt-loadmore :bottom-medhod="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div v-for="(item,index) in playedArr" :key="'played'+index" class="rank_item">
          <a :href="item.appUrl" class="rank_img">
            <img :src="item.appIconUrl">
          </a>
          <div class="rank_lf">
            <div class="rank_title">{{item.appName}}</div>
            <div class="rank_time">上次玩的时间 :{{item.lastPlayTime}}</div>
            <div class="rank_count">玩过:{{item.playCount}}次</div>
          </div>

          <div class="rank_rg">
            <a href="javascript:;">开始游戏</a>
          </div>
        </div>
        <!--更多-->
        <ghw-icon-more></ghw-icon-more>
        </mt-loadmore>
      </div>
    </div>

  </div>
</template>
<script>
import GhwIconMore from '@/components/GhwIconMore'
import { getPlayedList, getPersonCenter } from '@/services'
import heads from '@/assets/img/heads.png'
import IconPersonal1 from '@/assets/img/personal_icon1.png'
import IconPersonal2 from '@/assets/img/personal_icon2.png'
import IconPersonal3 from '@/assets/img/personal_icon3.png'
import IconPersonal4 from '@/assets/img/personal_icon4.png'

export default {
  data () {
    return {
      heads,
      IconPersonal1,
      IconPersonal2,
      IconPersonal3,
      IconPersonal4,
      playedArr: [{
        // 'appId': 123456789,
        // 'appName': 'ddtank',
        // 'appType': '休闲类',
        // 'appTags': [{ 'tagId': '1', 'tagName': '热门' }, { 'tagId': '2', 'tagName': '新游' }],
        // 'appIconUrl': ' http://www.ddtank.us/v2/templet/ddtank_website/images/vip.jpg',
        // 'appPopularity': '1000',
        // 'appRate': '4',
        // 'briefIntro': 'This is a casual game.',
        // 'appOrder': 3,
        // 'lastPlayTime': '1520940812',
        // 'playCount': '3',
        // 'appUrl': 'https://www.abc.com/ddtank'

      }],
      // 用户的信息
      personCenter: {
        iconurl: '',
        nickName: ''
      }
    }
  },
  components: {
    GhwIconMore
  },
  methods: {
    setPlayedArr () {
      const obj = {
        userId: 123123,
        page: 1,
        pageSize: 10
      }
      getPlayedList(obj).then(res => {
        this.playedArr = res.data.appList
        this.playedArr.iconurl = res.data.iconurl
      })
    },
    setPersonCenter () {
      const obj = {
        userId: 2342432
      }
      getPersonCenter(obj).then(res => {
        this.personCenter = res.data.nickname
      })
    }
  },
  mounted: function () {
    this.setPersonCenter()
    this.setPlayedArr()
  }
}
</script>

<style lang="scss" scoped>
.headsBox {
  position: relative;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.heads {
  float: left;
  width: 75px;
  margin-left: 10px;
}
.heads_lf {
  float: left;
  width: 147px;
  margin-left: 10px;
  padding: 12px 0;
  color: #444444;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.heads_lf h3 {
  font-size: 15px;
  line-height: 26px;
}
.heads_rg {
  float: right;
  margin-right: 10px;
  margin-top: 23px;
  width: 67px;
  height: 26px;
  font-size: 11px;
  background: url("../../assets/img/user_btn.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 25px;
  color: #ffffff;
}

.othersBox {
  width: 100%;
  padding: 12px 20px;
  border-bottom: 2px solid #e0e0e0;

  // width: 262px;
  margin: 0 auto;
  display: flex;
}
.others {
  flex: 1;
  text-align: center;
  margin: 0px 10px;
}
.others span {
  color: #1787dd;
  font-size: 9px;
}
.othersInner:after {
  content: " ";
  display: inline-block;
  width: 100%;
}

.personal_played {
  height: 30px;
  line-height: 30px;
  color: #1787dd;
  font-size: 11.5px;
  margin-left: 10px;
}
.rank_title {
  position: absolute;
  top: 0px;
  color: #444444;
  font-size: 12px;
  font-weight: bold;
}
.rank_time {
  position: absolute;
  top: 18px;
  color: #1787dd;
  font-size: 9px;
}
.rank_count{
  position: absolute;
  top: 35px;
  color: #1787dd;
  font-size: 9px;
}

.rankList {
  position: relative;
  width: 100%;
}
.rank_item {
  position: relative;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.rank_img {
  float: left;
  display: block;
  margin-left: 10px;
  width: 58px;
  height: 55.6px;
}
.rank_lf {
  float: left;
  position: relative;
  margin-left: 7px;
  width: 166px;
  height: 55.6px;
}
.rank_lf h3 {
  position: absolute;
  top: 6px;
  left: 0;
  color: #444444;
  font-size: 12px;
}
.rank_lf p {
  position: absolute;
  top: 23px;
  left: 0;
  color: #848484;
  font-size: 9px;
}
.rank_rg {
  float: right;
  margin-right: 10px;
  width: 67px;
  height: 100%;
}
.rank_rg a {
  display: block;
  width: 100%;
  height: 26px;
  margin-top: 16.5px;
  font-size: 9px;
  color: #ffffff;
  line-height: 26px;
  text-align: center;
  background: url("../../assets/img/list_playBtn.png") no-repeat;
  background-size: 100% 100%;
}
</style>
