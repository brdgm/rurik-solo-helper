import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('newShuffled', () => {
    const cardDeck = CardDeck.new()

    expect(cardDeck.pile.length).to.eq(18)

    const persistence = cardDeck.toPersistence()
    expect(persistence.pile.length).to.eq(18)

    expect(persistence.pile.includes(15)).to.true
  })

  it('draw', () => {
    const cardDeck = CardDeck.new()

    const card1 = cardDeck.activeCard
    expect(cardDeck.pile[0]).to.eq(card1)

    const card2 = cardDeck.draw()
    expect(card2).not.to.eq(card1)
    expect(cardDeck.activeCard).to.eq(card2)
    expect(cardDeck.pile[0]).to.eq(card2)

    expect(cardDeck.pile[1]).to.eq(card1)
  })
})
