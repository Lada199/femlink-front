import React from 'react'
import { Control, useController } from 'react-hook-form'
import './style.css'

type Props = {
  name: string,

  placeholder?: string,
  type?: string,
  control: Control<any>,
  endContent?: JSX.Element,
  rules?: Record<string, any>;

}

export const Input: React.FC<Props> = (
  { name,
    placeholder,
    type,
    control,
    rules = {},
    endContent, }
) => {
  const {
    field,
    fieldState: { invalid, error },
    formState: { errors }
  } = useController({
    name,
    control,
    rules
  })
  return (
    <div className='input__group'>
      <input
        className={`input ${error ? 'error' : ''}`}
        type={type}
        placeholder={placeholder}
        id={name}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {endContent && <div className="input__end-content">{endContent}</div>}
      {error && <p className="input__error-message">{error.message}</p>}
    </div>

  )
}
