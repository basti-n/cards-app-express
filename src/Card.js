import { createEl } from './utils'
import { get } from './utils'

//  represents a single card with title, description, category
// and has an Icon to delete a card

export class Card {
  cardContainer = get('.cards')

  constructor({ title, description, category }, id, deleteCard, updateCard) {
    this.id = id
    this.title = title
    this.description = description
    this.category = category
    this.deleteCard = deleteCard
    this.updateCard = updateCard

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
    <div data-id=${this.id} class="cards__save hidden">&#128190;</div>
    <div data-id=${this.id} class="cards__close"></div>
    `

    this.onEdit(newCard)
    this.handleDelete(newCard)

    return newCard
  }

  onEdit(newCard) {
    const editButton = get('.cards__edit')
    const saveButton = get('.cards__save', newCard)
    const title = get('.cards__heading', newCard)
    const description = get('.cards__text', newCard)

    editButton.addEventListener('click', () => {
      this.handleEdit(editButton, saveButton, title, description)
    })

    saveButton.addEventListener('click', () => {
      const id = event.target.dataset.id
      this.saveEdit(id, editButton, saveButton, title, description)
    })
  }

  handleEdit(editButton, saveButton, title, description) {
    editButton.classList.toggle('hidden')
    saveButton.classList.toggle('hidden')
    title.setAttribute('contentEditable', 'true')
    description.setAttribute('contentEditable', 'true')
    title.focus()
  }

  saveEdit(idOfSavedCard, editButton, saveButton, title, description) {
    editButton.classList.toggle('hidden')
    saveButton.classList.toggle('hidden')
    title.setAttribute('contentEditable', 'false')
    description.setAttribute('contentEditable', 'false')

    this.updateCard(idOfSavedCard, title, description)
  }

  handleDelete() {
    get('.cards__close').addEventListener('click', event => {
      const cardToDelete = event.target.parentNode
      this.deleteCard(cardToDelete.dataset.id)
      this.fadeoutDeletedItem(cardToDelete)
    })
  }

  fadeoutDeletedItem(item) {
    item.classList.add('fadeout')
    setTimeout(() => item.remove(), 1000)
  }
}
