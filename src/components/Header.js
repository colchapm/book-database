import React from 'react';
import { Link } from "react-router-dom";
import tempCoverPhoto from "./../img/temporary_cover_photo.jpg"

function Header(){
  return (
    <React.Fragment>
      <div className="header_page">
        <h1 className="header">bookbox</h1>
        <img className="photo" src={tempCoverPhoto} alt="book covers" />
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/saved">Saved</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul> */}
        <p className="header_subtext">track books you've read.</p>
        <p className="header_subtext">save those you want to read.</p>
      </div>

    </React.Fragment>
  );
}

export default Header;