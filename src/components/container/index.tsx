import React from 'react'
import './style.css'

type Props = {
  children: React.ReactElement
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className='container'>{children}</div>
  )
}
