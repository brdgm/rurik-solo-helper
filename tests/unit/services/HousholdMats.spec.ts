import DifficultyLevel from '@/services/enum/DifficultyLevel'
import HouseholdMats from '@/services/HouseholdMats'
import { expect } from 'chai'

describe('HouseholdMats', () => {
  it('get', () => {
    const mat = HouseholdMats.get(DifficultyLevel.MEDIUM)

    expect(mat).not.undefined
    expect(mat?.difficultyLevel).to.eq(DifficultyLevel.MEDIUM)
  })

  it('getAll', () => {
    const mats = HouseholdMats.getAll()

    expect(mats.length).eq(4)
  })
})
