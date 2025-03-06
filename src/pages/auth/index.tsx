import React, { useState } from 'react'
import { Logo } from '../../components/logo'
import './style.css'
import hearts from '../../img/hearts.png'
import { Container } from '../../components/container'
import { Login } from '../../features/user/login'
import { Register } from '../../features/user/register'
import { Toast } from '../../components/toast'


export const Auth = () => {
  const [selected, setSelected] = useState(true)
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const changeSelected = () => {
    setSelected(!selected)
  };

  const handleSuccessfulRegister = () => {
    setSelected(true);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
    }, 2000);
  };

  return (
    <Container>
      <div className='auth__wrapper'>
        <Logo />
        <Toast successMessage={successMessage}>Registration successful! 🎉</Toast>
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
              <Register onRegisterSuccess={handleSuccessfulRegister} />
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
