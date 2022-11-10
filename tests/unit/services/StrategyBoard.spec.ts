import Action from '@/services/enum/Action'
import Advisor from '@/services/enum/Advisor'
import Player from '@/services/enum/Player'
import Round from '@/services/enum/Round'
import SlotAction from '@/services/enum/SlotAction'
import StrategyBoard from '@/services/StrategyBoard'
import { StrategyBoardColumn, StrategyBoardSlot } from '@/store'
import { expect } from 'chai'

describe('StrategyBoard', () => {

  it('newColumns', () => {
    const board = StrategyBoard.new(Round.ONE)

    const persistence = board.toPersistence()
    expect(persistence.columns.length).to.eq(6)
    assertColumn(persistence.columns[0], Action.MUSTER, [SlotAction.MUSTER_3,SlotAction.MUSTER_2,SlotAction.MUSTER_1_COIN])
    assertColumn(persistence.columns[1], Action.MOVE, [SlotAction.MOVE_3,SlotAction.MOVE_2,SlotAction.MOVE_1])
    assertColumn(persistence.columns[2], Action.ATTACK, [SlotAction.ATTACK_2,SlotAction.ATTACK_1,SlotAction.ATTACK_1_COIN])
    assertColumn(persistence.columns[3], Action.TAX, [SlotAction.TAX_2,SlotAction.TAX_1,SlotAction.TAX_1_COIN])
    assertColumn(persistence.columns[4], Action.BUILD, [SlotAction.BUILD_2,SlotAction.BUILD_1,SlotAction.BUILD_1_COIN])
    assertColumn(persistence.columns[5], Action.SCHEME, [SlotAction.SCHEME_3,SlotAction.SCHEME_2,SlotAction.SCHEME_1])

    const rows = board.getRows()
    expect(rows.length).to.eq(3)
    assertRow(rows[0], [SlotAction.MUSTER_3,SlotAction.MOVE_3,SlotAction.ATTACK_2,SlotAction.TAX_2,SlotAction.BUILD_2,SlotAction.SCHEME_3])
    assertRow(rows[1], [SlotAction.MUSTER_2,SlotAction.MOVE_2,SlotAction.ATTACK_1,SlotAction.TAX_1,SlotAction.BUILD_1,SlotAction.SCHEME_2])
    assertRow(rows[2], [SlotAction.MUSTER_1_COIN,SlotAction.MOVE_1,SlotAction.ATTACK_1_COIN,SlotAction.TAX_1_COIN,SlotAction.BUILD_1_COIN,SlotAction.SCHEME_1])
  })

  it('advisorsRound1', () => {
    const board = StrategyBoard.new(Round.ONE)

    const expectedAdvisors = [Advisor.ONE,Advisor.TWO,Advisor.FOUR,Advisor.FIVE]
    expect(board.playerAdvisorReserve).to.eql(expectedAdvisors)
    expect(board.botAdvisorReserve).to.eql(expectedAdvisors)
  })

  it('advisorsRound2', () => {
    const board = StrategyBoard.new(Round.TWO)

    const expectedAdvisors = [Advisor.ONE,Advisor.TWO,Advisor.FOUR,Advisor.FIVE]
    expect(board.playerAdvisorReserve).to.eql(expectedAdvisors)
    expect(board.botAdvisorReserve).to.eql(expectedAdvisors)
  })

  it('advisorsRound3', () => {
    const board = StrategyBoard.new(Round.THREE)

    const expectedAdvisors = [Advisor.ONE,Advisor.TWO,Advisor.TWO_PLUS,Advisor.FOUR,Advisor.FIVE]
    expect(board.playerAdvisorReserve).to.eql(expectedAdvisors)
    expect(board.botAdvisorReserve).to.eql(expectedAdvisors)
  })

  it('advisorsRound4', () => {
    const board = StrategyBoard.new(Round.FOUR)

    const expectedAdvisors = [Advisor.ONE,Advisor.TWO,Advisor.TWO_PLUS,Advisor.THREE_PLUS,Advisor.FOUR,Advisor.FIVE]
    expect(board.playerAdvisorReserve).to.eql(expectedAdvisors)
    expect(board.botAdvisorReserve).to.eql(expectedAdvisors)
  })

  it('putFindRemoveAdvisors', () => {
    const board = StrategyBoard.new(Round.FOUR)

    board.putAdvisor(SlotAction.ATTACK_2, Advisor.ONE, Player.PLAYER, 2)
    board.putAdvisor(SlotAction.ATTACK_2, Advisor.FOUR, Player.BOT, 0)  // other moved to ATTACK_1
    board.putAdvisor(SlotAction.TAX_2, Advisor.FIVE, Player.PLAYER, 0)
    expect(board.getPlacedAdvisorCount(Player.PLAYER)).to.eq(2)
    expect(board.getPlacedAdvisorCount(Player.BOT)).to.eq(1)
    board.putAdvisor(SlotAction.MUSTER_3, Advisor.TWO_PLUS, Player.BOT, 0)
    board.putAdvisor(SlotAction.MUSTER_3, Advisor.TWO, Player.PLAYER, 1)  // other moved to MUSTER_2
    board.putAdvisor(SlotAction.SCHEME_3, Advisor.TWO, Player.BOT, 0)
    board.putAdvisor(SlotAction.ATTACK_1_COIN, Advisor.THREE_PLUS, Player.PLAYER, 0)
    board.putAdvisor(SlotAction.MUSTER_1_COIN, Advisor.ONE, Player.BOT, 0)
    board.putAdvisor(SlotAction.SCHEME_3, Advisor.FOUR, Player.PLAYER, 0)  // other moved to SCHEME_2
    board.putAdvisor(SlotAction.BUILD_2, Advisor.THREE_PLUS, Player.BOT, 0)
    board.putAdvisor(SlotAction.BUILD_1, Advisor.TWO_PLUS, Player.PLAYER, 0)
    board.putAdvisor(SlotAction.MOVE_3, Advisor.FIVE, Player.BOT, 0)

    expect(board.getPlacedAdvisorCount(Player.PLAYER)).to.eq(6)
    expect(board.getPlacedAdvisorCount(Player.BOT)).to.eq(6)

    // player: 1: ATTACK_1, 2: MUSTER_3, 2+: BUILD_1, 3+: ATTACK_1_COIN, 4: SCHEME_3, 5: TAX_2
    // bot: 1: MUSTER_1_COIN, 2: SCHEME_2, 2+: MUSTER_2, 3+: BUILD_2, 4: ATTACK_2, 5: MOVE_3

    assertSingleAction(board.findNextAdvisorActions(Player.PLAYER), Advisor.ONE, SlotAction.ATTACK_1)
    board.removeAdvisor(Advisor.ONE, Player.PLAYER)
    assertSingleAction(board.findNextAdvisorActions(Player.BOT), Advisor.ONE, SlotAction.MUSTER_1_COIN)
    board.removeAdvisor(Advisor.ONE, Player.BOT)
    assertDoubleAction(board.findNextAdvisorActions(Player.PLAYER), Advisor.TWO, SlotAction.MUSTER_3, Advisor.TWO_PLUS, SlotAction.BUILD_1)
    board.removeAdvisor(Advisor.TWO_PLUS, Player.PLAYER)
    assertDoubleAction(board.findNextAdvisorActions(Player.BOT), Advisor.TWO_PLUS, SlotAction.MUSTER_2, Advisor.TWO, SlotAction.SCHEME_2)
    board.removeAdvisor(Advisor.TWO_PLUS, Player.BOT)
    assertSingleAction(board.findNextAdvisorActions(Player.PLAYER), Advisor.TWO, SlotAction.MUSTER_3)
    board.removeAdvisor(Advisor.TWO, Player.PLAYER)
    assertSingleAction(board.findNextAdvisorActions(Player.BOT), Advisor.TWO, SlotAction.SCHEME_2)
    board.removeAdvisor(Advisor.TWO, Player.BOT)
    assertSingleAction(board.findNextAdvisorActions(Player.PLAYER), Advisor.THREE_PLUS, SlotAction.ATTACK_1_COIN)
    board.removeAdvisor(Advisor.THREE_PLUS, Player.PLAYER)
    assertSingleAction(board.findNextAdvisorActions(Player.BOT), Advisor.THREE_PLUS, SlotAction.BUILD_2)
    board.removeAdvisor(Advisor.THREE_PLUS, Player.BOT)
    assertSingleAction(board.findNextAdvisorActions(Player.PLAYER), Advisor.FOUR, SlotAction.SCHEME_3)
    board.removeAdvisor(Advisor.FOUR, Player.PLAYER)
    assertSingleAction(board.findNextAdvisorActions(Player.BOT), Advisor.FOUR, SlotAction.ATTACK_2)
    board.removeAdvisor(Advisor.FOUR, Player.BOT)
    assertSingleAction(board.findNextAdvisorActions(Player.PLAYER), Advisor.FIVE, SlotAction.TAX_2)
    board.removeAdvisor(Advisor.FIVE, Player.PLAYER)
    assertSingleAction(board.findNextAdvisorActions(Player.BOT), Advisor.FIVE, SlotAction.MOVE_3)
    board.removeAdvisor(Advisor.FIVE, Player.BOT)

    expect(board.findNextAdvisorActions(Player.PLAYER).length).to.eq(0)
    expect(board.findNextAdvisorActions(Player.BOT).length).to.eq(0)

    expect(board.getPlacedAdvisorCount(Player.PLAYER)).to.eq(0)
    expect(board.getPlacedAdvisorCount(Player.BOT)).to.eq(0)
  })
})

