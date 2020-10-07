const express = require('express')
const router = express.Router()
const { body , validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//route = POST api/users
//desc = Register a user
//access = Public

router.post('/',
//validation rules for creating a new user
 [
  body('name')
  .not()
  .isEmpty().withMessage('Name is required'),
  body('email')
  .isEmail().withMessage('Please type a valid email'),
  body('password')
  .isLength({min: 6}).withMessage('Password must contain 6 characters')
], 

 async (req,res) => {
  const errors = validationResult(req)
  //check for existing errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  //destructure the details from the req.body
  const { name, email, password } = req.body
  try {
    //try to find user with the email from req.body
    let user = await User.findOne({ email })
    //if user exist send responce
    if (user) {
      return res.status(400).json({msg: 'Email already exists'})
    } 
    //if the email not exist create new user
    user = new User({
      name,
      email,
      password
    })

    //generate salt for password encryption
    const salt = await bcrypt.genSalt(10)
    //encrypt the password before saving to the DB
    user.password = await bcrypt.hash(password, salt)
    //save the user
    await user.save()
    //creating the header for the token
    const payload = {
      user: {
        id: user.id
      }
    }
    //generating jwt token and send it to the user
    jwt.sign
    (
      payload, 
      config.get('jwtSecret')/**secret variable */,
      {
        expiresIn: 9999
      }, 
      //check for error or send the token
      (err, token) => {
        if (err) throw err
        res.json({token})
      }
    )

    //catch error
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
