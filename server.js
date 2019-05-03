const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.static('./dist'))

app.listen(1234, err => {
  err ? console.log(err.message) : console.log('Server ready')
})

let cards = fs.readFile(__dirname + '/cards.json', (err, data) => {
  if (err) {
    console.log(err.message)
    return {}
  }
  cards = JSON.parse(data)
  return cards
})

// GET Cards
app.get('/cards', (req, res) => {
  fs.readFile(__dirname + '/cards.json', (err, data) => {
    if (err) {
      console.log(err.message)
      return [
        { title: 'some title', text: 'some text', bookmarked: false, id: 1 },
        { title: 'Number two', text: 'some text', bookmarked: false, id: 2 },
        { title: 'Title 3', text: 'some text', bookmarked: false, id: 3 }
      ]
    }
    cards = JSON.parse(data)
    res.json(cards)
  })
})

//GET /cards/:id → returns card with title, description, category
app.get('/cards/:id', (req, res) => {
  fs.readFile(__dirname + '/cards.json', (err, data) => {
    const { id } = req.params
    if (err) {
      console.log(err.message)
      return
    }
    const cards = JSON.parse(data)
    const searchedForCard = cards.find(card => card.id === Number(id))
    res.json(searchedForCard)
  })
})

//POST /cards → adds a card to cards
app.post('/cards', (req, res) => {
  const id = cards.length + 1
  const card = { ...req.body, id, bookmarked: false }
  cards = [...cards, card]
  updateCards(cards)
  res.json(cards)
})

//DELETE /cards/:id → removes a card from cards
app.delete('/cards/:id', (req, res) => {
  const { id } = req.params
  const cardToDelete = cards.find(card => card.id === Number(id))
  cards.splice(cards.indexOf(cardToDelete), 1)
  updateCards(cards)
  res.send(`User with id: ${id} succesfully deleted`)
})

function updateCards(cards) {
  fs.writeFile(__dirname + '/cards.json', JSON.stringify(cards), err => {
    if (err) {
      console.log(err.message)
      return
    }
    console.log('Successful User Update')
  })
}

/*

const listInitial = [
  { title: 'some title', text: 'some text', bookmarked: false, id: 1 },
  { title: 'Number two', text: 'some text', bookmarked: false, id: 2 },
  { title: 'Title 3', text: 'some text', bookmarked: false, id: 3 }
]

fs.writeFile(__dirname + '/cards.json', JSON.stringify(cards), err => {
  err ? console.log(err) : console.log('Cards Updated')
})

*/
