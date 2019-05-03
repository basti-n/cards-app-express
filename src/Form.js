import { createEl } from './utils'

export class Form {
  constructor(target, postNewCard) {
    this.target = target
    this.postNewCard = postNewCard
    this.el = createEl({ target, type: 'form' })
    this.render()
    this.addEventListener()
  }

  render() {
    //Create All element
    const title = createEl({ target: this.target, type: 'input' })
    const text = createEl({ target: this.target, type: 'textarea' })
    const button = createEl({ target: this.target, type: 'button' })

    // Inner HTML
    button.innerHTML = 'Click Me'
    title.name = 'title'
    text.name = 'text'

    // Append button and textarea
    this.el.appendChild(title)
    this.el.appendChild(text)
    this.el.appendChild(button)

    //
    this.target.appendChild(this.el)
  }

  addEventListener() {
    this.el.addEventListener('submit', event =>
      this.handleSubmit(event, this.el)
    )
  }

  handleSubmit(event, el) {
    event.preventDefault()
    console.log('Handle Submit', el)
    const { title, text } = el
    console.log(title.value, text.value)
    this.postNewCard(title.value, text.value)
  }
}
