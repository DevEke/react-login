import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import styles from './styles/globals.module.css';

function App() {
  const [user, setUser] = useState(undefined);
  const [alertList, setAlertList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const auth = localStorage.getItem('auth');

  const forgotPassword = (email) => {
    axios.put('https://deveke-react-login.herokuapp.com/forgot-password', {
      email: email
    })
    .then(res => {
      console.log(res.data);
      handleAlerts('If you have an account with us, an email was sent to your address with a verification code.', true)
    })
    .catch(err => {
      console.error(err);
      handleAlerts( 'There was a problem sending you a verification code. Check your email address.', false)
    })
  }

  const resetForgotPassword = (email, verify, password) => {
    axios.put('https://deveke-react-login.herokuapp.com/reset-forgot-password', {
      email: email,
      verification: verify,
      password: password
    })
    .then(res => {
      console.log(res.data);
      handleAlerts('Password successfully reset.', true);
    })
    .catch(err => {
      console.error(err);
      handleAlerts('There was an problem resetting the password.', false)
    })
  }

  const resetPassword = (password) => {
    axios.put(`https://deveke-react-login.herokuapp.com/reset-password/${user._id}`, {
      password: password
    }, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      const data = res.data;
      getUser();
      navigate('/dashboard')
      handleAlerts('Password successfully reset.', true);
    })
    .catch(err => {
      console.error(err);
      handleAlerts('There was an problem resetting the password.', false)
    })
  }

  const deleteAccount = (id) => {
    axios.delete(`https://deveke-react-login.herokuapp.com/delete-account/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      navigate('/')
      handleAlerts('Account successfully deleted.', true);
    })
    .catch(err => {
      handleAlerts('There was a problem deleting the account.', false);
    })
  }

  const handleAlerts = (x, y) => {
    let newAlert = {
      alert: x,
      type: y 
    }
    if (!alertList.some(obj => obj.alert === x)) {
      setAlertList([...alertList, newAlert])
    }
    setTimeout(() => {
      setAlertList(alertList.filter((obj) => obj.alert !== x))
    }, 7000)
  }

  const removeAlert = (x) => {
    setAlertList(alertList.filter((obj) => obj.alert !== x))
  }



  const signIn = (email, password) => {
    axios.post('https://deveke-react-login.herokuapp.com/login', {
      email: email,
      password: password
    })
    .then(res => {
      const data = res.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('auth', data.user._id);
      navigate('/dashboard');
      handleAlerts('Sign In Successful', true)
    })
    .catch(err => {
      console.error(err);
      handleAlerts('Sign In Unsuccessful. Check your email and password.', false)
    })
  }

  const signOut = () => {
    navigate('/')
    localStorage.clear();
    setUser(undefined);
    handleAlerts('You have been signed out.', true)
  }

  const getUser = () => {
      axios.get(`https://deveke-react-login.herokuapp.com/user/${auth}`, {
      headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        const data = res.data
        setUser(data);
      })
      .catch(err => {
        if (user) {
          return
        } else {
          navigate('/')
        }
      })
  }

  const handleLoading = (x) => {
    if (x === 'on') { setLoading(true) }
    else { setLoading(false) }
  }

  useEffect(() => {
      getUser()
  }, [])

  return (
    <div className={styles["app_container"]}>
      {
        alertList.length > 0 ?
        <div className={styles["modal_container"]}>
          <div className={styles["alerts_list"]}>
            {alertList.map((alrt, idx) => {
              return (
                <Alerts key={idx} alertMessage={alrt.alert} alertType={alrt.type} removeAlert={() => removeAlert(alrt.alert)}/>
              )
            })}
          </div>
        </div>:
        null
      }
        <Routes>
          //Authentication Routes
          <Route 
            exact path="/" 
            element={
                      <Login 
                        signIn={(x,y) => signIn(x,y)}
                      />
                    }
          />
          <Route 
            path="/create-account" 
            element={
                      <Register 
                        signIn={(x,y) => signIn(x,y)}
                      />
                    }
          />
          <Route 
            path="/forgot-password" 
            element={
                      <Forgot 
                        forgotPassword={(x) => forgotPassword(x)}
                        resetForgotPassword={(x,y,z) => resetForgotPassword(x,y,z)}
                      />
                    } 
          />
          // Secured Routes
          <Route 
            path="/reset-password" 
            element={
                      <Reset 
                        user={user} 
                        resetPassword={(x) => resetPassword(x)}
                      />
                    }
          />
          <Route 
            path="/dashboard" 
            element={ 
                      <Dashboard 
                        getUser={() => getUser()}
                        user={user} 
                        signOut={() => signOut()}
                        deleteAccount={(x) => deleteAccount(x)}
                      />
                    }
          />
        </Routes>
    </div>
  )
}

export default App
