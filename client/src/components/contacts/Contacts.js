import React, {Fragment, useContext, useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContex'
import ContactItem from './ContactItem'
import '../../css/components/contacts.css'

const Contacts = () => {

  const contactContext = useContext(ContactContext)

  const { contacts, filtered, getContacts } = contactContext

  useEffect(() => {
    getContacts()
  },[])

  if (contacts.length === 0) {
    return <h4>Please add a new Contact..</h4>
  }

  return (
    
    <Fragment>
      <TransitionGroup>
      {
      filtered ? 
      (filtered.map(contact => (
      <CSSTransition key={contact._id} classNames="item" timeout={500}>
          <ContactItem  contact={contact} />
      </CSSTransition>
      ))) 
      :
      ( contacts && contacts.map(contact => (
      <CSSTransition key={contact._id} classNames="item" timeout={500}>
          <ContactItem  contact={contact} />
      </CSSTransition>
      ))) 
      }
      </TransitionGroup>
    </Fragment>
    
  )
}

export default Contacts
