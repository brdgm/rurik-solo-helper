import Bot from '@/services/BotStrategy'
import Cards from '@/services/Cards'
import ActionPriority from '@/services/enum/ActionPriority'
import Advisor from '@/services/enum/Advisor'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import Round from '@/services/enum/Round'
import SlotAction from '@/services/enum/SlotAction'
import StrategyBoard from '@/services/StrategyBoard'
import { expect } from 'chai'

describe('BotStrategy', () => {
  it('placeNextAdvisor_level1_card1', () => {
    const board = StrategyBoard.new(Round.ONE)
    const card = Cards.get(1)
    const bot = new Bot(DifficultyLevel.EASY, 1, ActionPriority.BUILD, 3)

    expect(bot.coins).to.eq(3)

    bot.placeNextAdvisor(board, card)
    assertSlotBot(board, SlotAction.MUSTER_3, Advisor.FOUR, 0)

    board.putAdvisor(SlotAction.SCHEME_3, Advisor.ONE, Player.PLAYER, 0)

    bot.placeNextAdvisor(board, card)
    assertSlotBot(board, SlotAction.SCHEME_3, Advisor.ONE, 1)

    board.putAdvisor(SlotAction.BUILD_2, Advisor.FIVE, Player.PLAYER, 1)

    bot.placeNextAdvisor(board, card)
    assertSlotBot(board, SlotAction.BUILD_2, Advisor.FIVE, 2)

    board.putAdvisor(SlotAction.MOVE_3, Advisor.TWO, Player.PLAYER, 0)

    bot.placeNextAdvisor(board, card)
    assertSlotBot(board, SlotAction.MOVE_2, Advisor.TWO, 0)

    expect(bot.coins).to.eq(0)
  })

  it('placeNextAdvisor_level1_card1_fullColumn_right', () => {
    const board = StrategyBoard.new(Round.ONE)
    const card = Cards.get(1)
    const bot = new Bot(DifficultyLevel.EASY, 1, ActionPriority.BUILD, 3)

    board.putAdvisor(SlotAction.MUSTER_3, Advisor.FIVE, Player.PLAYER, 0)
    board.putAdvisor(SlotAction.MUSTER_2, Advisor.FOUR, Player.PLAYER, 0)
    board.putAdvisor(SlotAction.MUSTER_1_COIN, Advisor.TWO, Player.PLAYER, 0)

    bot.placeNextAdvisor(board, card)
    assertSlotBot(board, SlotAction.MOVE_3, Advisor.FOUR, 0)
  })

  it('placeNextAdvisor_level1_card15_fullColumn_left', () => {
    const board = StrategyBoard.new(Round.ONE)
    const card = Cards.get(15)
    const bot = new Bot(DifficultyLevel.EASY, 1, ActionPriority.BUILD, 3)

    board.putAdvisor(SlotAction.SCHEME_3, Advisor.FIVE, Player.PLAYER, 0)
    board.putAdvisor(SlotAction.SCHEME_2, Advisor.FOUR, Player.PLAYER, 0)
    board.putAdvisor(SlotAction.SCHEME_1, Advisor.TWO, Player.PLAYER, 0)

    bot.placeNextAdvisor(board, card)
    assertSlotBot(board, SlotAction.MUSTER_3, Advisor.ONE, 0)
  })
})

function assertSlotBot(board : StrategyBoard, slotAction : SlotAction, advisor : Advisor, coins : number) : void {
  const slot = board.findSlots(item => item.action == slotAction)[0]
  expect(slot.player, 'player on ' + slotAction).to.eq(Player.BOT)
  expect(slot.advisor, 'advisor on ' + slotAction).to.eq(advisor)
  expect(slot.coins, 'coins on ' + slotAction).to.eq(coins)
}
