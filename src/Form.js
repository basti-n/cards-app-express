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
    const description = createEl({ target: this.target, type: 'textarea' })
    const category = createEl({ target: this.target, type: 'select' })
    const button = createEl({ target: this.target, type: 'button' })

    // Inner HTML
    button.innerHTML = 'Click Me'
    category.innerHTML = `
      <option value="school">School</option>
      <option value="sports">Sports</option>
      <option value="household">Household</option>`

    title.name = 'title'
    description.name = 'description'
    category.name = 'category'

    // Append button and textarea
    this.el.appendChild(title)
    this.el.appendChild(description)
    this.el.appendChild(category)
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
    const { title, description, category } = el
    console.log(title.value, description.value, category.value)
    this.postNewCard(title.value, description.value, category.value)
  }
}
