import { useRef, useEffect, useState } from 'react';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Login({signIn}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailValidation, checkEmailValidation ] = useState({});
    const [ passwordValidation, checkPasswordValidation ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    function signIntoAccount(e) {
      setLoading(true);
      let isValid = validateCredentials();
      e.preventDefault();
      if (isValid) {
        signIn(email, password);
      }
      setLoading(false)
      
    }

    const validateCredentials = () => {
      const emailValidation = {};
      const passwordValidation = {};
      let isValid = true;
      if (!email.includes(".") || !email.includes("@")) {
        emailValidation.emailInvalid = "Enter a valid email address.";
        isValid = false;
      }
      if (password.trim().length < 5) {
        passwordValidation.passwordMissing = "Password must be at least 5 characters long.";
        isValid = false;
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
        <div className="form_container">
          <form className="form">
            {
              loading ?
              <Loading/> : 
              null
            }
            <p className="form_title">Sign In</p>
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
            </div>
            <div className="btn_flex"> 
              <Button
                action={(e) => signIntoAccount(e)}
                style="btn_closed"
                label='Sign In'
              />
              <Button
                action={() => navigate('/create-account')}
                style="btn_open"
                label='Register'
              />
            </div>
          <Link to='/forgot-password' className="sub_link">Forgot your password?</Link>
          </form>
      </div>
      </>
      )
  }