import Action from './enum/Action'
import DifficultyLevel from './enum/DifficultyLevel'
import BonusAction from './enum/BonusAction'
import ActionPriority from './enum/ActionPriority'

export default interface HouseholdMat {
  difficultyLevel: DifficultyLevel
  startingPriority: ActionPriority
  priorities: HouseholdMatPriority[]
}

export interface HouseholdMatPriority {
  priority: ActionPriority
  bonusActions: HouseholdMatBonusAction[]
}

export interface HouseholdMatBonusAction {
  action: Action
  bonusAction: BonusAction
  locked?: boolean
}
