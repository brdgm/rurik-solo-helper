import findMandatory from "brdgm-commons/src/util/map/findMandatory";
import SlotActionMapping from "./SlotActionMapping";
import Action from "./enum/Action";
import SlotAction from "./enum/SlotAction";

const mappings = [
  {
    slotAction: SlotAction.MUSTER_3,
    action: Action.MUSTER,
    count: 3,
    coins: 0
  },
  {
    slotAction: SlotAction.MUSTER_2,
    action: Action.MUSTER,
    count: 2,
    coins: 0
  },
  {
    slotAction: SlotAction.MUSTER_1_COIN,
    action: Action.MUSTER,
    count: 1,
    coins: 1
  },
  {
    slotAction: SlotAction.MOVE_3,
    action: Action.MOVE,
    count: 3,
    coins: 0
  },
  {
    slotAction: SlotAction.MOVE_2,
    action: Action.MOVE,
    count: 2,
    coins: 0
  },
  {
    slotAction: SlotAction.MOVE_1,
    action: Action.MOVE,
    count: 1,
    coins: 0
  },
  {
    slotAction: SlotAction.ATTACK_2,
    action: Action.ATTACK,
    count: 2,
    coins: 0
  },
  {
    slotAction: SlotAction.ATTACK_1,
    action: Action.ATTACK,
    count: 1,
    coins: 0
  },
  {
    slotAction: SlotAction.ATTACK_1_COIN,
    action: Action.ATTACK,
    count: 1,
    coins: 1
  },
  {
    slotAction: SlotAction.TAX_2,
    action: Action.TAX,
    count: 2,
    coins: 0
  },
  {
    slotAction: SlotAction.TAX_1,
    action: Action.TAX,
    count: 1,
    coins: 0
  },
  {
    slotAction: SlotAction.TAX_1_COIN,
    action: Action.TAX,
    count: 1,
    coins: 1
  },
  {
    slotAction: SlotAction.BUILD_2,
    action: Action.BUILD,
    count: 2,
    coins: 0
  },
  {
    slotAction: SlotAction.BUILD_1,
    action: Action.BUILD,
    count: 1,
    coins: 0
  },
  {
    slotAction: SlotAction.BUILD_1_COIN,
    action: Action.BUILD,
    count: 1,
    coins: 1
  },
  {
    slotAction: SlotAction.SCHEME_3,
    action: Action.SCHEME,
    count: 3,
    coins: 0
  },
  {
    slotAction: SlotAction.SCHEME_2,
    action: Action.SCHEME,
    count: 2,
    coins: 0
  },
  {
    slotAction: SlotAction.SCHEME_1,
    action: Action.SCHEME,
    count: 1,
    coins: 0
  },
]

const mappingsMap = new Map<SlotAction,SlotActionMapping>()
mappings.forEach(mapping => mappingsMap.set(mapping.slotAction, mapping))

export default {

  /**
   * Get slot action mapping by slot action
   * @param slotAction Slot action
   * @returns Slot action mapping
   */
  get(slotAction: SlotAction) : SlotActionMapping {
    return findMandatory(mappingsMap, slotAction)
  },

  /**
   * Get all mappings
   * @returns Slot action mappings
   */
  getAll() : SlotActionMapping[] {
    return mappings
  },

}
