import React, { useState } from 'react'
import { Logo } from '../../components/logo'
import './style.css'
import hearts from '../../img/hearts.png'
import { Container } from '../../components/container'
import { Login } from '../../features/user/login'
import { Register } from '../../features/user/register'
import video from '../../img/6010397_4k_Alcohol_3840x2160 (1).mp4'

export const Auth = () => {
  const [selected, setSelected] = useState(true)
  const changeSelected = () => {
    setSelected(!selected)
  };
  return (
    <Container>
      <div className='auth__wrapper'>
        <Logo />
        <div className="auth__content">
          <div className="auth__form">
            <div className="auth__title">Welcome, <span>Beautiful</span>! </div>
          {selected ?
              <div className="text">
               First time here? <span onClick={changeSelected}>Sign up </span> </div>
              :
              <div className="text" >
                Do you already have an account?  <span onClick={changeSelected}>Sign in</span>  </div>
            }
            {selected ? <div className="login">

              <Login />
            </div> : <div className="register">
              <Register />
            </div>}
           
          </div>
        </div>
        <div className="auth__bottom">
          <img src={hearts} alt="" />
        </div>
      </div>
    </Container>
  )
}
