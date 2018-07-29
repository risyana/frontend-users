import React from 'react';
import { Link } from 'react-router-dom';

const UL_STYLE = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  padding: '0',
  marginLeft: '0',
  listStyleType: 'none',
};

const Nav = (props) => {
  const { onlogout, user } = props;

  if (!user) return <div className="nav" />;

  return (
    <div className="nav">
      <ul style={UL_STYLE}>
        <li>
          <Link to="/" />
        </li>
        <li>
          <Link to={`/profile/edit/${user.id}`}>
            {'Edit Profil'}
          </Link>
        </li>
        <li>
          <Link to={`/password/edit/${user.id}`}>
            {'Edit Password'}
          </Link>
        </li>
        <li>
          <Link to="/" />
        </li>
        <li>
          <Link to="/" />
        </li>
        <li>
          <Link to="/" />
        </li>
        <li>
          <a onClick={onlogout} href="##">
            {'Logout'}
          </a>
        </li>
      </ul>
    </div>
  );
};


export default Nav;
