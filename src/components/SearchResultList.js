import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore, useFirestoreDocData, useFirestoreCollection } from 'reactfire';
import { doc, addDoc } from 'firebase/firestore';


function SearchResultList(props){
  // const savedBooksRef = useFirestore().collection("testsavedbook").doc("savedbook1");
  // const savedBooksRef = useFirestore().collection("testsavedbook").doc("savedbook1");
  // const savedBooksRef = doc(useFirestore(), "testsavedbook", "savedbook1");
  // const savedBooksRef = await addDoc(collection(db, "testsavedbook"), {
  //   title: "test test test"
  // });
  // const { data } = useFirestoreDocData(savedBooksRef);
  // const { data } = useFirestoreCollection(savedBooksRef);
  // const firestore = useFirestore();

  // const savedBooksRef = useFirestore().collection("testsavedbook");
  // const { data } = useFirestoreCollection(savedBooksRef);

  function handleSavingBook(book) {
    
    // return savedBooksRef.doc().set(book);
      // savedbooks: firestore.FieldValue.arrayUnion(book);
    //   savedbooks: "test test test"
    // });
    // console.log(data);
    console.log(book);
    console.log('handle saving book function reached')
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
          
            <img src={bookData.volumeInfo.imageLinks === undefined
              ? "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg"
              : bookData.volumeInfo.imageLinks.thumbnail} alt="book cover thumbnail"/>

            <button onClick= { () => handleSavingBook(bookData) }>Add To Readlist</button>
            <button onClick= { () => handleMarkingRead(bookData) }>Mark As Read</button>
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