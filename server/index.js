const express = require('express');
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/dist')))

app.listen(3000)
console.log('Listening in port 3000')