import { defineStore } from 'pinia'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from 'brdgm-commons/src/util/array/toggleArrayItem'
import Color from '@/services/enum/Color'
import BotLeader from '@/services/enum/BotLeader'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import SlotAction from '@/services/enum/SlotAction'
import Advisor from '@/services/enum/Advisor'
import Player from '@/services/enum/Player'
import { HouseholdMatPriority } from '@/services/HouseholdMat'
import ActionPriority from '@/services/enum/ActionPriority'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
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
    } as State
  },
  actions: {
    setupToggleExpansionStoneBlade() {
      toggleArrayItem(this.setup.expansions, Expansion.STONE_BLADE)
      if (this.setup.expansions.length == 0) {
        this.setup.botLeader = BotLeader.SVIATOPOLK
      }
    },
    setupPlayerColor(color: Color) {
      this.setup.playerColor = color
      if (this.setup.botColor == color) {
        this.setup.botColor = Object.values(Color).filter(c => c != color)[0]
      }
    },
    setupBotLeader(leader: BotLeader) {
      this.setup.botLeader = leader
    },
    setupBotColor(color: Color) {
      this.setup.botColor = color
      if (this.setup.playerColor == color) {
        this.setup.playerColor = Object.values(Color).filter(c => c != color)[0]
      }
    },
    round(round: Round) {
      this.rounds[round.round - 1] = round
    },
    strategyRound(strategyRound: StrategyRound) {
      const round = this.rounds[strategyRound.round - 1]
      round.strategyRound[strategyRound.strategyRound - 1] = strategyRound
    },
    actionRoundPlayer(actionRoundPlayer: ActionRoundPlayer) {
      const round = this.rounds[actionRoundPlayer.round - 1]
      round.actionRoundPlayer[actionRoundPlayer.actionRound] = actionRoundPlayer
    },
    actionRoundBot(actionRoundBot: ActionRoundBot) {
      const round = this.rounds[actionRoundBot.round - 1]
      round.actionRoundBot[actionRoundBot.actionRound] = actionRoundBot
    },
    storeClaim(claim: Claim) {
      this.claim[claim.round - 1] = claim
    },
    resetGame() {
      this.setup.cardDeck = CardDeck.new().toPersistence()
      this.setup.botCoins = 3
      this.rounds = []
      this.claim = []
    }
  },
  persist: true
})

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
