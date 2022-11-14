import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import Loading from '../components/Loading';
import { HiUserCircle } from 'react-icons/hi';
import Confirm from '../components/Confirm';
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
        <div className="dashboard-container">
          {
            confirmModal ?
            <div className="confirm-modal_container">
              <Confirm 
                confirmMessage='Are you sure you want to delete your account? This is permanent.'
                confirm={() => deleteAccount(user._id)}
                cancel={() => setConfirmModal(false)}
              />
            </div>:
            null
          }
          <div className="dashboard-contents">
          {
              loading ?
              <Loading/> : 
              null
            }
            <div className="data_avatar">
              <HiUserCircle size={94} color='#2c2c2c'/>
            </div>
            <div className="inputs-container">
            <Input
                value={user?._id}
                type='text'
                label='ID Number'
                name='id'
                disabled={true}
                style="input-styles"
              />
              <Input
                value={user?.email}
                type='email'
                label='Email'
                name='email'
                disabled={true}
                style="input-styles"
              />
              <Input
                value={`${format(parseISO(user?.joinedDate), 'PP')}`}
                type='text'
                label='Joined'
                name='joined'
                disabled={true}
                style="input-styles"
              />
            </div>
            <div className="btn_flex">
              <Button
                action={() => navigate('/reset-password')}
                style="btn_closed"
                label='Reset Password'
              />
              <Button
                action={(e) => signOutOfAccount(e)}
                style="btn_open"
                label='Sign Out'
              />
              <Button
                action={() => setConfirmModal(true)}
                style="btn_delete"
                label='Delete Account'
              />
            </div>
          </div>
        </div>
        : null
      }
        
      </>
    );
  }
