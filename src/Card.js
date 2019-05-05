import { createEl } from './utils'
import { get } from './utils'

//  represents a single card with title, description, category
// and has an Icon to delete a card

export class Card {
  cardContainer = get('.cards')

  constructor({ title, description, category }, id) {
    this.id = id
    this.title = title
    this.description = description
    this.category = category
    this.createCard()
  }

  createCard() {
    const newCard = createEl({
      type: 'article',
      target: this.cardContainer,
      position: 'afterbegin'
    })
    newCard.innerHTML = `
    <h2 class="cards__heading">${this.title}</h2>
    <p class="cards__text">${this.description}</p>
    <p class="cards__category">${this.category}</p>
    <div data-id=${this.id} class="cards__edit">✎</div>
    <div data-id=${this.id} class="cards__close"></div>
    `

    this.handleEdit(newCard)
    this.handleDelete(newCard)

    return newCard
  }

  handleEdit(newCard) {
    const editButton = get('.cards__edit')
    editButton.addEventListener('click', event =>
      console.log(
        'Edit Button Clicked',
        event.target.dataset.id,
        'New Card: ',
        newCard
      )
    )
  }
  handleDelete() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    get('.cards__close').addEventListener('click', event => {
      console.log('Delete Iteam', event.target.parentNode)
      fetch(`/cards/${event.target.dataset.id}`, options)
        .then(res => res.json())
        .then(data => this.fadeoutDeletedItem(event.target.parentNode))
        .catch(err => console.log(err.message))
    })
  }

  fadeoutDeletedItem(item) {
    item.classList.add('fadeout')
    setTimeout(() => item.remove(), 1000)
  }
}
