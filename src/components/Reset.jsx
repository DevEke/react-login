import { Link, useNavigate }from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import { HiCheckCircle,HiXCircle, HiEye, HiEyeSlash } from 'react-icons/hi2';
import Loading from './Loading'

export default function Reset({user, resetPassword}) {
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ passwordValidation, checkPasswordValidation] = useState({});
  const [ confirmValidation, checkConfirmValidation] = useState({});
  const [ errorPassword, addErrorClassPassword] = useState(false);
  const [ errorConfirm, addErrorClassConfirm] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [confirmChanged, setConfirmChanged] = useState(false);
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitResetPassword = (e) => {
    setLoading(true);
    e.preventDefault();
    const isValid = validateCredentials();
    if (isValid) {
      resetPassword(password)
    }
    setLoading(false)

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
    const passwordValidation = {};
    const confirmValidation = {};
    let isValid = true;
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
    return isValid;

  }

  useEffect(() => {
    validateCredentials()
  }, [confirm, password])


    return (

      <>
        <div className={styles["form_container"]}>
          <form className={styles["form"]}>
          {
              loading ?
              <Loading/> : 
              null
            }
            <div className={styles["logo"]}/>
            <p className={styles["form_title"]}>Enter New Password</p>
            <div>
            <label className={`${styles["input_container"]}`} htmlFor='password'>
                <div className={styles["input_wrapper"]}>
                <input 
                ref={passwordRef} 
                name='password' 
                onChange={e => handlePasswordChange(e.target.value)} 
                type={passwordHidden ? 'password' : 'text'}
                value={password}
                className={`${styles["input"]}`}/>
                <span className={`${password === '' ? styles["input_label"] : styles["input_label-data"] } ${passwordChanged && errorPassword ? styles["input-error"] : null }`}>Password</span>
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
                <span className={`${confirm === '' ? styles["input_label"] : styles["input_label-data"] } ${confirmChanged && errorConfirm ? styles["input-error"] : null}`}>Confirm Password</span>
                </div>
            </label>
            </div>
            <div className={styles["btn_flex"]}> 
            <button onClick={(e) => submitResetPassword(e)} className={styles["btn_closed"]}>Reset Password</button>
            <button onClick={() => navigate('/dashboard')} className={styles["btn_open"]}>Cancel</button>
            </div>
            
            {
               passwordChanged || confirmChanged ?
              <div className={ !!Object.keys(passwordValidation).length ||  !!Object.keys(confirmValidation).length ? styles["error_messages-error"] : styles["error_messages-success"]}>
                {
                  passwordChanged ?
                  Object.keys(passwordValidation).map((key) => {
                    return (
                      <div className={styles["validation-error"]} key={key}>
                          <HiXCircle className={styles["validation-icon"]} size={16}/>
                          <p className={styles["validation-text"]}>{passwordValidation[key]}</p>
                      </div>
                    );
                  }) : null
                }
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
                !Object.keys(passwordValidation).length && !Object.keys(confirmValidation).length  ?
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