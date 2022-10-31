import {Link, useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import axios from 'axios';
import { HiCheckCircle,HiXCircle, HiEye, HiEyeSlash } from 'react-icons/hi2';
import { HiPlusCircle, HiLogin } from 'react-icons/hi';
import Loading from './Loading'

export default function Register({signIn}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ emailValidation, checkEmailValidation] = useState({});
  const [ passwordValidation, checkPasswordValidation] = useState({});
  const [ confirmValidation, checkConfirmValidation] = useState({});
  const [ errorPassword, addErrorClassPassword] = useState(false);
  const [ errorEmail, addErrorClassEmail] = useState(false);
  const [ errorConfirm, addErrorClassConfirm] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [confirmChanged, setConfirmChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function createNewAccount(e) {
    e.preventDefault();
    const isValid = validateCredentials();
    setEmailChanged(true);
    setPasswordChanged(true);
    setConfirmChanged(true);
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

  const handleEmailChange = (x) => {
    setEmailChanged(true)
    setEmail(x)
  }

  const handlePasswordChange = (x) => {
    setPasswordChanged(true)
    setPassword(x)
  }

  const handleConfirmChange = (x) => {
    setConfirmChanged(true)
    setConfirm(x)
  }

  const validateCredentials = () => {
    const emailValidation = {};
    const passwordValidation = {};
    const confirmValidation = {};
    let isValid = true;
    if (!email.includes(".") || !email.includes("@")) {
      emailValidation.emailInvalid = "Enter a valid email address.";
      addErrorClassEmail(true);
      isValid = false;
    } else {
      addErrorClassEmail(false);
    }
    if (password.trim().length < 5) {
      passwordValidation.passwordMissing = "Password must be at least 5 characters long.";
      addErrorClassPassword(true);
      isValid = false;
    } else {
      addErrorClassPassword(false);
    }
    if (password !== '' && confirm !== password) {
      confirmValidation.passwordsDontMatch = "Your passwords dont match.";
      addErrorClassConfirm(true);
      isValid = false;
    } else {
      addErrorClassConfirm(false);
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
        <div className={styles["form_container"]}>
          <form className={styles["form"]}>
          {
              loading ?
              <Loading/> : 
              null
            }
              <p className={styles["form_title"]}>Register</p>
              <div>
              <label className={styles["input_container"]} htmlFor='email'>
                  <div className={styles["input_wrapper"]}>
                  <input 
                    ref={emailRef}
                    onChange={e => handleEmailChange(e.target.value)}  
                    name='email' 
                    type='email'
                    value={email} 
                    className={`${styles["input"]} `}/>
                    <span className={`${email === '' ? styles["input_label"] : styles["input_label-data"] } ${emailChanged && errorEmail && email !== '' ? styles["input-error"] : null}`}>Email</span>
                    </div>
              </label>
              <label className={styles["input_container"]} htmlFor='password'>
                  <div className={styles["input_wrapper"]}>
                  <input 
                    ref={passwordRef}
                    onChange={e => handlePasswordChange(e.target.value)}  
                    name='password' 
                    type={passwordHidden ? 'password' : 'text'}
                    value={password}
                    className={`${styles["input"]}`}/>
                    <span className={`${password === '' ? styles["input_label"] : styles["input_label-data"] } ${passwordChanged && errorPassword && password !== '' ? styles["input-error"] : null}`}>Password</span>
                  { 
                    passwordHidden ?
                    <HiEyeSlash className={styles["password-view-icon"]} onClick={() => setPasswordHidden(false)}/> : 
                    <HiEye className={styles["password-view-icon"]} onClick={() => setPasswordHidden(true)}/>
                  }
                  </div>
              </label>
              <label className={styles["input_container"]} htmlFor='confirm-password'>
                  <div className={styles["input_wrapper"]}>
                  <input 
                    ref={confirmRef}
                    onChange={e => handleConfirmChange(e.target.value)}  
                    name='confirm' 
                    type={passwordHidden ? 'password' : 'text'}
                    value={confirm} 
                    className={`${styles["input"]} ${styles["last_input"]} `}/>
                    <span className={`${confirm === '' ? styles["input_label"] : styles["input_label-data"] } ${confirmChanged && errorConfirm && confirm !== '' ? styles["input-error"] : null}`}>Confirm Password</span>
                    </div>
              </label>
              </div>
              <div className={styles["btn_flex"]}>
              <button onClick={(e) => createNewAccount(e)} className={styles["btn_closed"]}>
                <span>Register</span>
              </button>
              <button onClick={(e) => navigate('/')} className={styles["btn_open"]}>
                <span>Sign In</span>
              </button>
              </div>
              <Link to='/forgot-password' className={styles["sub_link"]}>Forgot your password?</Link>
              {
                emailChanged || passwordChanged || confirmChanged ?
              <div className={!!Object.keys(emailValidation).length || !!Object.keys(passwordValidation).length || !!Object.keys(confirmValidation).length  ? styles["error_messages-error"] : styles["error_messages-success"]}>
                {emailChanged ? 
                  Object.keys(emailValidation).map((key) => {
                    return (
                        <div className={styles["validation-error"]} key={key}>
                            <HiXCircle className={styles["validation-icon"]} size={16}/>
                            <p className={styles["validation-text"]}>{emailValidation[key]}</p>
                        </div>
                    );
                  }) : null}
                   { passwordChanged ?
                   Object.keys(passwordValidation).map((key) => {
                    return (
                        <div className={styles["validation-error"]} key={key}>
                            <HiXCircle className={styles["validation-icon"]} size={16}/>
                            <p className={styles["validation-text"]}>{passwordValidation[key]}</p>
                        </div>
                    );
                  }) : null}
                  {confirmChanged ?
                  Object.keys(confirmValidation).map((key) => {
                      return (
                          <div className={styles["validation-error"]} key={key}>
                              <HiXCircle  className={styles["validation-icon"]} size={16}/>
                              <p className={styles["validation-text"]}>{confirmValidation[key]}</p>
                          </div>
                      );
                    }) : null}

              {
                !Object.keys(emailValidation).length && !Object.keys(passwordValidation).length && !Object.keys(confirmValidation).length ?
                <div className={styles["validation-success"]}>
                        <HiCheckCircle className={styles["validation-icon_success"]} size={20}/>
                        <p className={styles["validation-text_success"]}>All Good</p>
                </div> :
                    null
                }
              </div> :
              null
            }
          </form>
          </div>
          </>
    )
  }