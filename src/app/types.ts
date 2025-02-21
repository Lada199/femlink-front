export type User = {
    id: string 
  email:string
  password: string
  fullName?:string
  avatarUrl?:string
  dateOfBirth?: Date
  createdAt?: Date
  updatedAt?: Date
  bio?: string
  location?: string
  posts: Post[]
  comments: Comment[]
  following:Follows[]
  savedPost:Save[]
}
export type Post = {
    id: string
    title: string
    location: string
    content: string
    imageUrl:string
    dateOfStart: Date,
    isSavedPost: Boolean,
    city:string
    places: number
    author:User     
    authorId: string 
    comments: Comment[]
    followers: Follows[]
    savedBy: Save[]
    createdAt:   Date  
}
export type Follows = {
    id: string 
    followerId:  string 
    follower: User  
    following: Post   
    followingId: string 
   
}
export type Save = {
  id: string         
  userSaved: string    
  userSavedId: User
  savedPost: Post  
  savedPostId: string
   
}
export type Comment = {
    id: string 
  content: string
  user:    User   
  userId:  string 
  post:    Post   
  postId:  string 
  createdAt:   Date  
}