import findMandatory from '@/util/findMandatory'
import { expect } from 'chai'

describe('findMandatory', () => {
  it('findMandatory_Exist', () => {
    const array = [1,2,3]
    
    const result = findMandatory(array, item => item==3)

    expect(result).to.eql(3)
  })

  it('findMandatory_NotExist', () => {
    const array = [1,2,3]
    
    expect(findMandatory.bind(undefined, array, item => item==4)).to.throw('Invalid number.')
  })

  it('findMandatory_EmptyArray', () => {
    const array : number[] = []
    
    expect(findMandatory.bind(undefined, array, item => item==4)).to.throw('Array is empty.')
  })
})
