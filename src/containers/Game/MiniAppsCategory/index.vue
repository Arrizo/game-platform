<template>
  <div class="classify-color">
    <!--分类-->
    <div class="classify-list clearfix">
      <div v-for="(item,index) in typeArr" :key="'classify'+index" class="classify-item">
        <router-link :to="{name:'GameTypeList', query:{typeId:'type_'+item.typeId}}" class="clearfix">
          <category-item :typeIcon="item.typeIcon" :typeName="item.typeName" :appCount="item.appCount"></category-item>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import GhwIconMore from '@/components/GhwIconMore'
import { getTypeList } from '@/services'
import CategoryItem from '@/containers/Game/components/CategoryItem'
export default {
  name: 'MiniAppsCategory',
  extends: {},
  props: {
    isSubNavBarFixed: {
      type: Boolean,
      default () {
        return true
      }
    },
    isStartService: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      subNavBar: 'subNavBar1',
      typeArr: []
    }
  },
  computed: {
  },
  components: {
    GhwIconMore,
    CategoryItem
  },
  watch: {
    isStartService (val) {
      if (val) {
        this.setTypeList()
      }
    }
  },
  methods: {
    // 获取分类游戏列表
    setTypeList () {
      const obj = {
        page: 1,
        pageSize: 13
      }
      getTypeList(obj).then(res => {
        this.typeArr = res.data.typeList
        this.$emit('isCompleteCateGame', 'finish')
      }, error => {
        console.log(error)
        this.$emit('isCompleteCateGame', 'finish')
      })
    }
  },
  beforeMount () { },
  mounted () {
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
/*小游戏页面*/
.classify-list {
  width: 320px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 44px;
  text-align: justify;
  background: #fff;
}
//兼容火狐的hack
@-moz-document url-prefix() {
  .classify-item {
    width: 4.33rem !important;
  }
}
.classify-item {
  float: left;
  margin: 5px 6px 5px 8px;
  width: 145px;
  height: 65px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(153, 153, 153, 0.15);
}
</style>
