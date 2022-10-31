import styles from '../styles/auth.module.css';
import { ImSpinner8 } from "react-icons/im"


export default function Loading() {

    return (
        <div className={styles["loading_wrapper"]}>
            <ImSpinner8  className={styles["loading_icon"]} size={48}/>
        </div>
    )
}