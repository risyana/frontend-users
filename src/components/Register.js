import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        name: '',
        phone: '',
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
    const { user } = this.state;
    const { onRegisterHandler, title, redirectAfterRegister } = this.props;

    if (redirectAfterRegister) {
      return <Redirect to="/" />;
    }

    return (
      <div className="main">
        <h3>
          {title}
        </h3>
        <form className="portfolioForm" onChange={this.updateValues}>
          <div>
            <span>
              Email
            </span>
            <input
              id="email"
              type="email"
              pattern=".+@+.+.com"
              onChange={this.updateValues}
            />
          </div>
          <div>
            <span>
              Name
            </span>
            <input id="name" type="text" onChange={this.updateValues} />
          </div>
          <div>
            <span>
              Phone
            </span>
            <input id="phone" type="text" onChange={this.updateValues} />
          </div>
          <div>
            <span>
              Password
            </span>
            <input id="password" type="password" onChange={this.updateValues} />
          </div>
          <div style={{ marginTop: 15 }}>
            <span />
            <input
              className="btn"
              type="button"
              value="Register"
              onClick={() => {
                onRegisterHandler(user);
              }}
            />
          </div>
        </form>
        <Link to="/">
          Cancel
        </Link>
      </div>
    );
  }
}

export default Register;
