import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom';
import './style.css'
type Props = {
  children: React.ReactElement | string;
  href: string
}

export const NavButton: React.FC<Props> = ({
  children,
  href
}) => {
  return (
    <Button className='btn-link'>
      <Link to={href}>
        {children}
      </Link>
    </Button>
  )
}
