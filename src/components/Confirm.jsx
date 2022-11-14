
import {  HiExclamationCircle } from 'react-icons/hi2';
import Button from './Buttons/Button';


export default function Confirm(props) {
    const { confirmMessage, confirm, cancel } = props;
    return (
        <div className="confirm_container">
            <div className="confirm_content">
                <HiExclamationCircle className="confirm_icon"/>
                <p className="confirm_message">{confirmMessage}</p>
                <div className="confirm_btns">
                    <Button
                        action={confirm}
                        style="btn_delete"
                        label='Delete Account'
                    />
                    <Button
                        action={cancel}
                        style="btn_open"
                        label='Cancel'
                    />
                </div>
            </div>
        </div>
    )
}