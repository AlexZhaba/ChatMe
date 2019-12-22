import React, {useState, useEffect} from 'react';
import './SearchStyles.css';
import UniversalUsers from './../UniversalUsers/UniversalUsers'
const Search = (props) => {
  const [showUser, setShowUser] = useState(false);
  const [user, setUser] = useState(null);
  if (props.searchText != '') {
    if (!props.fetching) {
      console.log(' NE FECTHING AND ', props.searchText,' ', props.lastFetchText)
        if (props.searchText != props.lastFetchText) {
          props.thunk_searchUsers(props.searchText);
        }
    };
  } else {
    console.log('EYYAYASDHAKJSDHJKASDHJK')
    props.setLastFetchText('');
  }
  if (props.searchUsers.length > 0) {
    var searchUsers = props.searchUsers.map (e => e.email)
  }
  if ((props.searchText.length == 0) && (props.searchUsers.length > 0)) {
    props.setSearchUsers([]);
  }
  console.log(searchUsers)
  return (
    <div className='search-block'>
        <input
          onChange = {(event) => props.updateSearchText(event.target.value)} value={props.searchText}/>
        <div className='search-user-block'>
          <UniversalUsers
            users = {searchUsers}
          />

        </div>
    </div>
  )
}
export default Search;
