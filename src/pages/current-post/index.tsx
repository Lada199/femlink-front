import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postApi';
import { Card } from '../../components/card';
import { CreateComments } from '../../components/create-comment';

import { CardComments } from '../../components/card-for-comments';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';






export const CurrentPost = () => {
  const  params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params?.id ?? '')
  const currentUser = useSelector(selectCurrent)







  if (!data) {
    return <h2>The event does not exist</h2>
  }
  const {
    content,
    id,
    authorId,
    comments,
    author,
    createdAt,
    dateOfStart,
    imageUrl,
    location,
    places,
    title,
    city,
  } = data;
  return (
    <div>
      <Card
        cardFor='current-post'
        isSavedPost={data.isSavedPost}
        key={id}
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        fullName={author.fullName ?? ''}
        commentsCount={comments?.length ?? 0}
        followersCount={data?.followers?.length ?? 0}
        savedCount={data?.savedBy?.length ?? 0}
        authorId={authorId}
        id={id}
        createdAt={createdAt}
        imageUrl={imageUrl}
        location={location}
        title={title}
        dateOfStart={dateOfStart}
        places={places}
        city={city}
        followers={data?.followers ?? []} 
      
  currentUserId={currentUser?.id ?? ''}

      />
 
  
      <div>
      </div>
      <div className="comments__wrapper">
        <CreateComments/>
        <div className="comments__items">
        {
  data.comments ? 
  [...data.comments].reverse().map((comment) => (
    <CardComments
      cardFor='comment'
      key={comment.id}
      avatarUrl={comment.user.avatarUrl ?? ''}
      content={comment.content}
      fullName={comment.user.fullName ?? ''}
      authorId={comment.userId}
      commentId={comment.id}
      id={id}
      createdAt={comment.createdAt ?? ''}
    />
  )) : null
}
        </div>

      </div>
    </div>
  )
}
