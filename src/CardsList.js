import { Card } from './Card'

export class CardsList {
  constructor(cards) {
    this.cards = cards
    this.onDelete = onDelete
    this.onEdit = onEdit
    this.createCards()
  }

  createCards() {
    this.cards &&
      this.cards.forEach(card => {
        const { id, ...restOfCard } = card
        this.createSingleCard(restOfCard, id)
      })
  }

  createSingleCard(card, id) {
    new Card(card, id)
  }
}
