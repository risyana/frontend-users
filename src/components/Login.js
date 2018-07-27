import React from 'react';
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: 'EKA@gg.com',
        password: '1',
      },
    };

    this.updateValues = this.updateValues.bind(this);
  }

  updateValues(e) {
    let { user } = this.state;
    const id = e.target.id;
    const value = e.target.value;
    const updatedInfo = { [id]: value };

    user = { ...user, ...updatedInfo };
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { onSignInHandler, currentUser } = this.props;

    if (currentUser) return <Dashboard />;

    if (currentUser === undefined) return <h1 />;

    return (
      <div className="main">
        <div className="loginWrapper">
          <h3>
{this.props.title}
</h3>
          <form className="login" onChange={this.updateValues}>
            <div>
              <span>
Email
{' '}
</span>
              <input id="email" type="email" value={this.state.email} />
            </div>
            <div>
              <span>
Password
{' '}
</span>
              <input
                id="password"
                type="password"
                value={this.state.password}
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
{' '}
Register
{' '}
</Link>
          <div />
        </div>
      </div>
    );
  }
}

export default Login;
