import React from 'react'
import { NavButton } from '../nav-button'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrent, selectIsAuthenticated} from '../../features/user/userSlice';
import { Button } from '../button';
import { GoBAck } from '../go-back';
import { getUserById } from '../../app/services/userApi';



export const Header = () => {
  const current = useSelector(selectCurrent)
  const params = useParams<{ id: string }>();

  
 
  const location = useLocation();
  if(!current){
    return null
  }
  const {id} = current;

  const isFullPostPage =  location.pathname === `/users/${id}` || location.pathname === '/add-event' ||  location.pathname === `/posts/${params.id}` || location.pathname === `/users/${params.id}`;
  const isAddpostPage = location.pathname === '/add-event';
  const isProfilePage = location.pathname === `/users/${id}`
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () =>{
    dispatch(logout());
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
 
      <div className="wrapper">
        {isFullPostPage && (
          <NavButton href='/'>
            All events
          </NavButton>
        )}
        {isAddpostPage ? '' : <NavButton href='add-event'>
          Аdd Event
        </NavButton>}

          {!isProfilePage && (  <NavButton href={`users/${id}`}>
          My profil
        </NavButton>)}
        {
          isAuthenticated &&  isProfilePage && (
            <Button className='btn-link' onClick={handleLogout} >Log out </Button>
          )
        }
      </div>
   
  )
}
