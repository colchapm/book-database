import React from 'react';
import BookForm from './BookForm';

class BookControl extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        error: null,
        isApiLoaded: false,
        bookData: {},
        title: null
      };
  }



  makeGoogleApiCall = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}`)
    .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          this.setState({
            isApiLoaded: true,
            bookData: jsonifiedResponse
          });
        })
        .catch((error) => {
          this.setState({
            isApiLoaded: true,
            error
          });
        })
  }

  


  render() {
    if (this.state.title != null && this.state.isApiLoaded) {
      results = 
      <React.Fragment>
        <h1>Search Results</h1>
        <ul>
          {this.state.bookData.map((book, index) =>
            <li key={index}>
              <p>{book.items[index].volumeInfo.title}</p>
              <p>{book.items[index].volumeInfo.author}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    }

  }

  
}


export default BookControl