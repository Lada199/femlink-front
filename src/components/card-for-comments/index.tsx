import React, { useState } from 'react'
import { Arrow } from '../arrow';
import { Loader } from '../loader';
import { DeleteCard } from '../dalete-card';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { useDeleteCommentMutation} from '../../app/services/commentsApi';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { hasErrorField } from '../../utils/has-error-field';
import { useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { BASE_URL } from '../../constants';
import './style.css'
import { formatToClientDate } from '../../utils/format-to-client-date';


type Props = {
    avatarUrl: string,
    fullName: string,
    authorId: string,
    content: string,
    commentId?: string,
    commentsCount?: number,
    createdAt?:Date,
    id?: string,
    cardFor: 'comment',
    onDelete?: () => void;
}

export const CardComments: React.FC<Props> = (
    {
        avatarUrl = '',
        fullName = '',
        authorId = '',
        content = '',
        createdAt,
        commentId = '',
        id = '',
        onDelete,
        cardFor = 'comment'
    }
) => {

    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const [error, setError] = useState('')
    const params = useParams<{ id: string }>();
    const [getPostById] = useLazyGetPostByIdQuery()

    const currentUser = useSelector(selectCurrent)


    const refetchPosts = async () => {
        await getPostById(id).unwrap()
    }

    const handleDelete = async () => {
        try {
            await deleteComment(commentId).unwrap();
            await refetchPosts()
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.error)
            } else {
                setError(error as string)
            }
        }
    }
    return (

        <div
            className={
                authorId === currentUser?.id
                    ? 'card__comments left'
                    : 'card__comments right'
            }
        >
            <div
                className={`card__content card__content-comment
              ${authorId === currentUser?.id
                        ? 'left' :
                        'right'}`}>
                {
                    authorId === currentUser?.id
                        ? ''
                        : <div className="card__avatar ">
                            <Link to={`/users/${authorId}`}>
                                <img src={`${BASE_URL}${avatarUrl}`} alt="" />
                            </Link>
                        </div>}
                <div
                    className={`card__info card__info-comments font-weight markdown
                     ${authorId !== currentUser?.id && 'right'}`}>
                    <Link to={`/users/${authorId}`}>
                        {
                            authorId === currentUser?.id
                                ? 'You'
                                : `${fullName}`
                        }
                    </Link>
                    <div    className={`card__content-text  ${authorId === currentUser?.id && 'left'}`} >
                       

                    <ReactMarkdown
                 
                        remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {content}
                    </ReactMarkdown>
                    <div className="card__create">
                    {createdAt && formatToClientDate(createdAt)}

                    </div>
                    </div>
                </div>
                {
                    authorId === currentUser?.id && (
                        <div
                            className='delete__wrapper-comment'
                            onClick={handleDelete}>
                            {
                                deleteCommentStatus.isLoading ?
                                    <Loader />
                                    : <DeleteCard />
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
