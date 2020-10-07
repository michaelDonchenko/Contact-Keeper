//express & DB
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const path = require('path')

//init middleware
app.use(express.json({extended: false}))

//Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

//Port
const PORT = process.env.PORT || 5000
//DB connection
connectDB()


//port listener
app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})