import React, {useContext} from 'react'
import ContactContext from '../../context/contact/contactContex'
import '../../css/components/contactItem.css'

const ContactItem = ({contact}) => {

  const contactContex = useContext(ContactContext)
  const {deleteContact, setCurrent, clearCurrent} = contactContex

  const {_id, name, email, phone, type} = contact

  const onDelete = () => {
      deleteContact(_id)
      clearCurrent()
  }

  return (
    <div className="card myCard">
      <div className="card-body">
          <h5>{name}
          {
           type && (type === 'personal' ?  <span style={{float: 'right'}} className="badge badge-success personal__badge">{type.charAt(0).toUpperCase() + type.slice(1)}</span> 
            : <span style={{float: 'right'}} className="badge badge-primary ml-3 professional__badge">{type.charAt(0).toUpperCase() + type.slice(1)}</span>)
          }
          </h5>
          <ul className="list-group">
            {
              email && (
                <li className="list-group-item">
                   <span><i className="fas fa-envelope"></i>{email}</span>
                </li>
              )
            }
            {
              phone && (
                <li className="list-group-item">
                   <span><i className="fas fa-phone"></i>{phone}</span>
                </li>
              )
            }
          </ul>   
          <button onClick={() => setCurrent(contact)} className="btn btn-raised btn-secondary mr-2">Edit</button>
          <button onClick={onDelete} className="btn btn-raised btn-danger">Delete</button>
      </div>
    </div>
  )
}

export default ContactItem
