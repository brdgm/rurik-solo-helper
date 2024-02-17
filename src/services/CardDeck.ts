import { CardDeckPersistence } from '@/store'
import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'

export default class CardDeck {

  private _pile : Card[]

  public constructor(pile : Card[]) {
    this._pile = pile
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get activeCard() : Card {
    return this._pile[0];
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id)
    }
  }

  /**
   * Draws a new card.
   */
  public draw() : Card {
    // draw bottom card and put in on top of the deck
    const card = this._pile.pop() as Card
    this._pile.unshift(card)
    // return next topmost card
    return this.activeCard
  }

  /**
   * Shuffles pile.
   */
  public shuffle() : void {
    this._pile = shuffle(this._pile)
  }

  /**
   * Creates a shuffled new card deck with random advanced cards.
   */
  public static new() : CardDeck {
    const cardDeck = new CardDeck(Cards.getAll())
    cardDeck.shuffle()
    return cardDeck
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(persistence.pile.map(Cards.get))
  }

}
