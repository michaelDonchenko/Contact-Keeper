import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContex'
import '../../css/components/contactForm.css'

const ContactForm = () => {

const contactContex = useContext(ContactContext)
const {addContact, current, clearCurrent, updateContact, getContacts} = contactContex

useEffect(() => {
  if (current !== null) {
    setContact(current)
  } else {
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    })
  }
}, [contactContex, current])

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  })

  const {name, email, phone, type} = contact

  const change = e => setContact({...contact, [e.target.name]: e.target.value})

  const clearAll = () => {
    clearCurrent()
  }

  const submit = e => {
    // e.preventDefault()
    if (current === null) {
      addContact(contact)
    } else {
      updateContact(contact)
    }
    clearAll()
  }
   
  return (
    <form className="mt-5" onSubmit={submit}>
       <h5 className="mb-4 form_header">{current ? 'Edit contact' : 'Add new contact'}</h5>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input required={true} name="name" value={name} onChange={change} type="text" className="form-control"></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input required={true} name="email" value={email} onChange={change}  type="email" className="form-control"></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Phone</label>
        <input name="phone" value={phone} onChange={change} type="text" className="form-control"></input>
      </div>

      <div>
          <input onChange={change} name='type' type='radio' className='mr-2 ml-2' value='personal' checked={type === 'personal'}></input>
          <label className='form-check-label'>Personal</label>
      </div> 
      <div>
          <input onChange={change} name='type' type='radio' className='mr-2 ml-2' value='professional' checked={type === 'professional'}></input>
          <label className='form-check-label'>Professional</label>
      </div>
      
      <button value="Add contat" type="submit" className="btn btn-raised btn-warning mt-3 addContact_button">{current ? 'Update contact' : 'Add new contact'}</button>
      {
        current && (
          <button onClick={clearAll} className="btn btn-raised btn-secondary ml-3 mt-3">Clear</button>
        )
      }
  </form>
  )
}

export default ContactForm
