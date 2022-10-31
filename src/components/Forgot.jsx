import { useRef, useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import {  HiXCircle, HiEye, HiEyeSlash} from 'react-icons/hi2';
import { HiCheckCircle, HiLogin, HiUserCircle, HiMail, HiOutlinePlusCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

export default function Forgot({forgotPassword, resetForgotPassword}) {
  const form = useRef(null);
  const emailRef = useRef(null);
  const [ email, setEmail ] = useState('');
  const [ emailValidation, checkEmailValidation] = useState({});
  const [ errorEmail, addErrorClassEmail] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const verifyRef = useRef(null);
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [verify, setVerify] = useState('');
  const [ passwordValidation, checkPasswordValidation] = useState({});
  const [ confirmValidation, checkConfirmValidation] = useState({});
  const [ verifyValidation, checkVerifyValidation] = useState({});
  const [ errorPassword, addErrorClassPassword] = useState(false);
  const [ errorConfirm, addErrorClassConfirm] = useState(false);
  const [ errorVerify, addErrorClassVerify] = useState(false);    
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [confirmChanged, setConfirmChanged] = useState(false);
  const [verifyChanged, setVerifyChanged] = useState(false);
  const navigate = useNavigate();

  const sendResetVerificationCode = (e) => {
    e.preventDefault();
    setEmailChanged(true);
    const isValid = validateEmail();
    if (isValid) {
      forgotPassword(email);
      setCodeSent(true);
    } 
  }

  const submitResetForgotPassword =(e) => {
    e.preventDefault();
    setPasswordChanged(true);
    setConfirmChanged(true);
    setVerifyChanged(true);
    const isValid = validateCredentials();
    if (isValid) {
      resetForgotPassword(email, verify, password);
      navigate('/');
    }
  }

  const handleEmailChange = (x) => {
    setEmailChanged(true)
    setEmail(x)
  }
  const handleVerifyChange = (x) => {
    setVerifyChanged(true)
    setVerify(x)
  }
  const handlePasswordChange = (x) => {
    setPasswordChanged(true)
    setPassword(x)
  }
  const handleConfirmChange = (x) => {
    setConfirmChanged(true)
    setConfirm(x)
  }

  const validateEmail = () => {
    const emailValidation = {};
    let isValid = true;
    if (!email.includes(".") || !email.includes("@")) {
      emailValidation.emailInvalid = "Enter a valid email address.";
      addErrorClassEmail(true);
      isValid = false;
    } else {
      addErrorClassEmail(false);
    }
    checkEmailValidation(emailValidation);
    return isValid;
  }

  const validateCredentials = () => {
    const passwordValidation = {};
    const confirmValidation = {};
    const verifyValidation = {};
    let isValid = true;
    if (verify.trim().length === 0) {
      verifyValidation.verificationCodeMissing = "Please enter the verification code.";
      addErrorClassVerify(true);
      isValid = false
    } else {
      addErrorClassVerify(false)
    }
    if (password.trim().length < 5) {
      passwordValidation.passwordMissing = "Password must be at least 5 characters long.";
      addErrorClassPassword(true);
      isValid = false;
    } else {
      addErrorClassPassword(false);
    }
    if ( confirm !== password) {
      confirmValidation.passwordsDontMatch = "Your passwords don't match.";
      addErrorClassConfirm(true);
      isValid = false;
    } else {
      addErrorClassConfirm(false);
    }
    checkPasswordValidation(passwordValidation);
    checkConfirmValidation(confirmValidation);
    checkVerifyValidation(verifyValidation);
    return isValid;
  }

  useEffect(() => {
    validateCredentials()
  }, [email, password, verify, confirm])


    return (

      <>
        <div className={styles["form_container"]}>
          <form ref={form} className={styles["form"]}>
            <p className={styles["form_title"]}>Forgot Password</p>
            {
              !codeSent ?
              <div>
                <label className={styles["input_container"]} htmlFor='email'>
                  <div className={styles["input_wrapper"]}>
                    <input
                      ref={emailRef}
                      onChange={e => handleEmailChange(e.target.value)} 
                      name='email' 
                      type='email'
                      value={email}
                      className={`${styles["input"]} ${styles["last_input"]}`}/>
                    <span className={`${email === '' ? styles["input_label"] : styles["input_label-data"] } ${emailChanged && errorEmail ? styles["input-error"] : null}`}>Email</span>
                  </div>
                </label>
              </div> :
              <div>
                <label className={styles["input_container"]} htmlFor='email'>
                  <div className={styles["input_wrapper"]}>
                    <input
                      disabled
                      name='email' 
                      type='email'
                      value={email}
                      className={`${styles["input"]}`}/>
                    <span className={`${email === '' ? styles["input_label"] : styles["input_label-data"] } ${emailChanged && errorEmail ? styles["input-error"] : null}`}>Email</span>
                  </div>
                </label>
                <label className={styles["input_container"]} htmlFor='verify'>
            <div className={styles["input_wrapper"]}>
              <input
                ref={verifyRef}
                name='verify'
                onChange={e => handleVerifyChange(e.target.value)}
                type='text'
                value={verify}
                className={`${styles["input"]}`}/>
                <span className={`${verify === '' ? styles["input_label"] :styles["input_label-data"]  } ${verifyChanged && errorVerify ? styles["input-error"] : null}`}>Verification Code</span>
                </div>
            </label>
            <label className={`${styles["input_container"]}`} htmlFor='password'>
                <div className={styles["input_wrapper"]}>
                <input 
                ref={passwordRef} 
                name='password' 
                onChange={e => handlePasswordChange(e.target.value)} 
                type={passwordHidden ? 'password' : 'text'}
                value={password}
                className={`${styles["input"]}`}/>
                <span className={`${password === '' ? styles["input_label"] : styles["input_label-data"] } ${passwordChanged && errorPassword ? styles["input-error"] : null }`}>New Password</span>
                { 
                    passwordHidden ?
                    <HiEyeSlash className={styles["password-view-icon"]} onClick={() => setPasswordHidden(false)}/> : 
                    <HiEye className={styles["password-view-icon"]} onClick={() => setPasswordHidden(true)}/>
                  }
                </div>
            </label>
            <label className={styles["input_container"]} htmlFor='confirm'>
                <div className={`${styles["input_wrapper"]}`}>
                <input 
                ref={confirmRef} 
                name='confirm'
                onChange={e => handleConfirmChange(e.target.value)} 
                type={passwordHidden ? 'password' : 'text'}
                value={confirm} 
                className={`${styles["input"]} ${styles["last_input"]}`}/>
                <span className={`${confirm === '' ? styles["input_label"] : styles["input_label-data"] } ${confirmChanged && errorConfirm ? styles["input-error"] : null}`}>Confirm New Password</span>
                </div>
            </label>
              </div>
            }
            {
              !codeSent ?
              <div className={styles["btn_flex"]}> 
            <button onClick={(e) => sendResetVerificationCode(e)} className={styles["btn_closed"]}>
              <span>Send Reset Link</span>
            </button>
            <button onClick={() => navigate('/create-account')} className={styles["btn_open"]}>
              <span>Back to Register</span>
            </button>
            <button onClick={() => navigate('/')} className={styles["btn_open"]}>
              <span>Back to Sign In</span>
            </button>
            </div> :
            <div className={styles["btn_flex"]}> 
            <button onClick={(e) => submitResetForgotPassword(e)} className={styles["btn_closed"]}>
              <span>Reset Password</span>
            </button>
            <button onClick={(e) => sendResetVerificationCode(e)} className={styles["btn_closed"]}>
              <span>Resend Reset Link</span>
            </button>
            <button onClick={() => navigate('/create-account')} className={styles["btn_open"]}>
              <span>Back to Register</span>
            </button>
            <button onClick={() => navigate('/')} className={styles["btn_open"]}>
              <span>Back to Sign In</span>
            </button>
            </div>

            }
            
            {
            emailChanged || passwordChanged || confirmChanged || verifyChanged ?
          <div className={!!Object.keys(emailValidation).length ||  !!Object.keys(passwordValidation).length || !!Object.keys(confirmValidation).length || !!Object.keys(verifyValidation).length ? styles["error_messages-error"] : styles["error_messages-success"]}>
            {emailChanged ? 
            Object.keys(emailValidation).map((key) => {
                return (
                    <div className={styles["validation-error"]} key={key}>
                        <HiXCircle className={styles["validation-icon"]} size={20}/>
                        <p className={styles["validation-text"]}>{emailValidation[key]}</p>
                    </div>
                );
              }) : null}
              {verifyChanged ?
              Object.keys(verifyValidation).map((key) => {
                return (
                    <div className={styles["validation-error"]} key={key}>
                        <HiXCircle className={styles["validation-icon"]} size={20}/>
                        <p className={styles["validation-text"]}>{verifyValidation[key]}</p>
                    </div>
                );
              }) : null}
              {passwordChanged ?
              Object.keys(passwordValidation).map((key) => {
                return (
                    <div className={styles["validation-error"]} key={key}>
                        <HiXCircle className={styles["validation-icon"]} size={20}/>
                        <p className={styles["validation-text"]}>{passwordValidation[key]}</p>
                    </div>
                );
              }) : null}
              {confirmChanged ?
              Object.keys(confirmValidation).map((key) => {
                return (
                    <div className={styles["validation-error"]} key={key}>
                        <HiXCircle className={styles["validation-icon"]} size={20}/>
                        <p className={styles["validation-text"]}>{confirmValidation[key]}</p>
                    </div>
                );
              }) : null}
              {
                !Object.keys(emailValidation).length && !Object.keys(passwordValidation).length && !Object.keys(confirmValidation).length && !Object.keys(verifyValidation).length ?
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