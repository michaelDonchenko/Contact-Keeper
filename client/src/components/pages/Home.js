import React, {useContext, useEffect} from 'react'
import Contacts from '../contacts/Contacts'
import '../../css/pages/home.css'
import ContactForm from '../contacts/ContactForm'
import { ContactsFilter } from '../contacts/ContactsFilter'
import AuthContext from '../../context/auth/authContex'



const Home = () => {

  const authContex = useContext(AuthContext)
  const {loadUser, token, isAuth} = authContex

  useEffect(() => {
    loadUser()  
   
  }, [])
  

  return (
    <div className="row Home__mainDiv">
      <div className="col-6 home_leftDiv">
          <ContactForm />
      </div>

      <div className="col-6 home_rightDiv">
          <ContactsFilter />
          <Contacts />
      </div>
    </div>

  )
}

export default Home
