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
    <div data-id=${this.id} class="cards__save hidden">&#128190;</div>
    <div data-id=${this.id} class="cards__close"></div>
    `

    this.onEdit(newCard)
    this.handleDelete(newCard)

    return newCard
  }

  onEdit(newCard) {
    const editButton = get('.cards__edit')
    const saveButton = newCard.querySelector('.cards__save')
    const title = newCard.querySelector('.cards__heading')

    editButton.addEventListener('click', event => {
      this.handleEdit(editButton, saveButton, title)
    })

    saveButton.addEventListener('click', () => {
      const id = event.target.dataset.id
      this.saveEdit(id, editButton, saveButton, title)
    })
  }

  handleEdit(editButton, saveButton, title) {
    editButton.classList.toggle('hidden')
    saveButton.classList.toggle('hidden')
    title.setAttribute('contentEditable', 'true')
  }

  saveEdit(idOfSavedCard, editButton, saveButton, title) {
    editButton.classList.toggle('hidden')
    saveButton.classList.toggle('hidden')
    title.setAttribute('contentEditable', 'false')

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.textContent
      })
    }
    fetch(`/cards/${idOfSavedCard}`, options).then(res => console.log(res))
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
