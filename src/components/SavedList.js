import React from 'react';
import PropTypes from 'prop-types';

function SavedList(props) {

  function handleMarkingRead(book) {
    props.onClickRead(book);
  }

  function handleRemovingBook(book) {
    props.onClickRemoveBookFromSaved(book);
  }


  return (
    <>
    <h1>Saved Books</h1>
      <ul>
        {props.savedBooks.map((bookData, index) =>
          <li key={index}>
            <p>{bookData.volumeInfo.title}</p>
            <p>Author(s): {bookData.volumeInfo.authors}</p>
            <p>Genre: {bookData.volumeInfo.categories}</p>
            <p>Average Rating: {bookData.volumeInfo.averageRating === undefined
              ? "No Ratings Available"
              : bookData.volumeInfo.averageRating} </p>
          
            <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/>

            <button onClick= { () => handleMarkingRead(bookData) }>Mark As Read</button>
            <button onClick= { () => handleRemovingBook(bookData.volumeInfo.title) }>Remove Book</button>
            { console.log(bookData.id) }
          </li>
        )}
      </ul>
    </>
  );
}

SavedList.propTypes = {
  onClickRead: PropTypes.func,
  onClickRemoveBookFromSaved: PropTypes.func
}

export default SavedList;

