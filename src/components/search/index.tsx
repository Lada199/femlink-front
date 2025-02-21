import React from 'react'
import './style.css'
type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string

}

export const Search:  React.FC<Props> = ({
    value,
    onChange,
    placeholder
}) => {
  return (
    <div className='search__wpapper'>
          <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="search__input input "
    />
       

    </div>
  )
}
