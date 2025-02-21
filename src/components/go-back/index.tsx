import React from 'react'
import { Button } from '../button'
import { useNavigate } from 'react-router-dom'

export const GoBAck = () => {
    const navigate = useNavigate()
    const handleGoBack= () => {
        navigate(-1)
    }
  return (
   <Button className='btn' onClick={handleGoBack} >Back</Button>
  )
}
