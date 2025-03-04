import React from 'react'
import './style.css'
import { SearchIcon } from '../search-icon';
type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string

}

export const Search: React.FC<Props> = ({
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
        className="search__input input padLeft"
      />
      <div className="search__icon-wrapper">

      <SearchIcon/>
      </div>


    </div>
  )
}
