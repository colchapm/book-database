import React from 'react';
import PropTypes from 'prop-types';
import noImageAvailable from "./../img/no_image_available.jpg"


function SearchResultList(props){

  function handleSavingBook(book) {
    props.onSavingBook(book);
  }

  function handleMarkingRead(book){
    props.onMarkingBookAsRead(book);
  }

  return (
    <React.Fragment>
      <h1>Search Results</h1>
      <ul>
        {props.searchResultList.map((bookData, index) =>
          <li key={index}>
            <p>{bookData.volumeInfo.title}</p>
            <p>Author(s): {bookData.volumeInfo.authors}</p>
            <p>Genre: {bookData.volumeInfo.categories}</p>
            <p>Average Rating: {bookData.volumeInfo.averageRating === undefined
              ? "No Ratings Available"
              : bookData.volumeInfo.averageRating} </p>
            <a style={{display: "table-cell"}} href={bookData.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer"> <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhzNKj_YNwD8fENvC1wGMxq6_zUxI1FmLvQ&usqp=CAU"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/> </a>


            <button className="book_button" onClick= { () => handleSavingBook(bookData) }>Add To Readlist</button>
            <button className="book_button" onClick= { () => handleMarkingRead(bookData) }>Mark As Read</button>
            { console.log(bookData.id) }
          </li>
        )}
      </ul>
    </React.Fragment>
  );
}



  SearchResultList.propTypes = {
    searchResultList: PropTypes.array,
    onSavingBook: PropTypes.func,
    onMarkingBookAsRead: PropTypes.func
  }

export default SearchResultList;