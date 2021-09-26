import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

function SearchResultList(props){

  function handleSavingBook(book) {
    // book.preventDefault();
    console.log(book);
    console.log('handle saving book function reached')
    // console.log(event.target)
    // props.onSavingBook({title: event.target.bookData.volumeInfo.title, id: v4()});
    props.onSavingBook(book);

  }
  return (
    <React.Fragment>
      <h1>Search Results</h1>
      <ul>
        {props.searchResultList.map((bookData, index) =>
          <li key={index}>
            <p>{bookData.volumeInfo.title}</p>
            <p>Author(s): {bookData.volumeInfo.authors}</p>
            <button onClick= { () => handleSavingBook(bookData) }>Add To Readlist</button>
            { console.log(bookData.id) }
          </li>
        )}
      </ul>
    </React.Fragment>
  );
}



  SearchResultList.propTypes = {
    searchResultList: PropTypes.array,
    onSavingBook: PropTypes.func
  }

export default SearchResultList;