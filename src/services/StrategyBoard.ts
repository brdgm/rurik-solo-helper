import { StrategyBoardColumn, StrategyBoardPersistence, StrategyBoardSlot } from '@/store/state'
import Action from './enum/Action'
import Advisor from './enum/Advisor'
import Player from './enum/Player'
import Round from './enum/Round'
import SlotAction from './enum/SlotAction'
import { remove, cloneDeep } from 'lodash'
import findMandatory from '@brdgm/brdgm-commons/src/util/array/findMandatory'
import TranslatableError from '@brdgm/brdgm-commons/src/util/error/TranslatableError'

export default class StrategyBoard {

  private _columns : StrategyBoardColumn[]
  private _playerAdvisorReserve : Advisor[]
  private _botAdvisorReserve : Advisor[]

  private static ADVISOR_LOOKUP_ORDER = [
    [Advisor.ONE],
    [Advisor.TWO,Advisor.TWO_PLUS],
    [Advisor.THREE_PLUS],
    [Advisor.FOUR],
    [Advisor.FIVE],
  ]

  public constructor(columns : StrategyBoardColumn[],
      playerAdvisorReserve : Advisor[], botAdvisorReserve : Advisor[]) {
    this._columns = columns
    this._playerAdvisorReserve = playerAdvisorReserve
    this._botAdvisorReserve = botAdvisorReserve
  }

  public get playerAdvisorReserve() : readonly Advisor[] {
    return this._playerAdvisorReserve
  }

  public get botAdvisorReserve() : readonly Advisor[] {
    return this._botAdvisorReserve
  }

