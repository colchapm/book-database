import React from 'react';
import BookSearchForm from './BookSearchForm';
import SearchResultList from './SearchResultList';

class BookControl extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        error: null,
        isApiLoaded: false,
        bookData: [],
        savedBooks: [],
        title: null
      };
  }


  makeGoogleApiCall = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`)
    .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          this.setState({
            isApiLoaded: true,
            bookData: jsonifiedResponse.items
          });
        })
        .catch((error) => {
          this.setState({
            isApiLoaded: true,
            error
          });
        })
  }

  handleSearch = (title) => {
    console.log(title);
    this.setState({ title });
    this.makeGoogleApiCall(title);
  }

  // handleSavingBook = (book) => {
  //   console.log("handlesaving book function reached");
  //   console.log(book);
  //   const newSavedBooksCollection = this.state.savedBooks.concat(book);
  //   this.setState({savedBooks: newSavedBooksCollection});
  //   console.log(this.state.savedBooks);
  // }


  render() {
    const { error, isApiLoaded, bookData, title } = this.state;
    let results = null;

    if (title!= null && isApiLoaded) {
      results = <SearchResultList searchResultList={this.state.bookData}/>
    }
    
    // if (title != null && isApiLoaded) {
    //   results = 
    //   <React.Fragment>
    //     <h1>Search Results</h1>
    //     <ul>
    //       {bookData.map((bookData, index) =>
    //         <li key={index}>
    //           <p>{bookData.volumeInfo.title}</p>
    //           <p>Author(s): {bookData.volumeInfo.authors}</p>
    //           <button onClick= { this.handleSavingBook }>Add To Readlist</button>
    //           { console.log(bookData.id) }
    //         </li>
    //       )}
    //     </ul>
    //   </React.Fragment>
    // }
      return (
        <React.Fragment>
          <BookSearchForm onTitleSearch={this.handleSearch} />
          {results}
        </React.Fragment>
      )
  }  
}


export default BookControl