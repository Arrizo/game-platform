<template>
  <div class="warp">
    <div class="main white">

      <!--新闻标题-->
      <div class="news_title">
        <h2>{{information.newsTitle}}</h2>
        <time>{{information.publishTime}}</time>
      </div>

      <!--新闻内容-->
      <div class="news_box">
        <p class="news_strong">{{information.newsTitle}}</p>

        <p class="news_blue">xxxx时间：{{information.publishTime}}</p>
        <p >xxxx时间：{{information.publishTime}}</p>

        <p class="news_strong">{{information.newsTitle}}</p>
        <div class="news_img" v-html="information.newsContent">
        </div>
      </div>
    </div>

    <!--底部信息-->
    <div class="news_foot">
      <button type="button" class="news_returnList" onclick="javascript:history.go(-1)">返回列表</button>
      <a href="javascript:;" class="news_play" v-on:click="gameLink(information.appLink)">进入游戏</a>
    </div>
  </div>
</template>

<script>
import { getInformation } from '@/services'
export default {
  name: 'index',
  data () {
    return {
      // 父级传递的参数
      tranInfo: {
        userId: this.$route.query.id,
        userAge: this.$route.query.age,
        usertoken: this.$route.query.token
      },
      information: {
        newsId: '用户ID',
        newsTitle: '资讯的标题',
        newsContent: '资讯内容',
        publishTime: '系统时间',
        appLink: '游戏链接'
      }
    }
  },
  methods: {
    setInformation () {
      const obj = {
        newsId: 1,
        local: 'zh_CN'
      }
      getInformation(obj).then(res => {
        this.information.newsId = res.data.newsId
        this.information.newsTitle = res.data.newsTitle
        this.information.newsContent = res.data.newsContent
        this.information.publishTime = res.data.publishTime
        this.information.appLink = res.data.appLink
        this.getTime(this.information.publishTime)
      })
    },
    gameLink (link) {
      window.location.href = link
      console.log(link)
    },
    getTime (time) {
      var Time = new Date(parseInt(time))
      this.information.publishTime = Time.getFullYear() + '-' + (Time.getMonth() + 1) + '-' + (Time.getDate() + 1)
    }
  },
  mounted: function () {
    this.setInformation()
  }
}
</script>

<style scoped>
  .warp{top: 0;left: 0;right: 0;bottom: 0;width: 100%;background-color: #fffdfd;}
  .main{position: absolute;top: 0;bottom: 50px;width: 100%;overflow-y: auto;-webkit-overflow-scrolling:touch;}
  .white{background-color: #ffffff;}
  .news_title{width: 100%;padding: 10px 0px;text-align: center;border-bottom: 1px solid #e0e0e0;}
  .news_title h2{color: #444444;font-size: 18px;line-height: 30px;text-align: center;}
  .news_title time{font-size: 9px;color: #8f9090;}
  .news_box{width: 85%;min-height: 100px;padding: 1px 0 30px;margin: 0 auto;}
  .news_box p{color: #444444;line-height: 20px;font-size: 12px;}
  .news_box .news_blue{color: #1787dd;}
  .news_strong{font-weight: bold;margin-top: 15px;}
  .news_img{width: 90%; margin: 15px auto;overflow: hidden;}
  .news_foot{position: fixed;left: 0;bottom: 0; width: 100%;height: 50px;overflow: hidden;}
  .news_returnList,.news_play{width: 50%;height: 50px;line-height: 50px;font-size: 16px;text-align: center;}
  .news_returnList{float: left;background-color: #efeff4;color: #1787dd;}
  .news_play{float: right;background-color: #1787dd;color: #efeff4;}
</style>
