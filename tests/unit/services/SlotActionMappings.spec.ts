import Action from '@/services/enum/Action'
import SlotAction from '@/services/enum/SlotAction'
import SlotActionMappings from '@/services/SlotActionMappings'
import { expect } from 'chai'

describe('SlotActionMappings', () => {
  it('get', () => {
    const mapping = SlotActionMappings.get(SlotAction.BUILD_1_COIN)

    expect(mapping).not.undefined
    expect(mapping.slotAction).to.eq(SlotAction.BUILD_1_COIN)
    expect(mapping.action).to.eq(Action.BUILD)
    expect(mapping.count).to.eq(1)
    expect(mapping.coins).to.eq(1)
  })

  it('getAll', () => {
    const mappings = SlotActionMappings.getAll()

    expect(mappings.length).eq(18)
  })
})
