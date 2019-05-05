import { Card } from './Card'

export class CardsList {
  constructor(cards, deleteCard, updateCard) {
    this.cards = cards
    this.deleteCard = deleteCard
    this.updateCard = updateCard
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
    new Card(card, id, this.deleteCard, this.updateCard)
  }
}
