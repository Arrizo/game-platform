<template>
  <ul>
    <li class="hot_item" v-for="(item,index) in hotItemsArr" :key="'hotItem'+index">
      <a href="#">
        <img :src="item.appIconUrl">
        <span>{{item.appName}}</span>
      </a>
    </li>
  </ul>
</template>
<script>
// import iconLittle from '@/assets/img/little_icon.png'

export default {
  data: () => {
    return {}
  },
  props: {
    hotItemsArr: {
      type: Array,
      defaul: () => {
        return [
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // },
          // {
          //   id: '1',
          //   gameName: '弹弹堂S弹弹堂S',
          //   gameIcon: iconLittle
          // }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hot-game {
  position: relative;
  width: 100%;
  min-height: 100px;
  border-bottom: 1px solid #e0e0e0;
}
.hot_item {
  float: left;
  margin-left: 22.784px;
  width: 51.52px;
  height: 67.6px;
  margin-bottom: 5px;
}
.hot_item img {
  height: 51.6px;
  border-radius: 10px;
}
</style>
