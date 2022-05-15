import { expect } from 'chai'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@/util/toggleArrayItem'

describe('toggleArrayItem', () => {
  it('toggleExist', () => {
    const array = [Expansion.STONE_BLADE]
    toggleArrayItem(array, Expansion.STONE_BLADE)

    expect(array).to.eql([])
  })

  it('toggleNotExist', () => {
    const array : Expansion[] = []
    toggleArrayItem(array, Expansion.STONE_BLADE)

    expect(array).to.eql([Expansion.STONE_BLADE])
  })
})
