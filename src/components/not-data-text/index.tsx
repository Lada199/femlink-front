import React from 'react'

type Props = {
    children: string
  }

export const NotDataText: React.FC<Props> = ({children}) => {
  return (
    <p className="Not__found__post">{children}</p>
  )
}
