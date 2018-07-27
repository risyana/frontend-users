import React from "react";
import { Link } from "react-router-dom";

class PageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: "",
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

  componentWillMount() {
    console.log("props change profie", this.props.user);
    const currentUser = { ...this.props.user };
    this.setState({ user: currentUser });
  }

  render() {
    let { onUpdateHandler } = this.props;

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
              value={this.state.user.email}
              disabled
            />
          </div>
          <div>
            <span>Name </span>
            <input
              id="name"
              type="text"
              onChange={this.updateValues}
              value={this.state.user.name}
            />
          </div>
          <div>
            <span>Phone </span>
            <input
              id="phone"
              type="text"
              onChange={this.updateValues}
              value={this.state.user.phone}
            />
          </div>
          <div>
            <span>Password </span>
            <input
              id="password"
              type="password"
              onChange={this.updateValues}
              value={this.state.user.password}
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <span> </span>
            <input
              className="btn"
              type="button"
              value="Update"
              onClick={() => {
                onUpdateHandler(this.state.user);
              }}
            />
          </div>
        </form>
        <Link to={"/"}> Cancel </Link>
      </div>
    );
  }
}

export default PageForm;
