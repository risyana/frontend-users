import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '123123@fadf.com',
        password: 'popo1234',
      },
    };

    this.updateValues = this.updateValues.bind(this);
  }

  updateValues(e) {
    let { user } = this.state;
    const { id, value } = e.target;
    const updatedInfo = { [id]: value };

    user = { ...user, ...updatedInfo };
    this.setState({ user });
  }

  render() {
    const { user, email, password } = this.state;
    const { onSignInHandler, currentUser, title } = this.props;

    if (currentUser) return <Dashboard />;

    if (currentUser === undefined) {
      return <p />;
    }

    return (
      <div className="main">
        <div className="loginWrapper">
          <h3>
            {title}
          </h3>
          <form className="login" onChange={this.updateValues}>
            <div>
              <span>
                {'Email'}
              </span>
              <input id="email" type="email" value={email} />
            </div>
            <div>
              <span>
                {'Password'}
              </span>
              <input
                id="password"
                type="password"
                value={password}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span />
              <input
                type="button"
                className="btn"
                value="Login"
                onClick={() => {
                  onSignInHandler(user);
                }}
              />
            </div>
          </form>
          <Link to="/register">
            {'Register'}
          </Link>
          <div />
        </div>
      </div>
    );
  }
}

export default Login;
