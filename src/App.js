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
    this.list = new CardsList(this.cards)
  }

  updateCards() {}

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
