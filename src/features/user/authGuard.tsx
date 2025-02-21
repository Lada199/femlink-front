import React from 'react'
import { useCurrentQuery } from '../../app/services/userApi'

export const AuthGuard = ({
    children
}: {children: JSX.Element}) => {
    const {isLoading} = useCurrentQuery();
    if(isLoading) {
        return <div>loading...</div>
    }
  return children
}
