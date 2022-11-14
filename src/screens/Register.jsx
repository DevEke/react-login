import {Link, useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import axios from 'axios';
import Loading from '../components/Loading'

export default function Register({signIn}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ emailValidation, checkEmailValidation] = useState({});
  const [ passwordValidation, checkPasswordValidation] = useState({});
  const [ confirmValidation, checkConfirmValidation] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function createNewAccount(e) {
    e.preventDefault();
    const isValid = validateCredentials();
    if (isValid) {
      axios.post('https://deveke-react-login.herokuapp.com/register-account', {
        email: email,
        password: password
      })
      .then(res => {
        signIn(email, password);
        navigate('/dashboard')
      })
      .catch(err => {
        console.log(err + ": Error creating account")
      })
    }
    
  }


  const validateCredentials = () => {
    const emailValidation = {};
    const passwordValidation = {};
    const confirmValidation = {};
    let isValid = true;
    if (!email.includes(".") || !email.includes("@")) {
      emailValidation.emailInvalid = "Enter a valid email address.";
      isValid = false;
    }
    if (password.trim().length < 5) {
      passwordValidation.passwordMissing = "Password must be at least 5 characters long.";
      isValid = false;
    }
    if (password !== '' && confirm !== password) {
      confirmValidation.passwordsDontMatch = "Your passwords dont match.";
      isValid = false;
    }
    checkEmailValidation(emailValidation);
    checkPasswordValidation(passwordValidation);
    checkConfirmValidation(confirmValidation);
    return isValid;
  }

  useEffect(() => {
    validateCredentials()
  }, [email, password, confirm])
  
    return (
      <>
        <div className="form_container">
          <form className="form">
          {
              loading ?
              <Loading/> : 
              null
            }
              <p className="form_title">Register</p>
              <div>
              <Input
                ref={emailRef}
                setValue={e => setEmail(e.target.value)}
                name='email'
                type='email'
                value={email}
                label='Email'
                placeholder='johnsmith@example.com'
                errors={emailValidation}
                style="input-styles"
                disabled={false}
              />
              <Input
                ref={passwordRef}
                setValue={e => setPassword(e.target.value)}
                name='password'
                value={password}
                label='Password'
                errors={passwordValidation}
                style="input-styles"
                disabled={false}
              />
              <Input
                ref={confirmRef}
                setValue={e => setConfirm(e.target.value)}
                name='confirm'
                value={confirm}
                label='Confirm'
                type='password'
                errors={confirmValidation}
                style="input-styles"
                disabled={false}
              />
              </div>
              <div className="btn_flex">
              <Button
                action={(e) => createNewAccount(e)} 
                style="btn_closed"
                label='Register'
              />
              <Button
                action={(e) => navigate('/')}
                style="btn_open"
                label='Back to Sign In'
              />
              </div>
              <Link to='/forgot-password' className="sub_link">Forgot your password?</Link>
          </form>
          </div>
          </>
    )
  }