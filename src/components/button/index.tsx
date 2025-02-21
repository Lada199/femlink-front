import React from 'react'
import './style.css'

type Props = {
    children: React.ReactElement[] | React.ReactElement | string;
    className?: string;
    onClick?: React.MouseEventHandler
    type?: 'button' | 'submit' | 'reset';
 
}

export const Button:  React.FC<Props> = ({
    children,
    className,
    onClick,

    type
}) => {
  return (
   <button
    className={className}
    onClick={onClick}
    type={type}
    >
         {children}
     </button>
  )
}
