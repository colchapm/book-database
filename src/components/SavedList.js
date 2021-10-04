import React from 'react';
import PropTypes from 'prop-types';
import { doc } from 'firebase/firestore';
import { useFirestoreDocData,useFirestore,} from 'reactfire';

function SavedList(props) {


  const bookRef = doc(useFirestore(), 'testsavedbook', 'savedbook1');
  const { data } = useFirestoreDocData(bookRef);

  function handleMarkingRead(book) {
    console.log("savedList handleMarkingRead function reached");
    console.log(book);
    props.onClickRead(book);
  }

  function handleRemovingSave(book) {
    props.onClickRemoveFromSaved(book);
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
            <button onClick= { () => handleRemovingSave(bookData) }>Remove From Readlist</button>
            { console.log(bookData.id) }
          </li>
        )}
      </ul>
      {/* {data.savedbooks.map((bookData) => 
        <p>Title: {bookData}</p>
        )
      } */}
    </>
  );
}

SavedList.propTypes = {
  onClickRead: PropTypes.func,
}

export default SavedList;

