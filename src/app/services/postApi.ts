import { api } from "./api";
import { Post} from "../types";


export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
    
        createPost: builder.mutation<Post, FormData>({
            query: (postData) => ({
                url: '/posts',
                method: 'POST',
                body: postData
            })
        }),
        getAllPost: builder.query<Post[], void>({
        query: () => ({
            url: '/posts',
            method: 'GET'  
        })
    }),
        getPostById: builder.query<Post, string>({
        query: (id) => ({
            url: `/posts/${id}`,
            method: 'GET'  
        })
    }),
        deletePost: builder.mutation<void, string>({
        query: (id) => ({
            url: `/posts/${id}`,
            method: 'DELETE'  
        })
    }),
        


    })
})

export const {
   useCreatePostMutation,
   useGetAllPostQuery,
   useLazyGetAllPostQuery,
   useGetPostByIdQuery,
   useLazyGetPostByIdQuery,
   useDeletePostMutation
} = postApi;

export const {
    endpoints: {createPost, getAllPost, getPostById, deletePost}
} = postApi