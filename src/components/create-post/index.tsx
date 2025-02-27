import React, { useState } from 'react'
import { useCreatePostMutation, useLazyGetAllPostQuery } from '../../app/services/postApi'
import { Controller, useForm } from 'react-hook-form';

import { Input } from '../input';


import { Button } from '../button';
import './style.css'
import { useNavigate } from 'react-router-dom';





export const CreatePost = (
) => {
    const [createPost] = useCreatePostMutation()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)


    const [getAllPost] = useLazyGetAllPostQuery();
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();







    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setFileName(file.name);
        } else {
            setFileName("");
        }
    }



    const error = errors?.post?.message as string;


    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('location', data.location);
            formData.append('dateOfStart', data.dateOfStart);
            formData.append('city', data.city);
            formData.append('places', data.places);

            if (selectedFile) {
                formData.append('imageUrl', selectedFile);
            }

            await createPost(formData).unwrap();
            setValue('title', '');
            setValue('content', '');
            setValue('location', '');
            setValue('dateOfStart', '');
            setValue('city', '');
            setValue('places', '');
            setValue('imageUrl', '');
            await getAllPost().unwrap();
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    })

    return (
        <div className='form__post'>
            <div className="form__title">Fill out the fields in the form below</div>
            <form className='form' onSubmit={onSubmit}>
                <Input
                    control={control}
                    name='title'
                    type='text'
                    placeholder='Event Title'
                    rules={{
                        required: 'Required field',
                    }}
                />
                <Input
                    control={control}
                    name='location'
                    type='text'
                    placeholder='Event Location'
                    rules={{
                        required: 'Required field',
                    }}
                />
                <label className="file-upload">
                    <input
                        type="file"
                        name="imageUrl"
                        onChange={handleFileChange}
                        className="hidden-input"
                    />
                    <span className="upload-btn">Upload Image</span>
                    {fileName && <span className="file-name">{fileName}</span>}
                </label>
                <Input
                    control={control}
                    name='dateOfStart'
                    type='datetime-local'
                    placeholder='Event Date and Time'
                    rules={{
                        required: 'Required field',
                    }}
                />
                <Input
                    control={control}
                    name='city'
                    type='text'
                    placeholder='Enter the event city'
                    rules={{
                        required: 'Required field',
                    }}
                />
                <Input
                    control={control}
                    name='places'
                    type='number'
                    placeholder='Number of Places at Your Event'
                    rules={{
                        required: 'Required field',
                    }}
                />
                <Controller
                    name='content'
                    control={control}
                    rules={{
                        required: 'Required field',
                    }}
                    render={({ field, fieldState }) => (
                        <textarea
                            className={`textarea ${fieldState.error ? "error" : ''}`}
                            {...field}
                            placeholder="Event Description"
                        />
                    )}
                />
                <Button className='btn border' type='submit'>Add event  </Button>
            </form>
        </div>
    )
}
