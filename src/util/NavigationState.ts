import CardDeck from "@/services/CardDeck"
import ActionPriority from "@/services/enum/ActionPriority"
import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { HouseholdMatPriority } from "@/services/HouseholdMat"
import HouseholdMats from "@/services/HouseholdMats"
import StrategyBoard from "@/services/StrategyBoard"
import { Round, State, StrategyRound } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly cardDeck: CardDeck
  readonly actionPriority : ActionPriority
  readonly strategyRound : number
  readonly botCoins : number
  readonly bonusActions : HouseholdMatPriority[]
  readonly strategyBoard : StrategyBoard
  readonly actionRound : number

  constructor(route : RouteLocation, store : Store<State>) {
    this.difficultyLevel = store.state.setup.difficultyLevel

    // card deck
    this.round = parseInt(route.params['round'] as string)
    const roundPersistence = this.getRoundPersistence(this.round, store)
    this.cardDeck = CardDeck.fromPersistence(roundPersistence.cardDeck)
    this.actionPriority = roundPersistence.actionPriority

    let botCoins = 0
    let bonusActions : HouseholdMatPriority[] = []
    let strategyBoard = StrategyBoard.new(this.round)

    // strategy board
    if (route.name == 'StrategyPhase') {
      this.strategyRound = parseInt(route.params['strategyRound'] as string)
      const strategyRoundPersistence = this.getStrategyRoundPersistence(
        roundPersistence, this.strategyRound, store)
      botCoins = strategyRoundPersistence.botCoins
      strategyBoard = StrategyBoard.fromPersistence(strategyRoundPersistence.strategyBoard)
    }
    else {
      this.strategyRound = -1
    }

    // action rounds player / bot
    if (route.name == 'ActionPhasePlayer') {
      this.actionRound = parseInt(route.params['actionRound'] as string)
      if (this.actionRound == 0) {
        const lastStrategyRound = roundPersistence.strategyRound[roundPersistence.strategyRound.length - 1]
        if (lastStrategyRound) {
          botCoins = lastStrategyRound.botCoins
          strategyBoard = StrategyBoard.fromPersistence(lastStrategyRound.strategyBoard)
        }
      }
      else {
        const lastActionRoundBot = roundPersistence.actionRoundBot[this.actionRound - 1]
        if (lastActionRoundBot) {
          botCoins = lastActionRoundBot.botCoins
          strategyBoard = StrategyBoard.fromPersistence(lastActionRoundBot.strategyBoard)
        }
      }
    }
    else if (route.name == 'ActionPhaseBot') {
      this.actionRound = parseInt(route.params['actionRound'] as string)
      const lastActionRoundPlayer = roundPersistence.actionRoundPlayer[this.actionRound]
      if (lastActionRoundPlayer) {
        botCoins = lastActionRoundPlayer.botCoins
        strategyBoard = StrategyBoard.fromPersistence(lastActionRoundPlayer.strategyBoard)
      }
      if (this.actionRound == 0) {
        if (this.round == 1) {
          const householdMat = HouseholdMats.get(this.difficultyLevel)
          bonusActions = householdMat.priorities
        }
        else {
          const lastRound = store.state.rounds[this.round - 2]
          const lastActionRoundBot = lastRound.actionRoundBot[lastRound.actionRoundBot.length - 1]
          if (lastActionRoundBot) {
            bonusActions = lastActionRoundBot.bonusActions
          }
        }
      }
      else {
        const lastActionRoundBot = roundPersistence.actionRoundBot[this.actionRound - 1]
        if (lastActionRoundBot) {
          bonusActions = lastActionRoundBot.bonusActions
        }
      }
    }
    else {
      this.actionRound = -1
    }

    if (route.name == 'ClaimPhase' || route.name == 'EndOfGame') {
      const lastActionRoundBot = roundPersistence.actionRoundBot[roundPersistence.actionRoundBot.length - 1]
      if (lastActionRoundBot) {
        botCoins = lastActionRoundBot.botCoins
        bonusActions = lastActionRoundBot.bonusActions
      }
    }

    this.botCoins = botCoins
    this.bonusActions = bonusActions
    this.strategyBoard = strategyBoard
  }

  private getRoundPersistence(round : number, store : Store<State>) : Round {
    const state = store.state
    let roundPersistence = state.rounds[round - 1]
    if (!roundPersistence) {
      // should never happen
      console.log('Unable to get persistence for round: ' + round)
      roundPersistence = {
        round: round,
        cardDeck: CardDeck.new().toPersistence(),
        actionPriority: ActionPriority.ATTACK_MOVE,
        strategyRound: [],
        actionRoundPlayer: [],
        actionRoundBot: []
      }
    }
    return roundPersistence
  }

  private getStrategyRoundPersistence(round : Round, strategyRound : number, store : Store<State>) : StrategyRound {
    let strategyRoundPersistence = strategyRound > 0 ? round.strategyRound[strategyRound-1] : undefined
    if (!strategyRoundPersistence) {
      let botCoins = 0
      if (round.round == 1) {
        botCoins = store.state.setup.botCoins
      }
      else {
        const previousClaim = store.state.claim[round.round - 2]
        if (previousClaim) {
          botCoins = previousClaim.botCoins
        }
      }
      strategyRoundPersistence = {
        round: round.round,
        strategyRound: 0,
        botCoins: botCoins,
        strategyBoard: StrategyBoard.new(round.round).toPersistence()
      }
    }
    return strategyRoundPersistence
  }

}
