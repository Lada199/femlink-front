import React from 'react'

type Props = {
    children: string
  }

export const Title: React.FC<Props> = ({children}) => {
  return (
    <h4 className="title">{children}</h4>
  )
}
