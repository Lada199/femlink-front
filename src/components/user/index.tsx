import React from 'react'

type Props = {
    fullName: string,
    avatarUrl: string,
    bio?: string,
    className?: string,
}

export const User: React.FC<Props> = ({
    fullName ="",
    avatarUrl = "",
    bio = "",
    className = "",
}) => {
  return (
    <div>
        
    </div>
  )
}
