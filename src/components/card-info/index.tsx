import React from 'react'
import './style.css'

type Props = {
  className?: string,
  children: React.ReactNode;
  cardFor?: string
}

export const CardInfo: React.FC<Props> = ({ children, className, cardFor }) => {
  return (
    <div className={`card__info ${className ? className : ''} ${cardFor === 'current-post' ? '' : 'word-noWrap'} `} >{children}</div>
  )
}
