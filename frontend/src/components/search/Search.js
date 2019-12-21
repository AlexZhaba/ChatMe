import React, {useState} from 'react';
import './SearchStyles.css';
const Search = (props) => {
  const [showUser, setShowUser] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <div className='search-block'>
        <input
          onClick={() =>
            {setShowUser(!showUser)}} type='text' placeholder='Search' onChange = {(event) => props.updateSearchText(event.target.value)} value={props.searchText}/>
      {showUser ?
        <div className='search-user-block'>
          пРИВЕТ
        </div>
       :
        <div>

        </div>
      }
    </div>
  )
}
export default Search;
