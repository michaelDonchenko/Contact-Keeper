const express = require('express')
const router = express.Router()

//route = GET api/auth
//desc = Get logged in user
//access = Private

router.get('/', (req,res) => {
  res.send('Get looged in user')
})


//route = POST api/auth
//desc = Auth user & get token
//access = Public

router.post('/', (req,res) => {
  res.send('log in a user')
})


module.exports = router
