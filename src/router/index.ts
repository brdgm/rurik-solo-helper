import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import SetupGameDifficulty from '@/views/SetupGameDifficulty.vue'
import SetupRebellion from '@/views/SetupRebellion.vue'
import SetupPlayer from '@/views/SetupPlayer.vue'
import StrategyPhase from '@/views/StrategyPhase.vue'
import NotFound from '@/views/NotFound.vue'
import ActionPhasePlayer from '@/views/ActionPhasePlayer.vue'
import ActionPhaseBot from '@/views/ActionPhaseBot.vue'
import ClaimPhase from '@/views/ClaimPhase.vue'
import EndOfGame from '@/views/EndOfGame.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
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

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')