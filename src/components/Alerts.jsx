
import { HiCheckCircle, HiInformationCircle, HiExclamationCircle } from 'react-icons/hi2';
import { HiOutlineX } from 'react-icons/hi';


export default function Alerts(props) {
    const { alertMessage, alertType, removeAlert } = props;
    return (
        <div className="alert_container">
            <div className="alert_content">
                <div className="alert_content">
                    {
                        alertType ?
                        <HiCheckCircle color='#2cbf4c' className="alert_icon"/>
                        : <HiExclamationCircle color='#bf2c3d' className="alert_icon"/>
                    }
                <p className="alert_message">{alertMessage}</p>
                </div>
                <HiOutlineX onClick={removeAlert} className="alert_close" />
            </div>
        </div>
    )
}