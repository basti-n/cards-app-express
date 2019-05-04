import { Form } from './Form'
import { get } from './utils'
import { CardsList } from './Cardslist'

export class App {
  el = get('#app')

  constructor() {
    this.cards = []
    this.form = new Form(this.el, this.postNewCard)
    this.list = new CardsList(this.cards)
  }

  updateCards() {}

  postNewCard(title, description, category) {
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
        this.cards = data

        console.log('After Fetch: ', this.cards)
      })
      .catch(err => console.log('ERROR:' + err))
  }
}
