import { Form } from './Form'
import { CardsList } from './Cardslist'
import { get } from './utils'

export class App {
  el = get('#app')

  constructor() {
    fetch('/cards')
      .then(res => res.json())
      .then(data => {
        this.cards = data
        this.createViews()
      })
      .catch(err => {
        this.createViews()
        console.log('Error: ', err)
      })
  }

  createViews() {
    this.form = new Form(this.postNewCard)
    this.list = new CardsList(
      this.cards,
      this.deleteCard,
      this.updateEditedCard
    )
  }

  // Delete Cards
  deleteCard(idToDelete) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`/cards/${idToDelete}`, options)
      .then(res => res.json())
      .catch(err => console.log(err.message))
  }

  // Edit Card
  updateEditedCard(id, title, description) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.textContent,
        description: description.textContent
      })
    }
    fetch(`/cards/${id}`, options)
  }

  postNewCard = card => {
    const { title, description, category } = card
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        category
      })
    }
    fetch('/cards', options)
      .then(res => res.json())
      .then(data => {
        const { id } = data

        this.list.createSingleCard(card, id)
      })
      .catch(err => console.log('Error: ' + err.message))
  }
}
