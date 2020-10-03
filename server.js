const { json } = require('express')
//express
const express = require('express')
const app = express()


//Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))


const PORT = process.env.PORT || 5000

//port listener
app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})