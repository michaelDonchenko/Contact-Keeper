const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')


const connectDB = () => {
  mongoose.connect(db, {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false, })
  .then(() => {console.log('MongoDB Connected')})
  .catch(err => {console.log(err.message)})
}

mongoose.set('useCreateIndex', true)

module.exports = connectDB
