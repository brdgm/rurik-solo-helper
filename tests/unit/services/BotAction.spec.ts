import BotAction from '@/services/BotAction'
import { HouseholdMatBonusAction } from '@/services/HouseholdMat'
import Action from '@/services/enum/Action'
import BonusAction from '@/services/enum/BonusAction'
import SlotAction from "@/services/enum/SlotAction"
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'
import HouseholdMats from '@/services/HouseholdMats'

describe('BotAction', () => {
  it('getUnlockBonusActions', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 3)

    expect(bot.getBonusActions(Action.MUSTER).map(bonus)).to.eql([BonusAction.COIN_1])
    expect(bot.getBonusActions(Action.MOVE).map(bonus)).to.eql([])
    expect(bot.getBonusActions(Action.ATTACK).map(bonus)).to.eql([])
    expect(bot.getBonusActions(Action.TAX).map(bonus)).to.eql([BonusAction.TAX])
    expect(bot.getBonusActions(Action.BUILD).map(bonus)).to.eql([])
    expect(bot.getBonusActions(Action.SCHEME).map(bonus)).to.eql([])

    expect(bonus(bot.unlockNextBonusAction())).to.eq(BonusAction.SCHEME_REVEAL_LESS)
    expect(bonus(bot.unlockNextBonusAction())).to.eq(BonusAction.COIN_2)
    expect(bonus(bot.unlockNextBonusAction())).to.eq(BonusAction.MUSTER)
    expect(bonus(bot.unlockNextBonusAction())).to.eq(BonusAction.MOVE)
    expect(bonus(bot.unlockNextBonusAction())).to.eq(BonusAction.ATTACK)
    expect(bonus(bot.unlockNextBonusAction())).to.eq(BonusAction.BUILD)

    expect(bot.getBonusActions(Action.MUSTER).map(bonus)).to.eql([BonusAction.COIN_1,BonusAction.MUSTER])
    expect(bot.getBonusActions(Action.MOVE).map(bonus)).to.eql([BonusAction.MOVE])
    expect(bot.getBonusActions(Action.ATTACK).map(bonus)).to.eql([BonusAction.ATTACK,BonusAction.SCHEME_REVEAL_LESS])
    expect(bot.getBonusActions(Action.TAX).map(bonus)).to.eql([BonusAction.TAX])
    expect(bot.getBonusActions(Action.BUILD).map(bonus)).to.eql([BonusAction.BUILD])
    expect(bot.getBonusActions(Action.SCHEME).map(bonus)).to.eql([BonusAction.COIN_2])
  })

  it('executeAutomaticActions', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 3)

    expect(bot.getBonusActions(Action.ATTACK).map(bonus)).to.eql([])

    bot.executeAutomaticActions(SlotAction.SCHEME_2, [
      {action:Action.SCHEME,bonusAction:BonusAction.COIN_1},
      {action:Action.SCHEME,bonusAction:BonusAction.COIN_2}
    ])

    expect(bot.getBonusActions(Action.ATTACK).map(bonus)).to.eql([BonusAction.SCHEME_REVEAL_LESS])
    expect(bot.coins).to.eq(7)  // 3 + 1 for bonus reveal + 1+2 for bonus actions
  })

  it('executeAutomaticActions_coinCost', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 3)

    const allowAction = bot.executeAutomaticActions(SlotAction.ATTACK_1_COIN, [
      {action:Action.SCHEME,bonusAction:BonusAction.COIN_1}
    ])

    expect(allowAction).to.true
    expect(bot.coins).to.eq(3)  // 3 - 1 coin cost + 1 bonus action
  })

  it('executeAutomaticActions_coinCost_noCoinLeft', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 0)

    const allowAction = bot.executeAutomaticActions(SlotAction.ATTACK_1_COIN, [
      {action:Action.SCHEME,bonusAction:BonusAction.COIN_1}
    ])

    expect(allowAction).to.false
    expect(bot.coins).to.eq(2)  // 0 + instead of action + 1 bonus action
  })

  it('stealCoin', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 3)

    expect(bot.stealCoin()).to.true
    expect(bot.coins).to.eq(2)
  })

  it('stealCoin_noCoins', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 0)

    expect(bot.stealCoin()).to.false
    expect(bot.coins).to.eq(0)
  })

  it('giveCoin', () => {
    const bot = setupBot(DifficultyLevel.MEDIUM, 3)

    bot.giveCoin()
    expect(bot.coins).to.eq(4)
  })

})

function setupBot(difficultyLevel : DifficultyLevel, botCoins : number) {
  const householdMat = HouseholdMats.get(difficultyLevel)
  return new BotAction(difficultyLevel, botCoins, householdMat.priorities)
}

function bonus(bonusAction : HouseholdMatBonusAction | undefined) {
  return bonusAction ? bonusAction.bonusAction : undefined
}
