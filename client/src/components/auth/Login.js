import React, {useState, useContext, useEffect} from 'react'
import '../../css/pages/login.css'
import AuthContext from '../../context/auth/authContex'
import AlertsContext from '../../context/alerts/alertsContext'
import Alerts from '../layout/Alerts'


const Login = (props) => {

  const authContext = useContext(AuthContext)
  const {login, error, clearErrors, isAuth} = authContext
  const alertsContext = useContext(AlertsContext)

  const {setAlert, removeAlert} = alertsContext

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isAuth) {
      props.history.push('/')
    }
    if (error) {
      setAlert(error)
    }
  }, [error, isAuth, props.history])

  const { email, password} = user

  const change = e => {
    setUser({...user, [e.target.name]: e.target.value})
    removeAlert()
    clearErrors()
  }

  const submit = e => {
    e.preventDefault()
      login({
        email,
        password
      })
    
  }

  return (
    <div className="mt-5">
      <h3 className="mt-4 mb-4">Account <span className="login__header">Log-In</span></h3>
      <Alerts />
      <form onSubmit={submit}>    
          <div class="form-group">
            <label className="text-muted">Email</label>
            <input required={true} name='email' value={email} onChange={change} type="email" className="form-control"></input>
          </div>
      
          <div class="form-group">
            <label className="text-muted">Password</label>
            <input required={true} name='password' value={password} onChange={change} type="password" className="form-control"></input>
          </div>
      
          <button type="submit" className="btn btn-raised btn-primary submit__button">Log-In</button>
      </form>
    </div>
  )
}


export default Login