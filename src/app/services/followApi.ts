import { api } from './api'




export const followApi = api.injectEndpoints({
    endpoints: (builder) => ({
        followUser: builder.mutation<void, {followingId: string}>({
                query: (body) => ({
                    url: '/follow',
                    method: 'POST',
                    body
                })
            }),
           
           
            unFollowUser:  builder.mutation<void, string>({
                query: (postId) => ({
                    url: `/unfollow/${postId}`,
                    method: 'DELETE'
                   
                })
            }),
          
          
    }),
})

export const {
    useFollowUserMutation,
    useUnFollowUserMutation
} = followApi

export const {
    endpoints: {followUser, unFollowUser}
} = followApi