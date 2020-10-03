const express = require('express')
const router = express.Router()

//route = GET api/contacts
//desc = get all user contacts
//access = Private

router.get('/', (req,res) => {
  res.send('get all contacts')
})

//route = POST api/contacts
//desc = add new contant
//access = Private

router.post('/', (req,res) => {
  res.send('add new contact')
})

//route = Update api/contacts
//desc = update a contact
//access = Private

router.put('/:id', (req,res) => {
  res.send('update contact')
})

//route = DELETE api/contacts
//desc = delete a contact
//access = Private

router.delete('/:id', (req,res) => {
  res.send('delete a contact')
})


module.exports = router
