import { useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import './style.css'
import { useRegisterMutation } from '../../app/services/userApi';
import { useState } from 'react';
import { hasErrorField } from '../../utils/has-error-field';
import { ErrorMessage } from '../../components/error-message';
import { Loader } from '../../components/loader';

type Register = {
    fullName: string,
    email: string,
    password: string
}


export const Register = ({

}) => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<Register>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: 'test@ukr.net',
            password: '',
            fullName: ''
        }
    })
    const [register, { isLoading }] = useRegisterMutation();
    const [error, setError] = useState('')
    const onSubmit = async (data: Register) => {
        try {
            await register(data).unwrap()
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
                    name='fullName'
                    type='text'
                    placeholder='Your name'
                    rules={{
                        required: 'Required field',
                    }}
                />
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
                {isLoading ?    <Loader/> :          <Button className='btn border' type='submit'>Sign up</Button>  }
        
            </form>
        </div>
    )
}
