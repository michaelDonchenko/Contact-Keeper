const express = require('express')
const router = express.Router()
const { body , validationResult } = require('express-validator')
const User = require('../models/User')
const auth =require('../middleware/auth')
const Contact = require('../models/Contact')

//route = GET api/contacts
//desc = get all user contacts
//access = Private

router.get('/', auth, async (req,res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({ date: -1})
    res.json(contacts)
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

//route = POST api/contacts
//desc = add new contant
//access = Private

router.post('/', [auth, [
  body('name')
  .not()
  .isEmpty().withMessage('Name is required'),
  body('email')
  .not()
  .isEmpty().withMessage('Email is required'),
]],

 async (req,res) => {
  const errors = validationResult(req)
  //check for existing errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  //destructure req.body
  const {name, email, phone, type} = req.body
  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id
    })
    //saving the new contact to the DB
    const contact = await newContact.save()
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }  
})

//route = Update api/contacts
//desc = update a contact
//access = Private

router.put('/:id', auth, async (req,res) => {
  const {name, email, phone, type} = req.body

  //build contact object
  const contactFields = {}
  if(name) contactFields.name = name
  if(email) contactFields.email = email
  if(phone) contactFields.phone = phone
  if(type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({msg: 'Contact not found'})

    //make sure user owns contact
    if(contact.user.toString() !== req.user.id)
    return res.status(401).json({msg: 'Not authorized'})

    contact = await Contact.findByIdAndUpdate(req.params.id,
        {$set: contactFields},
        {new: true},
     )
     res.json({contact})

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

//route = DELETE api/contacts
//desc = delete a contact
//access = Private

router.delete('/:id', auth, async (req,res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({msg: 'Contact not found'})

    //make sure user owns contact
    if(contact.user.toString() !== req.user.id)
    return res.status(401).json({msg: 'Not authorized'})

    await Contact.findByIdAndRemove(req.params.id)
    return res.json({msg: 'Contact Deleted'})

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


module.exports = router
