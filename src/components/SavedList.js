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
          
              <a style={{display: "table-cell"}} href={bookData.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer"> <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/> </a>

            <button className="book_button" onClick= { () => { handleMarkingRead(bookData); handleRemovingBook(bookData.volumeInfo.title); }}>Mark As Read</button>
            <button className="book_button" onClick= { () => handleRemovingBook(bookData.volumeInfo.title) }>Remove Book</button>
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

