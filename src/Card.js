import { createEl } from './utils'

//  represents a single card with title, description, category
// and has an Icon to delete a card

export class Card {
  constructor({ title, description, category }) {
    this.title = title
    this.description = description
    this.category = category
    console.log('Title', this.title)
    this.createCard()
  }

  createCard() {
    const newCard = createEl({ type: 'article' })

    newCard.innerHTML = `
    <h2 class="cards__heading">${this.title}</h2>
    <p class="cards__text">${this.description}</p>
    <p>${this.category}</p>
    `

    return newCard
  }
}
