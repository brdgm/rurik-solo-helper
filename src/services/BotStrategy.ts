import Card, { CardPriority, AdvisorAction } from './Card'
import Player from './enum/Player'
import StrategyBoard from './StrategyBoard'
import ActionPriority from './enum/ActionPriority'
import { StrategyBoardColumn, StrategyBoardSlot } from '@/store/state'
import Advisor from './enum/Advisor'
import Action from './enum/Action'

/**
 * Bot implementation for picking slots on strategy board.
 */
export default class BotStrategy {

  private _actionPriority : ActionPriority
  private _round : number
  private _coins : number

  public constructor(round : number, actionPriority : ActionPriority, coins : number) {
    this._actionPriority = actionPriority
    this._round = round
    this._coins = coins
  }

  public get coins() : number {
    return this._coins
  }

  /**
   * Place bot's advisor on the strategy board based on the priority and the current card.
   * @param board Strategy board
   * @param card Active card
   */
  public placeNextAdvisor(board : StrategyBoard, card : Card) : void {
    const nextAdvisorIndex = board.getPlacedAdvisorCount(Player.BOT)
    const advisorAction = this.getAdvisorAction(card, nextAdvisorIndex)
    
    const actionOrder = this.getActionOrder(advisorAction.action)
    for (const action of actionOrder) {
      const column = board.getColumn(action)
      if (this.placeAdvisorInColumn(board, column, advisorAction.advisor, advisorAction.coin ?? false)) {
        break;
      }
    }
  }

  /**
   * Put bot advisor in the first free slot of the column following the bot rules.
   * @return true if advisor was placed on strategy board
   */
  private placeAdvisorInColumn(board : StrategyBoard, column : StrategyBoardColumn, advisor : Advisor, coin: boolean) : boolean {
    if (!this.hasSlotAvailable(column)) {
      return false
    }
    const advisorStrength = StrategyBoard.getAdvisorStrength(advisor)
    for (const slot of column.slots) {
      const slotStrength = this.getSlotStrength(slot)
      // free slot, or advisor is stronger?
      if (slot.advisor == undefined || advisorStrength > slotStrength) {
        board.putAdvisor(slot.action, advisor, Player.BOT, 0)
        return true
      }
      // slot occupied by player with same advisor strength, do we have a coin to move him down?
      else if (slot.player == Player.PLAYER && advisorStrength==slotStrength && this._coins >= 1) {
        board.putAdvisor(slot.action, advisor, Player.BOT, 1)
        this._coins -= 1
        return true
      }
      // should we try to occupy the top slot at whatever cost?
      else if (coin) {
        const requiredCoins = slotStrength - advisorStrength + 1
        if (requiredCoins <= this._coins) {
          board.putAdvisor(slot.action, advisor, Player.BOT, requiredCoins)
          this._coins -= requiredCoins
          return true
        }
      }
    }
    return false
  }

  private getAdvisorAction(card : Card, advisorIndex : number) : AdvisorAction {
    const cardPriority = this.getCardPriority(card, this._actionPriority)
    const advisorsForRound = StrategyBoard.getAdvisorsForRound(this._round)
    // choose only from actions for advisors available this round
    const filteredActions = cardPriority.actions.filter(item => advisorsForRound.includes(item.advisor))
    return filteredActions[advisorIndex]
  }

  private getCardPriority(card : Card, actionPriority : ActionPriority) : CardPriority {
    const result = card.priorities.find(item => item.priority == actionPriority)
    if (!result) {
      throw new Error(`Invalid priority: ${actionPriority}`)
    }
    return result
  }

  private hasSlotAvailable(column : StrategyBoardColumn) {
    return column.slots.find(item => item.advisor == undefined) != undefined
  }

  private getSlotStrength(slot : StrategyBoardSlot) {
    if (slot.advisor) {
      return StrategyBoard.getAdvisorStrength(slot.advisor) + (slot.coins ?? 0)
    }
    return 0
  }

  private getActionOrder(preferredAction : Action) : Action[] {
    const actions = Object.values(Action)
    const index = actions.findIndex(item => item == preferredAction)
    if (index == 0) {
      return actions
    }
    else {
      return [...actions.slice(index),...actions.slice(0,index-1)]
    }
  }

}
