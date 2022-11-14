import { Link, useNavigate }from 'react-router-dom';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import { useRef, useState, useEffect } from 'react';
import Loading from '../components/Loading'

export default function Reset({user, resetPassword}) {
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ passwordValidation, checkPasswordValidation] = useState({});
  const [ confirmValidation, checkConfirmValidation] = useState({});
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


  const validateCredentials = () => {
    const passwordValidation = {};
    const confirmValidation = {};
    let isValid = true;
    if (password.trim().length < 5) {
      passwordValidation.passwordMissing = "Password must be at least 5 characters long.";
      isValid = false;
    }
    if ( confirm !== password) {
      confirmValidation.passwordsDontMatch = "Your passwords don't match.";
      isValid = false;
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
        <div className="form_container">
          <form className="form">
          {
              loading ?
              <Loading/> : 
              null
            }
            <div className="logo"/>
            <p className="form_title">Enter New Password</p>
            <div>
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
              action={(e) => submitResetPassword(e)}
              style="btn_closed"
              label='Reset Password'
              />
              <Button
              action={() => navigate('/dashboard')}
              style="btn_open"
              label='Cancel'
              />
            </div>
          </form>
          </div>
        </>
    )
  }