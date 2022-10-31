
import styles from '../styles/globals.module.css';
import { HiCheckCircle, HiInformationCircle, HiExclamationCircle } from 'react-icons/hi2';
import { HiOutlineX } from 'react-icons/hi';


export default function Alerts(props) {
    const { alertMessage, alertType, removeAlert } = props;
    return (
        <div className={styles["alert_container"]}>
            <div className={styles["alert_content"]}>
                <div className={styles["alert_content"]}>
                    {
                        alertType ?
                        <HiCheckCircle color='#2cbf4c' className={styles["alert_icon"]}/>
                        : <HiExclamationCircle color='#bf2c3d' className={styles["alert_icon"]}/>
                    }
                <p className={styles["alert_message"]}>{alertMessage}</p>
                </div>
                <HiOutlineX onClick={removeAlert} className={styles["alert_close"]} />
            </div>
        </div>
    )
}