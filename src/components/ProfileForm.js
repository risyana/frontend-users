import React from 'react';
import { Link } from 'react-router-dom';

class PageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: '',
        email: '',
        password: '',
        name: '',
        phone: '',
      },
    };

    this.updateValues = this.updateValues.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    this.setState({ user });
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
    const { onUpdateHandler, title } = this.props;

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
              value={user.email}
              disabled
            />
          </div>
          <div>
            <span>
              Name
            </span>
            <input
              id="name"
              type="text"
              onChange={this.updateValues}
              value={user.name}
            />
          </div>
          <div>
            <span>
              Phone
            </span>
            <input
              id="phone"
              type="text"
              onChange={this.updateValues}
              value={user.phone}
            />
          </div>
          <div>
            <span>
              Password
            </span>
            <input
              id="password"
              type="password"
              onChange={this.updateValues}
              value={user.password}
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <span />
            <input
              className="btn"
              type="button"
              value="Update"
              onClick={() => {
                onUpdateHandler(user);
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

export default PageForm;
