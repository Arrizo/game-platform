// import Game from '@/containers/Game'
// import GameType from '@/containers/Gamestype'

const Game = resolve => require(['@/containers/Game'], resolve)
const GameTypeList = resolve => require(['@/containers/Gamestype'], resolve)

const routes = [
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: {
      curIndex: 2,
      pageId: 1,
      pageName: 'MiniGame'
    }
  },
  // 游戏类型列表
  {
    path: '/game-type-list',
    name: 'GameTypeList',
    component: GameTypeList,
    meta: {
      pageId: 12,
      pageName: 'GameTypeList'
    }
  }
]

export default routes
