import React, { useState } from 'react'
import { Follows, Post, User } from '../../app/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDeletePostMutation, useLazyGetAllPostQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { selectCurrent } from '../../features/user/userSlice';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { BASE_URL } from '../../constants';
import { hasErrorField } from '../../utils/has-error-field';
import { DeleteIcon } from '../dalete-icon';
import { Arrow } from '../arrow';
import { Loader } from '../loader';
import { MessageIcon } from '../message-icon';
import { useFollowUserMutation, useUnFollowUserMutation } from '../../app/services/followApi';
import { Button } from '../button';
import { useDeleteSavedPostMutation, useSavePostMutation } from '../../app/services/saveApi';
import { SaveIcon } from '../save-icon';
import { SavedIcon } from '../saved-icon';
import { ConfirmModal } from '../сonfirmation-modal';
import { CardInfo } from '../card-info';
import './style.css'

type Props = {
  avatarUrl: string,
  fullName: string,
  authorId: string,
  content: string,
  imageUrl: string,
  location: string,
  title: string,
  dateOfStart: Date,
  city: string,
  places: number,
  isSavedPost: Boolean,
  commentId?: string,
  commentsCount?: number,
  followersCount?: number,
  savedCount?: number,
  createdAt?: Date,
  id?: string,
  cardFor: 'comment' | 'post' | 'current-post' | 'post-user',
  onDelete?: () => void;
  followers?: { follower: User }[];
  savedBy?: { userSaved: User }[]
  currentUserId?: string,



}

export const Card: React.FC<Props> = ({
  fullName = '',
  authorId = '',
  content = '',
  imageUrl = '',
  location = '',
  title = '',
  dateOfStart,
  city = '',
  places = 0,
  commentsCount = 0,
  followersCount = 0,
  savedCount = 0,
  id = '',
  onDelete,
  isSavedPost = false,
  cardFor = 'post',
  followers = [],
  savedBy = [],
  currentUserId,
}) => {
  const [getAllPost, { isLoading }] = useLazyGetAllPostQuery();
  const params = useParams<{ id: string }>();
  const [getPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent)
  const [followUser] = useFollowUserMutation()
  const [unFollowUser] = useUnFollowUserMutation()
  const [savePost] = useSavePostMutation()
  const [deleteSavedPost] = useDeleteSavedPostMutation()
  const [isOpenModal, setIsModalOpen] = useState(false);


  const isOpen = () => {
    setIsModalOpen(true)
  }

  const onClose = () => {
    setIsModalOpen(false);
  }


  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await getAllPost().unwrap()
        break
      case "current-post":
        await getAllPost().unwrap()
        break

      default:
        throw new Error('wrong argument cardFor')

    }
  }
  const handleSavePost = async () => {
    try {
      if (id) {
        isSavedPost ?
          await deleteSavedPost(id).unwrap()
          :
          await savePost({ savedPostId: id }).unwrap();
        await getPostById(id).unwrap();
        await getAllPost().unwrap();
      }
    } catch (error) {
      console.error("Error save/delete save", error);
    }
  }
  const handleFollow = async () => {
    try {
      if (id) {
        const isFollowing = followers.some(f => f.follower.id === currentUserId);
        if (isFollowing) {
          await unFollowUser(id).unwrap();
        } else {
          await followUser({ followingId: id }).unwrap();
        }
        await getPostById(id).unwrap()
      }
    } catch (error) {
      console.error("Error following/unfollowing", error);
    }

  }



  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts()
          if (onDelete) {
            onDelete();
          }
          break
        case "current-post":
          await deletePost(id).unwrap();
          navigate(-1)
          await refetchPosts()
          break


        default:
          throw new Error('wrong argument cardFor')
      }

    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }

    }
  }




  return (
    <div className={`card ${cardFor === 'current-post' ? 'card__fullWidth' : ''} `}>
      <div className='info-event__wrapper'>
        <Arrow />
        {
          cardFor !== 'current-post' ? <Link to={`/posts/${id}`}>
            <button className='icon__wrapper'>
              <MessageIcon />
              {commentsCount}
            </button>
          </Link> : <button className='icon__wrapper'>
            <MessageIcon />
            {commentsCount}
          </button>
        }
        <div className='save__wrapper'>
          {
            authorId !== currentUser?.id ?
              (
                <button className='icon__wrapper' onClick={handleSavePost}>
                  {isSavedPost ? <SavedIcon /> : <SaveIcon />}

                </button>
              ) : (
                <button className='icon__wrapper' >
                  <SaveIcon />
                </button>
              )
          }
          {savedCount}
        </div>
        {
          authorId === currentUser?.id && (
            <button onClick={isOpen}>
              {
                deletePostStatus.isLoading || deleteCommentStatus.isLoading ? <Loader /> : <DeleteIcon />
              }
            </button>
          )
        }
      </div>
      <div className="card__img">
        <img src={`${BASE_URL}${imageUrl}`} alt={title} />
        {
          cardFor === 'current-post' && authorId !== currentUser?.id && (
            followers?.some(f => f.follower.id === currentUserId) ? (
              <Button className="btn__follow btn border" onClick={handleFollow}>
               Leave the event
              </Button>
            ) : (
              followersCount < places ? (
                <Button className="btn__follow btn border" onClick={handleFollow}>
                  Join an event 
                </Button>
              ) : (
                <div className='notification'>No available spots</div>
              )
            )
          )
        }
      </div>
      <div className="card__content">
        <div className={`card__title ${cardFor === 'current-post' ? '' : 'word-noWrap'} `} >{title}</div>
        {
          cardFor === 'current-post' && (
            <CardInfo className='margin font-weight markdown'>
               <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{content}</ReactMarkdown>
            </CardInfo>
          )
        }
        <CardInfo cardFor={cardFor}>
          <span>Date & Time:</span> {formatToClientDate(dateOfStart)}
        </CardInfo>

        <CardInfo cardFor={cardFor}>
          <span>City:</span> {city}
        </CardInfo>

        <CardInfo cardFor={cardFor}>
          <span>Location:</span>  {location}
        </CardInfo>
        {
          fullName ?
            <CardInfo cardFor={cardFor}>
              <span>Author:</span>
              <Link to={`/users/${authorId}`}> {fullName}</Link>
            </CardInfo>
            :
            ''
        }
        <CardInfo cardFor={cardFor}>
          <span>Available places:</span>  {followersCount !== 0 ? `${places - followersCount}` : `${places}`}  <span>/ {places}</span>
          {followers?.length > 0 ? (
            <ul className='follower__items'>
              {followers.map(({ follower }) => (
                <li
                  className='follower__item'
                  key={follower.id}>
                  <Link to={`/users/${follower.id}`} >
                    <img
                      className='follower__item-avatar'
                      src={`${BASE_URL}${follower.avatarUrl}`}
                      alt={follower.fullName}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </CardInfo>

        {
          cardFor !== 'current-post' && (<div className='card__btn'>
            <Link to={`/posts/${id}`}>Learn more</Link>
          </div>)
        }
      </div>
      <ConfirmModal isOpen={isOpenModal} onClose={onClose} handleDelete={handleDelete} />
    </div>
  )
}
