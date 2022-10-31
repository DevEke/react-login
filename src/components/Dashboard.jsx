import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, formatDistance } from 'date-fns';
import axios from 'axios';
import styles from '../styles/dashboard.module.css';
import Loading from './Loading';
import { HiUserCircle } from 'react-icons/hi';
import Confirm from './Confirm';
const host = localStorage.getItem('host');
const auth = localStorage.getItem('auth');


export default function Dashboard(props) {
  const {user, signOut, getUser, deleteAccount} = props;
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function signOutOfAccount(e) {
    setLoading(true)
    e.preventDefault();
    signOut();
  }

  useEffect(() => {
    getUser()
    return () => {
      setLoading(false)
    }
  }, [])

    return (
      <>
      {
        user ?
        <div className={styles["dashboard-container"]}>
          {
            confirmModal ?
            <div className={styles["modal_container"]}>
              <Confirm 
                confirmMessage='Are you sure you want to delete your account? This is permanent.'
                confirm={() => deleteAccount(user._id)}
                cancel={() => setConfirmModal(false)}
              />
            </div>:
            null
          }
          <div className={styles["dashboard-contents"]}>
          {
              loading ?
              <Loading/> : 
              null
            }
            <div className={styles["data_avatar"]}>
              <HiUserCircle size={94} color='#2c2c2c'/>
            </div>
            <div className={styles["inputs"]}>
            <label className={styles["input_container"]} htmlFor='id'>
            <div className={styles["input_wrapper"]}>
            <input
                disabled
                name='id' 
                type='text'
                value={user?._id}
                className={`${styles["input"]} `}/>
                <span className={`${styles["input_label-data"] }`}>ID Number</span> 
            </div>
            </label>
            <label className={styles["input_container"]} htmlFor='email'>
            <div className={styles["input_wrapper"]}>
            <input
                disabled
                name='email' 
                type='email'
                value={user?.email}
                className={`${styles["input"]} `}/>
                <span className={`${styles["input_label-data"] }`}>Email</span> 
            </div>
            </label>
            <label className={styles["input_container"]} htmlFor='joined'>
            <div className={styles["input_wrapper"]}>
            <input
                disabled
                name='joined' 
                type='text'
                value={`${format(parseISO(user?.joinedDate), 'PP')}`}
                className={`${styles["input"]}  ${styles["last_input"]}`}/>
                <span className={`${styles["input_label-data"] }`}>Joined</span> 
            </div>
            </label>
            </div>
            <div className={styles["btn_flex"]}> 
            <button className={styles["btn_closed"]} onClick={() => navigate('/reset-password')}>
              Reset Password
            </button>
            <button className={styles["btn_open"]} onClick={(e) => signOutOfAccount(e)}>
              Sign Out
            </button>
            <button onClick={() => setConfirmModal(true)} className={`${styles["delete-account"]}`}>
              Delete Account
            </button>
            </div>
          </div>
        </div>
        : null
      }
        
      </>
    );
  }
