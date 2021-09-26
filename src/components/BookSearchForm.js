import React from 'react';

function BookSearchForm(props) {

  function submitSearch(event) {
    event.preventDefault();
    const searchTitle = event.target.title.value;
    props.onTitleSearch(searchTitle);
  }
  return (
    <React.Fragment>
      <form onSubmit={submitSearch}>
        <input
          type="text"
          name="title"
          placeholder="Enter Book title" />

          <button type="submit">Search</button>
      </form>
    </React.Fragment>
  )
}

export default BookSearchForm;