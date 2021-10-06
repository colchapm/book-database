import React from 'react';
import PropTypes from 'prop-types';

function DoneReadList(props) {

  function handleRemovingBook(book) {
    props.onClickRemoveBookFromCompleted(book);
  }

  return (
    <>
    <h1>Read History</h1>
      <ul>
        {props.completedBooks.map((bookData, index) =>
          <li key={index}>
            <p>{bookData.volumeInfo.title}</p>
            <p>Author(s): {bookData.volumeInfo.authors}</p>
            {/* <p>Year Read</p> */}
            <a style={{display: "table-cell"}} href={bookData.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer"> <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhzNKj_YNwD8fENvC1wGMxq6_zUxI1FmLvQ&usqp=CAU"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/> </a>

            <button className="book_button" onClick= { () => handleRemovingBook(bookData.volumeInfo.title) }>Remove</button>
          </li>
        )}
      </ul>
    </>
  );
}

DoneReadList.propTypes = {
  onClickRemoveBookFromCompleted: PropTypes.func,
}

export default DoneReadList;

