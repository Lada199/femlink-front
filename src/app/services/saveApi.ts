import { api } from './api'




export const saveApi = api.injectEndpoints({
    endpoints: (builder) => ({
        savePost: builder.mutation<void, {savedPostId: string}>({
                query: (body) => ({
                    url: '/save',
                    method: 'POST',
                    body
                })
            }),
           
           
            deleteSavedPost:  builder.mutation<void, string>({
                query: (postId) => ({
                    url: `/unsave/${postId}`,
                    method: 'DELETE'
                   
                })
            }),
          
          
    }),
})

export const {
    useSavePostMutation,
    useDeleteSavedPostMutation

} = saveApi

export const {
    endpoints: {savePost, deleteSavedPost}
} = saveApi