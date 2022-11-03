import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import SetupGameDifficulty from '@/views/SetupGameDifficulty.vue'
import SetupRebellion from '@/views/SetupRebellion.vue'
import SetupPlayer from '@/views/SetupPlayer.vue'
import StrategyPhase from '@/views/StrategyPhase.vue'
import NotFound from '@/views/NotFound.vue'
import ActionPhasePlayer from '@/views/ActionPhasePlayer.vue'
import ActionPhaseBot from '@/views/ActionPhaseBot.vue'
import ClaimPhase from '@/views/ClaimPhase.vue'
import EndOfGame from '@/views/EndOfGame.vue'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "route"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/setup/gameDifficulty',
    name: 'SetupGameDifficulty',
    component: SetupGameDifficulty
  },
  {
    path: '/setup/rebellion',
    name: 'SetupRebellion',
    component: SetupRebellion
  },
  {
    path: '/setup/player',
    name: 'SetupPlayer',
    component: SetupPlayer
  },
  {
    path: '/round/:round/strategy/:strategyRound',
    name: 'StrategyPhase',
    component: StrategyPhase
  },
  {
    path: '/round/:round/action/player/:actionRound',
    name: 'ActionPhasePlayer',
    component: ActionPhasePlayer
  },
  {
    path: '/round/:round/action/bot/:actionRound',
    name: 'ActionPhaseBot',
    component: ActionPhaseBot
  },
  {
    path: '/round/:round/claim',
    name: 'ClaimPhase',
    component: ClaimPhase
  },
  {
    path: '/round/:round/end',
    name: 'EndOfGame',
    component: EndOfGame
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// store last used route path in local storage
router.afterEach(to => {
  localStorage.setItem(LOCALSTORAGE_KEY, to.fullPath)
})
// redirect to lase used route path
let isFirstTransition = true
router.beforeEach((to, _from, next) => {
  const lastRouteFullPath = localStorage.getItem(LOCALSTORAGE_KEY)
  if (to.name === "Home" && lastRouteFullPath && isFirstTransition) next(lastRouteFullPath)
  else next()
  isFirstTransition = false
})

export default router
