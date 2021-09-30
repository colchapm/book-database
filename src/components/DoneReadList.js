import React from 'react';

function DoneReadList(props) {


  return (
    <>
    <h1>Read History</h1>
      <ul>
        {props.completedBooks.map((bookData, index) =>
          <li key={index}>
            <p>{bookData.volumeInfo.title}</p>
            <p>Author(s): {bookData.volumeInfo.authors}</p>
            {/* <p>Year Read</p> */}
            <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/>

            {/* <button onClick= { () => handleSavingBook(bookData) }>Add To Readlist</button> */}
          </li>
        )}
      </ul>
    </>
  );
}

export default DoneReadList;

