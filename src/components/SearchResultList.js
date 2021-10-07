import React from 'react';
import PropTypes from 'prop-types';


function SearchResultList(props){

  function handleSavingBook(book) {
    props.onSavingBook(book);
  }

  function handleMarkingRead(book){
    props.onMarkingBookAsRead(book);
  }

  return (
    <React.Fragment>
      <hr />
      <h3 className="header_subtext">Search Results</h3>
      <ul>
        {props.searchResultList.map((bookData, index) =>
          <li className="search_li_no_bullets" key={index}>
            <p className="search_book_title_text">{bookData.volumeInfo.title}</p>
            <p className="search_book_author_text">Author(s): {bookData.volumeInfo.authors}</p>
            <p className="search_book_author_text">Genre: {bookData.volumeInfo.categories}</p>
            <p className="search_book_author_text">Average Rating: {bookData.volumeInfo.averageRating === undefined
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