it('advisorsRound1_HigherAdvisorMovesOthersDownInColumn', () => {
  const board = StrategyBoard.new(Round.ONE)

  board.putAdvisor(SlotAction.MUSTER_3, Advisor.TWO, Player.BOT, 0)
  board.putAdvisor(SlotAction.MUSTER_2, Advisor.FIVE, Player.PLAYER, 0)

  assertSlot(board.getColumn(Action.MUSTER).slots[0], Advisor.FIVE, Player.PLAYER)
  assertSlot(board.getColumn(Action.MUSTER).slots[1], Advisor.TWO, Player.BOT)
})

it('advisorsRound2_HigherAdvisorMovesOthersDownInColumn', () => {
  const board = StrategyBoard.new(Round.TWO)

  board.putAdvisor(SlotAction.ATTACK_2, Advisor.FOUR, Player.PLAYER, 0)
  board.putAdvisor(SlotAction.ATTACK_1, Advisor.TWO, Player.BOT, 3)
  board.putAdvisor(SlotAction.ATTACK_1_COIN, Advisor.FIVE, Player.PLAYER, 1)

  assertSlot(board.getColumn(Action.ATTACK).slots[0], Advisor.FIVE, Player.PLAYER, 1)
  assertSlot(board.getColumn(Action.ATTACK).slots[1], Advisor.TWO, Player.BOT, 3)
  assertSlot(board.getColumn(Action.ATTACK).slots[2], Advisor.FOUR, Player.PLAYER)
})

