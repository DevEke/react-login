import './inputs.scss';
import React, {useState} from 'react';
import { IoAlertCircle, IoEye, IoEyeOff } from 'react-icons/io5';

const Input = React.forwardRef((props, ref) => {
    const { type, label, setValue, errors, name, placeholder, style, value, disabled } = props;
    const [passwordHidden, setPasswordHidden] = useState(true);

    return (
        <label htmlFor={name} className='input-wrapper'>
            <div className='input-container'>
                <input
                    disabled={disabled}
                    ref={ref}
                    className={`${style} ${ errors ? Object.keys(errors).length > 0 ? 'input-invalid' : null: null} input-base`}
                    type={name === 'password' ? passwordHidden ? 'password' : 'text' : type}
                    name={name}
                    onChange={setValue}
                    placeholder={placeholder}
                    style={{width: `100%`}}
                    value={value}
                />
                { name === 'password' ?
                    passwordHidden ?
                        <IoEyeOff onClick={() => setPasswordHidden(false)} className='input_password-icon'/> :
                        <IoEye onClick={() => setPasswordHidden(true)} className='input_password-icon'/> :
                    null
                }
            </div>
            <span className='input-label'>{label}</span>
            <div className='input-errors'>
                {
                    errors ?
                    Object.keys(errors).map((error, i) => {
                        return (
                            <div className='input-error' key={i}>
                                <IoAlertCircle className='input_error-icon'/>
                                <p className='input_error-text'>{errors[error]}</p>
                            </div>
                        )
                    }) :
                    null
                }
            </div>
            
        </label>
    )
})

export default Input;