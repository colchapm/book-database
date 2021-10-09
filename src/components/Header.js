import React from 'react';
import coverPhoto from "./../img/bookboxcover.png"

function Header(){
  return (
    <React.Fragment>
      <div className="header_page">
        <img className="photo" src={coverPhoto} alt="book covers" />
        <p className="header_subtext1">track books you've read.</p>
        <p className="header_subtext2">save those you want to read.</p>
      </div>

    </React.Fragment>
  );
}

export default Header;