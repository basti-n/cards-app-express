import { Card } from './Card'

export class CardsList {
  constructor(cards) {
    this.cards = cards
    this.createCards()
  }

  createCards() {
    this.cards &&
      this.cards.forEach(card => {
        const { id, ...restOfCard } = card
        console.log('This is an ID', card)
        this.createSingleCard(restOfCard, id)
      })
  }

  createSingleCard(card, id) {
    new Card(card, id)
  }
}
