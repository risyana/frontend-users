import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: "",
        name: "",
        phone: ""
      }
    };

    this.updateValues = this.updateValues.bind(this);
  }

  updateValues(e) {
    let { user } = this.state;
    let id = e.target.id;
    let value = e.target.value;
    let updatedInfo = { [id]: value };

    user = { ...user, ...updatedInfo };
    this.setState({ user });
  }

  render() {
    let { user } = this.state;
    let { onRegisterHandler } = this.props;
    return (
      <div className="main">
        <h3>{this.props.title}</h3>
        <form className="portfolioForm" onChange={this.updateValues}>
          <div>
            <span>Email </span>
            <input
              id="email"
              type="email"
              pattern=".+@+.+.com"
              onChange={this.updateValues}
            />
          </div>
          <div>
            <span>Name </span>
            <input id="name" type="text" onChange={this.updateValues} />
          </div>
          <div>
            <span>Phone </span>
            <input id="phone" type="text" onChange={this.updateValues} />
          </div>
          <div>
            <span>Password </span>
            <input id="password" type="password" onChange={this.updateValues} />
          </div>
          <div style={{ marginTop: 15 }}>
            <span> </span>
            <input
              type="button"
              value="Register"
              onClick={() => {
                onRegisterHandler(user);
              }}
            />
          </div>
        </form>
        <Link to={"/"}> Cancel </Link>
      </div>
    );
  }
}

export default Register;
