import React, { useEffect, useState } from 'react'
import { User } from '../../app/types';
import { useCurrentQuery, useGetUserByIdQuery, useUpdateUserMutation } from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../input';
import { Button } from '../button';
import { ErrorMessage } from '../error-message';
import { hasErrorField } from '../../utils/has-error-field';
import './style.css'
import { CloseIcon } from '../close-icon';
import { AnimatePresence, motion } from "framer-motion";
const modalVariants = {
    hidden: { opacity: 0,}, // Начальная позиция (спрятано ниже экрана)
    visible: { opacity: 1, transition: { duration: 0.3 } }, // Видимо, двигаемся вверх
    exit: { opacity: 0,  transition: { duration: 0.3 } } // При закрытии уходим вниз
  };

type Props = {
    isOpen: boolean;
    onClose: () => void;
    user?: User

}

export const EditUser: React.FC<Props> = ({
    isOpen,
    onClose,
    user
}) => {
    const [updateUser, { isLoading }] = useUpdateUserMutation()
    const [error, setError] = useState('')
    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { id } = useParams<{ id: string }>();

    const { handleSubmit, control} = useForm<User>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: user?.email,
            fullName: user?.fullName,
            dateOfBirth: user?.dateOfBirth,
            bio: user?.bio,
            location: user?.location

        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setFileName(file.name);
        } else {
            setFileName("");
        }
    }
    const onSubmit = async (data: User) => {
        if(id){
            try{
                const formData = new FormData();
                data.fullName && formData.append('fullName', data.fullName)
                data.bio && formData.append('bio', data.bio)
                data.location && formData.append('location', data.location)

                data.dateOfBirth && formData.append('dateOfBirth', new Date(data.dateOfBirth).toISOString()  )
                data.email && data.email !== user?.email && formData.append('email', data.email)
                selectedFile && formData.append('avatar', selectedFile)

                await updateUser({userData: formData, id}).unwrap()
                onClose()
                
            } catch(error){
                if(hasErrorField(error))
                    setError(error.data.error)
            }
        }

    }
   
 
    
   

    if (!isOpen ) return null
    return (
       
  <motion.div
  className="modal__wrapper"
  variants={modalVariants} 
  initial="hidden"
  animate="visible"
  exit="exit"
  >
     <div className="modal__content">
         <div className="modal__header">
         <div className="form__title">Fill in the fields you want to change</div>
         <div className="modal__close" onClick={onClose}>
             <CloseIcon/>
         </div>

         </div>
         <div className="modal__body">
         <form className='form'  onSubmit={handleSubmit(onSubmit)}>
         <Input
             control={control}
             name='email'
             type='email'
             placeholder='Email'  
         />
         <Input
             control={control}
             name='fullName'
             type='text'
             placeholder='Your name'
          
         />
         
         <label className="file-upload">
             <input
                 type="file"
                 name="AvatarUrl"
                 onChange={handleFileChange}
                 className="hidden-input"
             />
             <span className="upload-btn">Upload avatar</span>
             {fileName && <span className="file-name">{fileName}</span>}
         </label>



         <Input
             control={control}
             name='dateOfBirth'
             type='date'
             placeholder='Enter your date of birth'
           
         />
         <Controller
             name='bio'
             control={control}
           
             render={({ field, fieldState }) => (
                     <textarea
                         className={`textarea ${fieldState.error ? "error" : ''}`}
                         {...field}
                         placeholder="Enter a description about yourself"
                     />
                   
               
             )}
         />
          <Input
             control={control}
             name='location'
             type='text'
             placeholder='location'
           
         />
         <ErrorMessage error={error}/>
         <Button className='btn border' type='submit' >Save  </Button>
   

     </form>
         </div>
         <div className="modal__footer">
         <Button className='btn-link' onClick={onClose} >Close  </Button>
         </div>

     </div>


   
</motion.div>
            
  
      



    )
}