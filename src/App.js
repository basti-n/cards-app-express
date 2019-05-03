import { Form } from './Form'
import { get } from './utils'
import { CardsList } from './Cardslist'

export class App {
  el = get('#app')

  constructor() {
    this.cards = [
      {
        title: 'DummyTitle',
        description: 'DummyDescription',
        category: 'DummyCategory'
      }
    ]
    this.form = new Form(this.el, this.postNewCard)
    console.log(this.cards)
    this.list = new CardsList(this.cards)
  }

  postNewCard(title, text) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        text: text
      })
    }
    fetch('/cards', options)
      .then(res => res.json())
      .then(data => {
        this.cards = data
        console.log(data)

        console.log(this.cards)
      })
      .catch(err => console.log('ERROR:' + err))
  }
}
