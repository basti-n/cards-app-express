const express = require('express')
const app = express()

app.listen(1234, err => {
  err ? console.log(err.message) : console.log('Server ready')
})

app.get('/', (req, res) => {
  res.send('Hallo Welt')
})
