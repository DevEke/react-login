import { useRef, useEffect, useState } from 'react';
import styles from '../styles/auth.module.css';
import { HiCheckCircle, HiXCircle, HiEye, HiEyeSlash } from 'react-icons/hi2';
import { HiLogin, HiUserCircle, HiOutlinePlusCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function Login({signIn}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailValidation, checkEmailValidation] = useState({});
    const [ passwordValidation, checkPasswordValidation] = useState({});
    const [ errorPassword, addErrorClassPassword] = useState(false);
    const [ errorEmail, addErrorClassEmail] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function signIntoAccount(e) {
      setLoading(true);
      let isValid = validateCredentials();
      e.preventDefault();
      setEmailChanged(true);
      setPasswordChanged(true);
      if (isValid) {
        signIn(email, password);
      }
      setLoading(false)
      
    }

    function signOutOfAccount(e) {
      e.preventDefault();
      signOut();
    }

    const handleEmailChange = (x) => {
      setEmailChanged(true)
      setEmail(x)
    }
  
    const handlePasswordChange = (x) => {
      setPasswordChanged(true)
      setPassword(x)
    }

    const validateCredentials = () => {
      const emailValidation = {};
      const passwordValidation = {};
      let isValid = true;
      if (!email.includes(".") || !email.includes("@")) {
        emailValidation.emailInvalid = "Enter a valid email address.";
        addErrorClassEmail(true);
        isValid = false;
      } else {
        addErrorClassPassword(false);
      }
      if (password.trim().length < 5) {
        passwordValidation.passwordMissing = "Password must be at least 5 characters long.";
        addErrorClassPassword(true);
        isValid = false;
      } else {
        addErrorClassPassword(false);
      }

      checkEmailValidation(emailValidation);
      checkPasswordValidation(passwordValidation);
      return isValid;
  }


  useEffect(() => {
    validateCredentials()
    return () => {
      setLoading(false)
    }
  }, [email, password])

  


    return (
      <>
        <div className={styles["form_container"]}>
          <form className={styles["form"]}>
            {
              loading ?
              <Loading/> : 
              null
            }
            <p className={styles["form_title"]}>Sign In</p>
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
                className={`${styles["input"]} ${styles["last_input"]} `}/>
                <span className={`${password === '' ? styles["input_label"] : styles["input_label-data"] } ${passwordChanged && errorPassword && password !== '' ? styles["input-error"] : null }`}>Password</span>
              { 
                passwordHidden ?
                <HiEyeSlash className={styles["password-view-icon"]} onClick={() => setPasswordHidden(false)}/> : 
                <HiEye className={styles["password-view-icon"]} onClick={() => setPasswordHidden(true)}/>
              }
              </div>
            </label>
            </div>
            <div className={styles["btn_flex"]}> 
              <button onClick={(e) => signIntoAccount(e)} className={styles["btn_closed"]}>
                <span className={styles["btn_text"]}>Sign In</span>
              </button>
              <button onClick={() => navigate('/create-account')} className={styles["btn_open"]}>
                <span>Register</span>
              </button>
            </div>
          <Link to='/forgot-password' className={styles["sub_link"]}>Forgot your password?</Link>
          {
            emailChanged || passwordChanged ?
          <div className={!!Object.keys(emailValidation).length || !!Object.keys(passwordValidation).length  ? styles["error_messages-error"] : styles["error_messages-success"]}>
            {emailChanged ? 
            Object.keys(emailValidation).map((key) => {
                return (
                    <div className={styles["validation-error"]} key={key}>
                        <HiXCircle className={styles["validation-icon"]} size={20}/>
                        <p className={styles["validation-text"]}>{emailValidation[key]}</p>
                    </div>
                );
              }) : null}
            { passwordChanged ?
            Object.keys(passwordValidation).map((key) => {
                return (
                    <div className={styles["validation-error"]} key={key}>
                        <HiXCircle className={styles["validation-icon"]} size={20}/>
                        <p className={styles["validation-text"]}>{passwordValidation[key]}</p>
                    </div>
                );
              }): null}
              {
                !Object.keys(emailValidation).length && !Object.keys(passwordValidation).length ?
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