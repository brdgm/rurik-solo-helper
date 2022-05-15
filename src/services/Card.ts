import Advisor from "./enum/Advisor"
import Action from "./enum/Action"
import ActionPriority from "./enum/ActionPriority"
import Region from "./enum/Region"
import Structure from "./enum/Structure"

export default interface Card {
  id: number
  locationOrder: Region[]
  priorities: CardPriority[]
}

export interface CardPriority {
  priority: ActionPriority
  buildOrder: Structure[]
  actions: AdvisorAction[]
}

export interface AdvisorAction {
  advisor: Advisor
  action: Action
  coin?: boolean
}
