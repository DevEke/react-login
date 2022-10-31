
import styles from '../styles/globals.module.css';
import { HiCheckCircle, HiInformationCircle, HiExclamationCircle } from 'react-icons/hi2';
import { HiOutlineX } from 'react-icons/hi';


export default function Confirm(props) {
    const { confirmMessage, confirm, cancel } = props;
    return (
        <div className={styles["confirm_container"]}>
            <div className={styles["confirm_content"]}>
                <HiExclamationCircle className={styles["confirm_icon"]}/>
                <p className={styles["confirm_message"]}>{confirmMessage}</p>
                <div className={styles["confirm_btns"]}>
                    <button onClick={confirm} className={styles["confirm_btn-confirm"]}>Delete Account</button>
                    <button onClick={cancel} className={styles["confirm_btn-cancel"]}>Cancel</button>
                </div>
            </div>
        </div>
    )
}