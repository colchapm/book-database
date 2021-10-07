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
    <hr />
    <p className="header_subtext">Saved Books</p> 
      <ul className="container">
        {props.savedBooks.map((bookData, index) =>
          <li className="li_no_bullets" key={index}>
            <p className="book_title_text">{bookData.volumeInfo.title}</p>
            <p className="book_author_text">Author(s): {bookData.volumeInfo.authors}</p>
            {/* <p>Genre: {bookData.volumeInfo.categories}</p> */}
            {/* <p>Average Rating: {bookData.volumeInfo.averageRating === undefined
              ? "No Ratings Available"
              : bookData.volumeInfo.averageRating} </p> */}
          
            <div className="thumbnail">
              <a style={{display: "table-cell"}} href={bookData.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer"> <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhzNKj_YNwD8fENvC1wGMxq6_zUxI1FmLvQ&usqp=CAU"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/> </a>
            </div>

            <div className="thumbnail">
              <button className="book_button" onClick= { () => { handleMarkingRead(bookData); handleRemovingBook(bookData.volumeInfo.title); }}>Mark As Read</button>
              <button className="book_button" onClick= { () => handleRemovingBook(bookData.volumeInfo.title) }>Remove</button>
            </div>
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

