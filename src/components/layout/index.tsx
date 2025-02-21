import React, { useEffect } from 'react'
import { Header } from '../header'
import { Container } from '../container'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUser } from '../../features/user/userSlice'
import './style.css'


export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/auth')
    }
  }, [])
  return (
    <>
      <Container>
        <div className="layout__wrapper">
          <div className="layout__top">
            <Header />
          </div>
          <div className="layout__bottom">
         
            <Outlet />
           
          </div>
        </div>
      </Container>
    </>
  )
}
