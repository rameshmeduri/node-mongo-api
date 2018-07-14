import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => (
  <header>
    <div className="header-main">
      <div className="container-fluid">
        <Link to="/" className="header-brand">
          <img className="header-brand-image" src={process.env.PUBLIC_URL + '/images/axa_logo.svg'} alt="Home" />
          <br />
          <span> API Access Manager </span>
        </Link>
        { currentUser 
          ? <nav id="overviewNav" className="nav float-xs-right">
              <ul className="nav-list">
                <li  className="nav-item"> <Link className="nav-link" to={'/consumers'}>Consumers</Link ></li>
                <li  className="nav-item"> <Link className="nav-link" to={'/apis'}>APIs</Link ></li>
                <li  className="nav-item"> <Link className="nav-link" to="/" onClick={onLogout}>Log out</Link ></li>
              </ul>
              <div className="nav-stroke" data-spy="stroke" data-target="#overviewNav" />
            </nav>
          : null
        }
      </div>
    </div>
  </header>
);

export default Navbar;
