import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type="text"
          name="title"
          placeholder="Book Title" />
        <input
          type="text"
          name="author"
          placeholder="Author" />
        <input
          type="text"
          name="genre"
          placeholder="Genre" />
        <input 
          type="number"
          name="yearRead"
          placeholder="Year Read" />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
}

export default ReusableForm;