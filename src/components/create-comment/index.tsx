import { useCreatePostMutation, useGetAllPostQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '../error-message'
import { useParams } from 'react-router-dom'
import { useCreateCommentMutation } from '../../app/services/commentsApi'
import { Button } from '../button'
import './style.css'


export const CreateComments = () => {
    const { id } = useParams<{ id: string }>()
    const [createComment] = useCreateCommentMutation()
    const [getPostById] = useLazyGetPostByIdQuery()
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue
    } = useForm()

    const error = errors?.post?.message as string;

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (id) {
                await createComment({ content: data.comment, postId: id }).unwrap()
                setValue('comment', '')
                await getPostById(id).unwrap()

            }

        } catch (err) {
            console.log(err)
        }
    })
    return (
        <form className='form__comments' onSubmit={onSubmit}>
            <Controller
                name='comment'
                control={control}
                defaultValue=''
                rules={{
                    required: 'required field'
                }}
                render={({ field }) => (
                    <textarea
                        {...field}
                        rows={5}
                        placeholder='Add your comment '
                        className='textarea__comments'
                    />
                )}
            />
            {error && <ErrorMessage error={error} />}
            <Button
                className='btn border'
                type='submit'
            >
                Add comment
            </Button>
        </form>
    )
}
