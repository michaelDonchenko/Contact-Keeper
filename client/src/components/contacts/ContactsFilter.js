import React, {useState, useContext} from 'react'
import ContactContext from '../../context/contact/contactContex'

export const ContactsFilter = () => {

  const contactContext = useContext(ContactContext)

  const {filterContacts, clearFilter} = contactContext

  const [text, setText] = useState('')

  const change = e => {
    setText(e.target.value)
    if (e.target.value !== '') {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }


  return (
    <div className="mt-4 mb-3">
      <h5>Filter your Contacts</h5>
      <input placeholder="filter.." name="filter" value={text} onChange={change} type="text" className="form-control"></input>
    </div>
  )
}
