import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT ,
  UPDATE_CONTACT,
  FILER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,

} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case ADD_CONTACT:
     
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
      case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload)
      }
      case CONTACT_ERROR:
        return {
          ...state,
          error: action.payload
        }
      case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
      case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
      case CLEAR_CONTACTS:
        return {
          ...state,
          contacts: [],
          current: null,
          filtered: null,
          error: null,
        }
      case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
      }
      case FILER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          //creating regular expression with global && not sensetive
          const regex = RegExp(`${action.payload}`, 'gi')
          //this will return anything the text we passed match in with the name or the email 
          return contact.name.match(regex) || contact.email.match(regex)
        })
      }
      case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    default:
      return state;
  }
}