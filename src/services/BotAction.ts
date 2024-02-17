import DifficultyLevel from './enum/DifficultyLevel'
import HouseholdMat, { HouseholdMatBonusAction, HouseholdMatPriority } from './HouseholdMat'
import HouseholdMats from './HouseholdMats'
import { cloneDeep } from 'lodash'
import ActionPriority from './enum/ActionPriority'
import Action from './enum/Action'
import findMandatory from 'brdgm-commons/src/util/array/findMandatory'
import BonusAction from './enum/BonusAction'
import SlotAction from './enum/SlotAction'
import SlotActionMappings from './SlotActionMappings'

/**
 * Bot implementation for execution actions.
 */
export default class BotAction {

  private _householdMat : HouseholdMat
  private _actionPriority : ActionPriority
  private _bonusActions : HouseholdMatPriority[]
  private _coins : number

  public constructor(difficultyLevel : DifficultyLevel, coins : number, bonusActions : HouseholdMatPriority[]) {
    this._householdMat = HouseholdMats.get(difficultyLevel)
    this._actionPriority = this._householdMat.startingPriority
    this._bonusActions = cloneDeep(bonusActions)
    this._coins = coins
  }

  public get coins() : number {
    return this._coins
  }

  public get bonusActions() : HouseholdMatPriority[] {
    return this._bonusActions
  }

  /**
   * Gets all unlocked bonus action for the given action.
   * @param action Action
   * @returns Unlocked bonus actions
   */
  public getBonusActions(action : Action) : HouseholdMatBonusAction[] {
    return this._bonusActions.flatMap(column => column.bonusActions
        .filter(item => item.action == action && !(item.locked ?? false))
    )
  }

  /**
   * Unlocks next bonus action (usually as part of a scheme action).
   * @returns Bonus action or undefine if all are unlocked already
   */
  public unlockNextBonusAction() : HouseholdMatBonusAction | undefined {
    // find next unlocked bonus action in current priority
    const currentPriorityBonusActions = findMandatory(this._bonusActions, item => item.priority==this._actionPriority)
    const lockedItemCurrentPriority = currentPriorityBonusActions.bonusActions.find(item => item.locked)
    if (lockedItemCurrentPriority) {
      lockedItemCurrentPriority.locked = undefined
      this._coins += 1
      return lockedItemCurrentPriority
    }

    // otherwise find next unlocked bonus action starting in leftmost column
    for (const column of this._bonusActions) {
      const lockedItemLeftmost = column.bonusActions.find(item => item.locked)
      if (lockedItemLeftmost) {
        lockedItemLeftmost.locked = undefined
        this._coins += 1
        return lockedItemLeftmost
      }
    }

    // nothing to unlock
    return undefined
  }

  /**
   * Evaluate the given action and executes automatically what is possible.
   * Namely, further bonus actions are unlocked for scheme actions and coins from bonus actions may be earned.
   * @param slotAction Slot action
   * @param bonusActions Bonus actions
   * @return true if the bot can executed the main action. This is false if the main action has a coin cost, and the bot cannot pay this cost.
   */
  public executeAutomaticActions(slotAction : SlotAction, bonusActions : HouseholdMatBonusAction[]) : boolean {
    let canExecuteMainAction = true
    if (this.hasCoinCost(slotAction)) {
      if (this._coins > 1) {
        this._coins--  // pay coin cost
      }
      else {
        canExecuteMainAction = false
        this._coins++  // get a coin instead of executing the main action
      }
    }

    const slotActionMapping = SlotActionMappings.get(slotAction)
    if (slotActionMapping.action == Action.SCHEME) {
      this.unlockNextBonusAction()
    }
    for (const bonusAction of bonusActions) {
      switch (bonusAction.bonusAction) {
        case BonusAction.COIN_1:
          this._coins += 1
          break;
        case BonusAction.COIN_2:
          this._coins += 2
          break;
        default:
          // no automatic action
      }
    }

    return canExecuteMainAction
  }

  private hasCoinCost(slotAction : SlotAction) : boolean {
    switch (slotAction) {
      case SlotAction.MUSTER_1_COIN:
      case SlotAction.ATTACK_1_COIN:
      case SlotAction.TAX_1_COIN:
      case SlotAction.BUILD_1_COIN:
        return true;
      default:
        return false;
    }
  }

  /**
   * Steal 1 coin from bot (e.g. when attacking with Boris leader).
   * @return true if steal was successful (bot had at least one coin)
   */
  public stealCoin() : boolean {
    if (this._coins > 0) {
      this._coins--
      return true
    }
    else {
      return false
    }
  }

  /**
   * Give 1 coin to bot (e.g. from warfare bonus).
   */
   public giveCoin() : void {
     this._coins++
   }

}
