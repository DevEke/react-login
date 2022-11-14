import { useRef, useState, useEffect } from 'react';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function Forgot({forgotPassword, resetForgotPassword}) {
  const form = useRef(null);
  const emailRef = useRef(null);
  const [ email, setEmail ] = useState('');
  const [ emailValidation, checkEmailValidation ] = useState({});
  const [ codeSent, setCodeSent ] = useState(false);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const verifyRef = useRef(null);
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ verify, setVerify ] = useState('');
  const [ passwordValidation, checkPasswordValidation ] = useState({});
  const [ confirmValidation, checkConfirmValidation ] = useState({});
  const [ verifyValidation, checkVerifyValidation ] = useState({});
  const navigate = useNavigate();

  const sendResetVerificationCode = (e) => {
    e.preventDefault();
    const isValid = validateEmail();
    if (isValid) {
      forgotPassword(email);
      setCodeSent(true);
    } 
  }

  const submitResetForgotPassword =(e) => {
    e.preventDefault();
    const isValid = validateCredentials();
    if (isValid) {
      resetForgotPassword(email, verify, password);
      navigate('/');
    }
  }

  const validateEmail = () => {
    const emailValidation = {};
    let isValid = true;
    if (!email.includes(".") || !email.includes("@")) {
      emailValidation.emailInvalid = "Enter a valid email address.";
      isValid = false;
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
      isValid = false
    }
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
    checkVerifyValidation(verifyValidation);
    return isValid;
  }

  useEffect(() => {
    validateCredentials()
  }, [email, password, verify, confirm])


    return (

      <>
        <div className="form_container">
          <form ref={form} className="form">
            <p className="form_title">Forgot Password</p>
            {
              !codeSent ?
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
              </div> :
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
                  disabled={true}
                />
                <Input
                  ref={verifyRef}
                  setValue={e => setVerify(e.target.value)}
                  name='verify'
                  value={verify}
                  label='Verification Code'
                  style="input-styles"
                  errors={verifyValidation}
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
            }
            {
              !codeSent ?
              <div className="btn_flex">
                <Button
                  action={(e) => sendResetVerificationCode(e)}
                  style="btn_closed"
                  label='Send Reset Link'
                />
                <Button
                  action={() => navigate('/create-account')}
                  style="btn_open"
                  label='Back to Register'
                />
                <Button
                  action={() => navigate('/')}
                  style="btn_open"
                  label='Back to Sign In'
                />
            </div> :
            <div className="btn_flex">
              <Button
                  action={(e) => submitResetForgotPassword(e)}
                  style="btn_closed"
                  label='Reset Password'
                />
                <Button
                  action={(e) => sendResetVerificationCode(e)}
                  style="btn_closed"
                  label='Resend Reset Link'
                />
                <Button
                  action={() => navigate('/create-account')}
                  style="btn_open"
                  label='Back to Register'
                />
                <Button
                  action={() => navigate('/')}
                  style="btn_open"
                  label='Back to Sign In'
                />
            </div>
            }
          </form>
          </div>
        </>
    )
  }