function assertColumn(column : StrategyBoardColumn, action : Action, actions : SlotAction[]) : void {
  expect(column.action).to.eq(action)
  expect(column.slots.map(slot => slot.action)).to.eql(actions)
}

function assertRow(row : StrategyBoardSlot[], actions : SlotAction[]) : void {
  expect(row.map(slot => slot.action)).to.eql(actions)
}

function assertSingleAction(slots : StrategyBoardSlot[], advisor : Advisor, action : SlotAction) {
  expect(slots.length).to.eq(1)
  const slot = slots[0]
  expect(slot.advisor).to.eq(advisor)
  expect(slot.action).to.eq(action)
}

function assertDoubleAction(slots : StrategyBoardSlot[], advisor1 : Advisor, action1 : SlotAction,
    advisor2 : Advisor, action2 : SlotAction) {
  expect(slots.length).to.eq(2)
  const slot1 = slots[0]
  expect(slot1.advisor).to.eq(advisor1)
  expect(slot1.action).to.eq(action1)
  const slot2 = slots[1]
  expect(slot2.advisor).to.eq(advisor2)
  expect(slot2.action).to.eq(action2)
}

function assertSlot(slot : StrategyBoardSlot, advisor? : Advisor, player? : Player, coins? : number) {
  expect(slot.advisor).to.eq(advisor, `advisor slot ${slot.action}`)
  expect(slot.player).to.eq(player, `player slot ${slot.action}`)
  expect(slot.coins).to.eq(coins ?? 0, `coins slot ${slot.action}`)
}
