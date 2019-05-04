import { Card } from './Card'

export class CardsList {
  constructor(cards) {
    this.cards = cards
    console.log('Title:', this.cards)
    this.createCards()
  }

  createCards() {
    this.cards.forEach(card => {
      console.log('createCard: ', card)
      const newCard = new Card(card)
    })
  }
}
