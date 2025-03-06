
import { useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import './style.css'
import { Button } from '../../components/button';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../components/error-message';
import { useState } from 'react';
import { hasErrorField } from '../../utils/has-error-field';
import { Loader } from '../../components/loader';
type Login = {
    email: string,
    password: string
}


export const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<Login>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [triggerCurrentQuery] = useLazyCurrentQuery()
    const onSubmit = async (data: Login) => {
        try {
            await login(data).unwrap()
            await triggerCurrentQuery().unwrap()
            navigate('/')

        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.error)
            }


        }
    }

    return (
        <div className='form__auth-wrapper'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    control={control}
                    name='email'
                    type='email'
                    placeholder='Email'
                    rules={{
                        required: 'Required field',
                    }}

                />
                <Input
                    control={control}
                    name='password'
                    type='password'
                    placeholder='Password'
                    rules={{
                        required: 'Required field',
                    }}
                />
                <ErrorMessage error={error} />
                {isLoading ? <Loader /> : <Button className='btn border' type='submit'> Sign in  </Button>}

            </form>
        </div>
    )
}
