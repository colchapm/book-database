import React from 'react';
import tempCoverPhoto from "./../img/temporary_cover_photo.jpg"

function Header(){
  return (
    <React.Fragment>
      <div className="header_page">
        <h1 className="header">bookbox</h1>
        <img className="photo" src={tempCoverPhoto} alt="book covers" />
        <p className="header_subtext">track books you've read.</p>
        <p className="header_subtext">save those you want to read.</p>
      </div>

    </React.Fragment>
  );
}

export default Header;