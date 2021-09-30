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
        // savedBooks: [],
        title: null
      }
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
  //   console.log("handlesaving controller book function reached");
  //   console.log(book);
  //   const newSavedBooksCollection = this.state.savedBooks.concat(book);
  //   this.setState({savedBooks: newSavedBooksCollection});
  //   //this is where i would add book to firestore "saved" collection
  // }


  render() {
    console.log(this.state)
    const { isApiLoaded, title } = this.state;
    let results = null;

    if (title!= null && isApiLoaded) {
      results = <SearchResultList searchResultList={this.state.bookData}
                                  onSavingBook = {this.props.onClickSaved}/>
    }


    
      return (
        <React.Fragment>
          <BookSearchForm onTitleSearch={this.handleSearch} />
          {results}
        </React.Fragment>
      )
  }  
}


export default BookControl