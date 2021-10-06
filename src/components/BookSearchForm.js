import React from 'react';

function BookSearchForm(props) {

  function submitSearch(event) {
    event.preventDefault();
    const searchTitle = event.target.title.value;
    props.onTitleSearch(searchTitle);
  }
  return (
    <React.Fragment>
      <div className="border">
        <form onSubmit={submitSearch}>
          <input
            type="text"
            name="title"
            placeholder="enter book title" />
            <button className="button" type="submit">Search</button>
        </form>
      </div>
    </React.Fragment>
  )
}


export default BookSearchForm;