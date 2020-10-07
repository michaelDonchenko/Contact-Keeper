const express = require('express')
const router = express.Router()
const { body , validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth =require('../middleware/auth')

//route = GET api/auth
//desc = Get logged in user
//access = Private

router.get('/', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

//route = POST api/auth
//desc = Auth user & get token
//access = Public

router.post('/', 
//validation rules log in a user
[
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

  const {email, password} = req.body

  try {
    //check if the email entered by the user exist
      let user = await User.findOne({email})
      if(!user) {
        return res.status(400).json({msg: 'User does not exist please sign-in'})
      }
      //check if the password the user entered matches with the encrypted password in the DB
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(400).json({msg: 'Wrong password'})
      }
      //in case the password matches generate and send the jwt token to the user
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload, 
        config.get('jwtSecret')/**secret variable */,
        {
          expiresIn: 9999
        }, 
        //check for error or send the token
        (err, token) => {
          if (err) throw err
          res.json({token})
        })
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


module.exports = router
