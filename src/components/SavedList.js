import React from 'react';
import PropTypes from 'prop-types';

function SavedList(props) {
  return (
    <React.Fragment>
      <p>saved list will go here</p>

      <h1>Saved Books</h1>

    </React.Fragment>
  );
}

SavedList.propTypes = {
  savedReadList: PropTypes.array,
}

export default SavedList;

