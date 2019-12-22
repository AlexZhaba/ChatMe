import React, {useState, useEffect} from 'react';
import './SearchStyles.css';
const Search = (props) => {
  const [showUser, setShowUser] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className='search-block'>
        <input
          onChange = {(event) => props.updateSearchText(event.target.value)} value={props.searchText}/>
        <div className='search-user-block'>
          {props.searchUsers}
        </div>
    </div>
  )
}
export default Search;
