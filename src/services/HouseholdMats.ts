import findMandatoryMap from "@/util/findMandatoryMap"
import Action from "./enum/Action"
import DifficultyLevel from "./enum/DifficultyLevel"
import BonusAction from "./enum/BonusAction"
import ActionPriority from "./enum/ActionPriority"
import HouseholdMat from "./HouseholdMat"

const householdMats = [
  {
    difficultyLevel: DifficultyLevel.EASY,
    startingPriority: ActionPriority.BUILD,
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        bonusActions: [
          { action: Action.BUILD, bonusAction: BonusAction.BUILD, locked: true },
          { action: Action.ATTACK, bonusAction: BonusAction.SCHEME_REVEAL_LESS, locked: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        bonusActions: [
          { action: Action.MUSTER, bonusAction: BonusAction.MUSTER },
          { action: Action.ATTACK, bonusAction: BonusAction.ATTACK, locked: true },
          { action: Action.MOVE,  bonusAction: BonusAction.MOVE, locked: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        bonusActions: [
          { action: Action.TAX, bonusAction: BonusAction.TAX, locked: true },
          { action: Action.SCHEME, bonusAction: BonusAction.COIN_2, locked: true },
        ]
      },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.MEDIUM,
    startingPriority: ActionPriority.TAX,
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        bonusActions: [
          { action: Action.MOVE, bonusAction: BonusAction.MOVE, locked: true },
          { action: Action.ATTACK, bonusAction: BonusAction.ATTACK, locked: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        bonusActions: [
          { action: Action.MUSTER, bonusAction: BonusAction.COIN_1 },
          { action: Action.BUILD, bonusAction: BonusAction.BUILD, locked: true },
          { action: Action.ATTACK, bonusAction: BonusAction.MOVE, locked: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        bonusActions: [
          { action: Action.TAX, bonusAction: BonusAction.TAX },
          { action: Action.ATTACK, bonusAction: BonusAction.SCHEME_REVEAL_LESS, locked: true },
          { action: Action.SCHEME, bonusAction: BonusAction.COIN_2, locked: true },
          { action: Action.MUSTER, bonusAction: BonusAction.MUSTER, locked: true },
        ]
      },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.HARD,
    startingPriority: ActionPriority.ATTACK_MOVE,
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        bonusActions: [
          { action: Action.MUSTER, bonusAction: BonusAction.MOVE },
          { action: Action.ATTACK, bonusAction: BonusAction.SCHEME_REVEAL_LESS, locked: true },
          { action: Action.MOVE, bonusAction: BonusAction.MOVE, locked: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        bonusActions: [
          { action: Action.ATTACK, bonusAction: BonusAction.ATTACK },
          { action: Action.BUILD, bonusAction: BonusAction.BUILD, locked: true },
          { action: Action.TAX, bonusAction: BonusAction.TAX, locked: true },
          { action: Action.ATTACK, bonusAction: BonusAction.ATTACK, locked: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        bonusActions: [
          { action: Action.TAX, bonusAction: BonusAction.TAX, locked: true },
          { action: Action.BUILD, bonusAction: BonusAction.MOVE, locked: true },
          { action: Action.SCHEME, bonusAction: BonusAction.COIN_2, locked: true },
        ]
      },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.VERY_HARD,
    startingPriority: ActionPriority.BUILD,
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        bonusActions: [
          { action: Action.ATTACK, bonusAction: BonusAction.SCHEME_REVEAL_LESS },
          { action: Action.ATTACK, bonusAction: BonusAction.ATTACK, locked: true },
          { action: Action.BUILD, bonusAction: BonusAction.MOVE, locked: true },
          { action: Action.MUSTER, bonusAction: BonusAction.MUSTER, locked: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        bonusActions: [
          { action: Action.BUILD, bonusAction: BonusAction.BUILD },
          { action: Action.ATTACK, bonusAction: BonusAction.MOVE, locked: true },
          { action: Action.TAX, bonusAction: BonusAction.TAX, locked: true },
          { action: Action.ATTACK, bonusAction: BonusAction.ATTACK, locked: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        bonusActions: [
          { action: Action.MUSTER, bonusAction: BonusAction.MOVE },
          { action: Action.TAX, bonusAction: BonusAction.TAX, locked: true },
          { action: Action.SCHEME, bonusAction: BonusAction.COIN_2, locked: true },
          { action: Action.MOVE, bonusAction: BonusAction.MOVE, locked: true },
        ]
      },
    ]
  },
]

const householdMatsMap = new Map<DifficultyLevel,HouseholdMat>()
householdMats.forEach(mat => householdMatsMap.set(mat.difficultyLevel, mat))

export default {

  /**
   * Get household mat by difficulty level
   * @param level Difficulty level
   * @returns Household mat
   */
  get(level: DifficultyLevel) : HouseholdMat {
    return findMandatoryMap(householdMatsMap, level)
  },

  /**
   * Get standard action cards
   * @returns cards
   */
  getAll() : HouseholdMat[] {
    return householdMats
  },

}
