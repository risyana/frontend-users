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

class Nav extends React.Component {
  render() {
    const { onlogout, user } = this.props;

    // if (!user) return <div className="nav" />;
    if (!user) return null;

    return (
      <div className="nav">
        <ul style={UL_STYLE}>
          <li>
            <Link to={`/profile/edit/${user.id}`}>
Edit Profil
</Link>
          </li>
          <li>
            <Link to="/" />
          </li>
          <li>
            <Link to="/" />
          </li>
          <li>
            <a href="#" onClick={onlogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
