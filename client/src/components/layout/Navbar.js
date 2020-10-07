import React, {useContext, Fragment} from 'react'
import '../../css/components/navbar.css'
import { Link } from "react-router-dom";
import AuthContext from '../../context/auth/authContex'
import ContactContext from '../../context/contact/contactContex'

export const Navbar = () => {

  const authContext = useContext(AuthContext)
  const {isAuth, logout, user} = authContext

  const contactContext = useContext(ContactContext)
  const {clearContacts} = contactContext

  const onLogout = () => {
    logout()
    clearContacts()
  }

  const authLinks = (
    <Fragment>
     <h4 className="navbar__h3 mr-3">Hello {user && user.name}!</h4> 
     
     <Link onClick={onLogout} className="nav-link"><i class="fas fa-sign-out-alt fx-2"></i>  Logout</Link>
    </Fragment>
  )
    
  const guestLinks = (
    <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/about"> About</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to="/register"> Register</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to="/login"> Login</Link>
        </li> 
    </Fragment>
  )
  
  return (
    <div>
      <ul className="nav nav-tabs bg-primary navBar">
            <div className="navbar__left mr-3 ml-3">
              <i className="fas fa-id-card fa-2x navbar__icon"></i>
              <h3 className="navbar__h3">Contact-Keeper</h3>   
            </div>
            <div className="navbar__right mr-3 ml-3">
             {
               isAuth ?  authLinks :  guestLinks
             }
            </div>      
      </ul> 
    </div>
  )
}


export default  Navbar