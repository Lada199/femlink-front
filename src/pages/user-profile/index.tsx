import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { resetUser, selectCurrent } from '../../features/user/userSlice'
import { useCurrentQuery, useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '../../app/services/userApi'
import { BASE_URL } from '../../constants'
import { Card } from '../../components/card'
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import './style.css'
import { EditUser } from '../../components/edit-user'

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const currentUser = useSelector(selectCurrent)
  const { data, refetch } = useGetUserByIdQuery(id ?? '')
  const [getUserByIdQuery] = useLazyGetUserByIdQuery()
  const [currentQuery] = useLazyCurrentQuery()
  const [isOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'userEvents' | 'subscribedEvents'>('userEvents');


  const dispatch = useDispatch()


  useEffect(() => () => {

    dispatch(resetUser())
  }, [])


  const onClose = () => {

    setIsModalOpen(false);

  }
  const handleTabSwitch = (tab: 'userEvents' | 'subscribedEvents') => {
    setActiveTab(tab);
  };

  const handeleClose = async () => {
    try {
      if (id) {
        await getUserByIdQuery(id)
        await currentQuery()
        onClose()


      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return null
  }

  return (
    <div className='user'>
      <div className="user__top">
        <div className="user__avatar">
          <img src={`${BASE_URL}${data.avatarUrl}`} alt={data.fullName} />
        </div>
        <div className="user__bio">
          <div className="user__bio-top">
            <div className="user__bio-about">
              <div className="user__bio-name">{data.fullName}</div>
              <div className="user__bio-sity">{data.location ?? ''}</div>
            </div>
            <div className="user__bio-events"><span>{data.posts.length}</span> events</div>
            <div className='user__edit' onClick={() => setIsModalOpen(true)} >

              {
                currentUser?.id !== id ? '' : 'Edit'
              }
            </div>
          </div>
          <div className="user__bio-bottom">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {data.bio ?? `No description`}
            </ReactMarkdown>

          </div>
        </div>
      </div>
      <div className="user__tabs">
        <div onClick={() => handleTabSwitch('userEvents')} className={`tab_btn ${activeTab === 'userEvents' ? 'active' : ''}`}>
          My Events
        </div>
        <div onClick={() => handleTabSwitch('subscribedEvents')} className={`tab_btn ${activeTab === 'subscribedEvents' ? 'active' : ''}`}>
          Joined the events
        </div>
      </div>
      <div className="user__bottom">
        {activeTab === 'userEvents' && data.posts && data.posts.length > 0 ? (
          [...data.posts].reverse().map((post) => (
            <Card
              key={post.id}
              avatarUrl={post.author?.avatarUrl ?? ''}
              content={post.content}
              fullName={''}
              commentsCount={post.comments?.length ?? 0}
              authorId={post.authorId}
              id={post.id}
              createdAt={post.createdAt}
              followersCount={post.followers?.length ?? 0}
              cardFor="post"
              imageUrl={post.imageUrl}
              location={post.location}
              title={post.title}
              dateOfStart={post.dateOfStart}
              places={post.places}
              city={post.city}
              onDelete={refetch}
            />
          ))
        ) : activeTab === 'subscribedEvents' && data.following && data.following.length > 0 ? (
          data.following.map((following) => {
            const post = following.following;
            return (
              <Card
                key={post.id}
                avatarUrl={post.author?.avatarUrl ?? ''}
                content={post.content}
                fullName={post.author?.fullName ?? ''}
                commentsCount={post.comments?.length ?? 0}
                authorId={post.authorId}
                id={post.id}
                createdAt={post.createdAt}
                followersCount={post.followers?.length ?? 0}
                cardFor="post"
                imageUrl={post.imageUrl}
                location={post.location}
                title={post.title}
                dateOfStart={post.dateOfStart}
                places={post.places}
                city={post.city}
                onDelete={refetch}
              />
            )
          })
        ) : (
          <p>No posts available...</p>
        )}

      </div>
      <EditUser isOpen={isOpen} onClose={handeleClose} user={data} />
    </div>

  )
}
