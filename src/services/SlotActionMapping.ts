import Action from "./enum/Action"
import SlotAction from "./enum/SlotAction"

export default interface SlotActionInfo {
  slotAction: SlotAction
  action: Action
  count: number
  coins: number
}
