import './button.scss';

const Button = (props) => {
    const {action, label, icon, style} = props;
    return (
        <button
            onClick={action}
            className={`${style} btn-base`}
        >
        {icon}
        {label === '' ? null : <p className='btn-label'>{label}</p>} 
        </button>
    )
}

export default Button;