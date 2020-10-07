import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContex'
import '../../css/pages/register.css'
import AlertsContext from '../../context/alerts/alertsContext'
import Alerts from '../layout/Alerts'


const Register = (props) => {

  const authContext = useContext(AuthContext)

  const {register, error, clearErrors, isAuth} = authContext

  const alertsContext = useContext(AlertsContext)

  const {setAlert, removeAlert} = alertsContext

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = user

  useEffect(() => {
    if (isAuth) {
      props.history.push('/')
    }
    if (error) {
      setAlert(error)
    }
  }, [error, isAuth, props.history])

  const change = e => {
    setUser({...user, [e.target.name]: e.target.value})
    removeAlert()
    clearErrors()
  }

  const submit = e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('The passwords do not match')
    } else {
      register({
        name,
        email,
        password,
      })
    } 
  }

  return (
    <div className="mt-5">
      <h3 className="mt-4 mb-4" >Account <snan className="register__header">Register</snan></h3>
      <Alerts />
      <form onSubmit={submit}>
          <div class="form-group">
            <label className="text-muted">Name</label>
            <input name='name' value={name} onChange={change} type="text" className="form-control" required></input>
          </div>
      
          <div class="form-group">
            <label className="text-muted">Email</label>
            <input name='email' value={email} onChange={change} type="email" className="form-control" required></input>
          </div>
      
          <div class="form-group">
            <label className="text-muted">Password</label>
            <input name='password' value={password} onChange={change} type="password" className="form-control" required minLength="6"></input>
          </div>

          <div class="form-group">
            <label className="text-muted">Confirm Password</label>
            <input name='password2' value={password2} onChange={change} type="password" className="form-control" required minLength="6"></input>
          </div>
      
          <button type="submit" className="btn btn-raised btn-primary submit_button">Submit</button>
      </form>
    </div>
  )
}


export  default Register