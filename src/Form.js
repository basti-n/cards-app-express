import { createEl } from './utils'
import { get } from './utils'

export class Form {
  form = get('.form')

  constructor(postNewCard) {
    this.postNewCard = postNewCard
    this.render()
    this.addEventListener()
  }

  render() {
    //Create All element
    const title = createEl({ target: this.form, type: 'input' })
    const description = createEl({ target: this.form, type: 'textarea' })
    const category = createEl({ target: this.form, type: 'select' })
    const button = createEl({ target: this.form, type: 'button' })

    // Inner HTML
    button.innerHTML = 'Click Me'
    category.innerHTML = `
      <option value="" hidden>Select your category</option>
      <option value="school">School</option>
      <option value="sports">Sports</option>
      <option value="household">Household</option>`

    title.name = 'title'
    title.placeholder = 'ToDo title'
    description.name = 'description'
    description.placeholder = 'Describe your ToDo'
    category.name = 'category'
    category.required = true
  }

  addEventListener() {
    this.form.addEventListener('submit', event =>
      this.handleSubmit(event, this.form)
    )
  }

  handleSubmit(event, el) {
    event.preventDefault()
    const { title, description, category } = el
    const newCard = {
      title: title.value,
      description: description.value,
      category: category.value
    }
    this.postNewCard(newCard)
    this.form.reset()
  }
}
