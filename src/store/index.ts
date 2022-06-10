import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from "brdgm-commons/src/util/array/toggleArrayItem"
import Color from '@/services/enum/Color'
import BotLeader from '@/services/enum/BotLeader'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import SlotAction from '@/services/enum/SlotAction'
import Advisor from '@/services/enum/Advisor'
import Player from '@/services/enum/Player'
import { HouseholdMatPriority } from '@/services/HouseholdMat'
import ActionPriority from '@/services/enum/ActionPriority'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "store"

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
  claim: Claim[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
  playerColor: Color
  botLeader: BotLeader
  botColor: Color
  botCoins: number
  cardDeck: CardDeckPersistence
}
export interface Round {
  round: number
  cardDeck: CardDeckPersistence
  actionPriority: ActionPriority
  strategyRound: StrategyRound[]
  actionRoundPlayer: ActionRoundPlayer[]
  actionRoundBot: ActionRoundBot[]
}
export interface StrategyRound {
  round: number
  strategyRound: number
  botCoins: number
  strategyBoard: StrategyBoardPersistence
}
export interface CardDeckPersistence {
  pile: number[]
}
export interface StrategyBoardPersistence {
  columns : StrategyBoardColumn[]
  playerAdvisorReserve : Advisor[]
  botAdvisorReserve : Advisor[]
}
export interface StrategyBoardColumn {
  action: Action
  slots: StrategyBoardSlot[]
}
export interface StrategyBoardSlot {
  action: SlotAction
  advisor?: Advisor
  player?: Player
  coins?: number
}
export interface ActionRoundPlayer {
  round: number
  actionRound: number
  botCoins: number
  strategyBoard: StrategyBoardPersistence
}
export interface ActionRoundBot {
  round: number
  actionRound: number
  botCoins: number
  strategyBoard: StrategyBoardPersistence
  bonusActions: HouseholdMatPriority[]
}
export interface Claim {
  round: number
  priorityAttack: boolean
  priorityBuild?: boolean
  priorityTax?: boolean
  tracksAdvanced: number
  boatRowsFilled: number
  botCoins: number
  bonusActions: HouseholdMatPriority[]
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
    baseFontSize: 1.0,
    setup: {
      difficultyLevel: DifficultyLevel.EASY,
      expansions: [],
      playerColor: Color.BLUE,
      botLeader: BotLeader.SVIATOPOLK,
      botColor: Color.RED,
      botCoins: 3,
      cardDeck: CardDeck.new().toPersistence()
    },
    rounds: [],
    claim: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupToggleExpansionStoneBlade(state : State) {
      toggleArrayItem(state.setup.expansions, Expansion.STONE_BLADE)
      if (state.setup.expansions.length == 0) {
        state.setup.botLeader = BotLeader.SVIATOPOLK
      }
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    setupPlayerColor(state : State, color: Color) {
      state.setup.playerColor = color
      if (state.setup.botColor == color) {
        state.setup.botColor = Object.values(Color).filter(c => c != color)[0]
      }
    },
    setupBotLeader(state : State, leader: BotLeader) {
      state.setup.botLeader = leader
    },
    setupBotColor(state : State, color: Color) {
      state.setup.botColor = color
      if (state.setup.playerColor == color) {
        state.setup.playerColor = Object.values(Color).filter(c => c != color)[0]
      }
    },
    round(state : State, round: Round) {
      state.rounds[round.round - 1] = round
    },
    strategyRound(state : State, strategyRound: StrategyRound) {
      const round = state.rounds[strategyRound.round - 1]
      round.strategyRound[strategyRound.strategyRound - 1] = strategyRound
    },
    actionRoundPlayer(state : State, actionRoundPlayer: ActionRoundPlayer) {
      const round = state.rounds[actionRoundPlayer.round - 1]
      round.actionRoundPlayer[actionRoundPlayer.actionRound] = actionRoundPlayer
    },
    actionRoundBot(state : State, actionRoundBot: ActionRoundBot) {
      const round = state.rounds[actionRoundBot.round - 1]
      round.actionRoundBot[actionRoundBot.actionRound] = actionRoundBot
    },
    claim(state : State, claim: Claim) {
      state.claim[claim.round - 1] = claim
    },
    endGame(state : State) {
      state.setup.cardDeck = CardDeck.new().toPersistence()
      state.setup.botCoins = 3
      state.rounds = []
      state.claim = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
