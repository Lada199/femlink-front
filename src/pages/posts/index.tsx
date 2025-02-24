
import { useGetAllPostQuery } from '../../app/services/postApi'
import { Card } from '../../components/card'
import { Post } from '../../app/types'
import { useState } from 'react';
import './style.css'
import { Search } from '../../components/search';



export const Posts = () => {
  const { data } = useGetAllPostQuery() as { data?: Post[] };
  const [search, setSearch] = useState('');


  const filteredPosts = data?.filter((post) =>
    post.city?.toLowerCase().includes(search.toLowerCase())
  ) ?? [];





  return (
    <>
      <Search placeholder='Search for events by city' value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className='posts__wrapper'>
        <div className="posts__inner">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              post.author ? (
                <Card
                  key={post.id}
                  avatarUrl={post.author.avatarUrl ?? ''}
                  content={post.content}
                  fullName={post.author.fullName ?? ''}
                  commentsCount={post.comments?.length ?? 0}
                  authorId={post.authorId}
                  id={post.id}
                  createdAt={post.createdAt}
                  followersCount={post?.followers?.length ?? 0}
                  savedCount={post?.savedBy?.length ?? 0}
                  cardFor="post"
                  imageUrl={post.imageUrl}
                  location={post.location}
                  title={post.title}
                  isSavedPost={post.isSavedPost}
                  dateOfStart={post.dateOfStart}
                  places={post.places}
                  city={post.city}
                />
              ) : (
                <div key={post.id}>
                  Author data not available for post {post.id}
                </div>
              )
            ))
          ) : (
            <p className='Not__found__post'>Posts not found...</p>
          )}
        </div>
      </div>

    </>
  );
};