  /**
   * Get whole strategy board in rows and columns
   */
  public getRows() : StrategyBoardSlot[][] {
    const rows : StrategyBoardSlot[][] = []
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row : StrategyBoardSlot[] = []
      for (const column of this._columns) {
        row.push(column.slots[rowIndex])
      }
      rows.push(row)
    }
    return rows
  }

  /**
   * Get strategy board column.
   * @param action Action
   * @returns Column
   */
  public getColumn(action : Action) : StrategyBoardColumn {
    return findMandatory(this._columns, column => column.action == action)
  }

  /**
   * Puts an advisor to a slot on strategy board.
   */
  public putAdvisor(action : SlotAction, advisor : Advisor, player : Player, coins : number) : void {
    // find column for slot action
    const column = findMandatory(this._columns, c => c.slots.find(s => s.action==action) != undefined)
    // validate: player may put another advisor in same column, if placed already any in three diffferent columns
    if (player == Player.PLAYER && this.playerHasAdvisorInColumn(column) && !this.playerHasAdvisorThreeDifferentColumns()) {
      throw new TranslatableError('You have to place advisor in three different columns before you can place another one here.',
          'strategy.error.playerThreeDifferentColumns')
    }
    // find first empty slot, or slot where this advisor with his coins is stronger
    const slot = column.slots.find(s => !s.advisor || 
        StrategyBoard.getAdvisorStrength(s.advisor, s.coins) < StrategyBoard.getAdvisorStrength(advisor, coins))
    if (!slot) {
      throw new Error(`No avaiable slot in column: ${column.action} for advisor ${advisor} with ${coins} coins.`)
    }
    if (slot.advisor != undefined) {
      // if slot is occupied, move other advisors down
      this.moveDownAdvisor(slot.action, advisor, coins)
    }
    slot.advisor = advisor
    slot.player = player
    slot.coins = coins
    if (player == Player.PLAYER) {
      remove(this._playerAdvisorReserve, item => item == advisor)
    }
    else {
      remove(this._botAdvisorReserve, item => item == advisor)
    }
  }

  private playerHasAdvisorInColumn(column : StrategyBoardColumn) {
    return column.slots.find(slot => slot.player == Player.PLAYER)
  }

  private playerHasAdvisorThreeDifferentColumns() {
    return this._columns
        .filter(column => this.playerHasAdvisorInColumn(column))
        .length >= 3
  }

  /**
   * Find next available advisor action(s) to play. In case of advisor #2 it may be two advisors. First advisor returned is that of the left-most column.
   */
  public findNextAdvisorActions(player : Player) : StrategyBoardSlot[] {
    for (const advisors of StrategyBoard.ADVISOR_LOOKUP_ORDER) {
      const slots = this.findSlots(slot => slot.advisor != undefined && advisors.includes(slot.advisor) && slot.player == player)
      if (slots.length > 0) {
        return slots
      }
    }
    return []
  }

  /**
   * Removes advisor from strategy board.
   */
  public removeAdvisor(advisor : Advisor, player : Player) : void {
    const slots = this.findSlots(item => item.advisor == advisor && item.player == player)
    if (slots.length != 1) {
      throw new Error(`Found ${slots.length} slots for advisor ${advisor}  (player=${player})`)
    }
    const slot = slots[0]
    slot.advisor = undefined
    slot.player = undefined
    slot.coins = undefined
  }

  findSlots(accept: (slot : StrategyBoardSlot) => boolean) : StrategyBoardSlot[] {
    const result : StrategyBoardSlot[] = []
    for (const column of this._columns) {
      for (const slot of column.slots) {
        if (accept(slot)) {
          result.push(slot)
        }
      }
    }
    return result
  }

  private moveDownAdvisor(action : SlotAction, newAdvisor : Advisor, newCoins : number) : void {
    for (const column of this._columns) {
      const lastRow = column.slots.length - 1
      for (let row = 0; row<=lastRow; row++) {
        const slot = column.slots[row]
        if (slot.action == action) {
          if (slot.advisor == undefined || slot.coins == undefined) {
            throw new Error(`No advisor to move down for slot action ${action}`)
          }
          if (row == lastRow) {
            throw new TranslatableError(`Advisor for slot action ${action} is already on last row.`, 'strategy.error.columnFull')
          }
          const newStrength = StrategyBoard.getAdvisorStrength(newAdvisor,  newCoins)
          const existingStrength = StrategyBoard.getAdvisorStrength(slot.advisor, slot.coins)
          if (newStrength <= existingStrength) {
            const requiredCoins = existingStrength + 1 - StrategyBoard.getAdvisorStrength(newAdvisor)
            throw new TranslatableError(`Strength of advisor ${newAdvisor}+${newCoins} `
                + ` is not greater than ${slot.advisor}+${slot.coins}.`,
                'strategy.error.notEnoughCoins', { 'requiredCoins': requiredCoins }, requiredCoins)
          }
          const nextSlot = column.slots[row+1]
          if (nextSlot.advisor != undefined && nextSlot.coins != undefined) {
            this.moveDownAdvisor(nextSlot.action, slot.advisor, slot.coins)
          }
          nextSlot.advisor = slot.advisor
          nextSlot.player = slot.player
          nextSlot.coins = slot.coins
          slot.advisor = undefined
          slot.player = undefined
          slot.coins = undefined
          return
        }
      }
    }
  }

  /**
   * Counts how many advisors are placed on the strategy board.
   * @param player Player or bot
   * @returns Number of advisors
   */
  public getPlacedAdvisorCount(player : Player) : number {
    return this.findSlots(slot => slot.advisor != undefined && slot.player == player).length
  }

  /**
   * Gets persistence view of strategy board.
   */
  public toPersistence() : StrategyBoardPersistence {
    return {
      columns: this._columns,
      playerAdvisorReserve: this._playerAdvisorReserve,
      botAdvisorReserve: this._botAdvisorReserve
    }
  }

  /**
   * Creates a new, empty strategy board.
   */
  public static new(round : number) : StrategyBoard {
    const columns = [
      {
        action: Action.MUSTER,
        slots: [
          { action: SlotAction.MUSTER_3 },
          { action: SlotAction.MUSTER_2 },
          { action: SlotAction.MUSTER_1_COIN }
        ]
      },
      {
        action: Action.MOVE,
        slots: [
          { action: SlotAction.MOVE_3 },
          { action: SlotAction.MOVE_2 },
          { action: SlotAction.MOVE_1 }
        ]
      },
      {
        action: Action.ATTACK,
        slots: [
          { action: SlotAction.ATTACK_2 },
          { action: SlotAction.ATTACK_1 },
          { action: SlotAction.ATTACK_1_COIN }
        ]
      },
      {
        action: Action.TAX,
        slots: [
          { action: SlotAction.TAX_2 },
          { action: SlotAction.TAX_1 },
          { action: SlotAction.TAX_1_COIN }
        ]
      },
      {
        action: Action.BUILD,
        slots: [
          { action: SlotAction.BUILD_2 },
          { action: SlotAction.BUILD_1 },
          { action: SlotAction.BUILD_1_COIN }
        ]
      },
      {
        action: Action.SCHEME,
        slots: [
          { action: SlotAction.SCHEME_3 },
          { action: SlotAction.SCHEME_2 },
          { action: SlotAction.SCHEME_1 }
        ]
      },
    ]
    const playerAdvisorReserve = StrategyBoard.getAdvisorsForRound(round)
    const botAdvisorReserve = StrategyBoard.getAdvisorsForRound(round)
    return new StrategyBoard(columns, playerAdvisorReserve, botAdvisorReserve)
  }

  /**
   * Re-creates a strategy board from persistence.
   */
  public static fromPersistence(persistence : StrategyBoardPersistence) : StrategyBoard {
    // deep copy of data structures
    const columns = cloneDeep(persistence.columns)
    const playerAdvisorReserve = cloneDeep(persistence.playerAdvisorReserve)
    const botAdvisorReserve = cloneDeep(persistence.botAdvisorReserve)
    return new StrategyBoard(columns, playerAdvisorReserve, botAdvisorReserve)
  }

  /**
   * Get strength of advisor (from 1..5).
   */
  public static getAdvisorStrength(advisor : Advisor, coins? : number) : number {
    for (let i=0; i<StrategyBoard.ADVISOR_LOOKUP_ORDER.length;i++) {
      if (StrategyBoard.ADVISOR_LOOKUP_ORDER[i].includes(advisor)) {
        return i + 1 + (coins ?? 0)
      }
    }
    throw new Error("Invalid advisor: " + advisor)
  }

  /**
   * Get available advisors for current round.
   */
  public static getAdvisorsForRound(round: number) : Advisor[] {
    const advisors = []
    advisors.push(Advisor.ONE)
    advisors.push(Advisor.TWO)
    if (round == Round.THREE || round == Round.FOUR) {
      advisors.push(Advisor.TWO_PLUS)
    }
    if (round == Round.FOUR) {
      advisors.push(Advisor.THREE_PLUS)
    }
    advisors.push(Advisor.FOUR)
    advisors.push(Advisor.FIVE)
    return advisors
  }

}
