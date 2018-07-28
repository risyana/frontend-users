import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import EmailValidator from 'email-validator';

const ENDPOINT = 'http://localhost:2121';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        name: '',
        phone: '',
        rePassword: '',
      },
      existingUser: {
        email: [],
        phone: [],
      },
      isValid: {
        email: false,
        name: false,
        phone: false,
        password: false,
        rePassword: false,
      },
      message: {
        email: '',
        name: '',
        phone: '',
        password: '',
        rePassword: '',
      },
    };

    this.updateValues = this.updateValues.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    fetch(`${ENDPOINT}/users`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const existingUser = { email: [], phone: [] };
        result.user.map((user) => {
          existingUser.email.push(user.email);
          existingUser.phone.push(user.phone);
          return true;
        });
        this.setState({ existingUser });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateValues(e) {
    let { user } = this.state;
    const { id, value } = e.target;

    if (id === 'email') {
      if (!this.validateEmail(value)) return null;
    }

    if (id === 'phone') {
      if (!this.validatePhone(value)) return null;
    }

    if (id === 'name') {
      if (!this.validateName(value)) return null;
    }

    if (id === 'password') {
      if (!this.validatePassword(value)) return null;
    }

    if (id === 'rePassword') {
      if (!this.validateRePassword(value)) return null;
    }

    const updatedInfo = { [id]: value };
    user = { ...user, ...updatedInfo };
    this.setState({ user });
    return null;
  }

  validateEmail(email) {
    // validate mandatory

    if (!email) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, email: false },
          message: { ...prevState.message, email: 'please input email' },
        });
      });
      return false;
    }

    // validate format
    if (!EmailValidator.validate(email)) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, email: false },
          message: { ...prevState.message, email: 'invalid email' },
        });
      });
      return false;
    }

    // validate uniqueness (check existing email)
    const { existingUser } = this.state;
    if (existingUser.email.find(existingEmail => existingEmail === email)) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, email: false },
          message: { ...prevState.message, email: 'email address already taken' },
        });
      });
      return false;
    }

    this.setState((prevState) => {
      return ({
        isValid: { ...prevState.isValid, email: true },
        message: { ...prevState.message, email: '' },
      });
    });
    return true;
  }

  validatePhone(phone) {
    // validate mandatory
    if (!phone) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, phone: false },
          message: { ...prevState.message, phone: 'please input phone number' },
        });
      });
      return false;
    }

    // validate format. valid example : 0856111111111, +62856111111111
    const phoneFormat = /^(0|\+[0-9]{1,4})?[0-9]{6,}$/g;
    if (!phone.match(phoneFormat)) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, phone: false },
          message: { ...prevState.message, phone: 'invalid phone number' },
        });
      });
      return false;
    }

    // validate unique (check existing phone number)
    const { existingUser } = this.state;
    if (existingUser.phone.find(existingPhone => existingPhone === phone)) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, phone: false },
          message: { ...prevState.message, phone: 'phone number already taken' },
        });
      });
      return false;
    }

    this.setState((prevState) => {
      return ({
        isValid: { ...prevState.isValid, phone: true },
        message: { ...prevState.message, phone: '' },
      });
    });
    return true;
  }

  validateName(name) {
    // validate mandatory
    if (!name) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, name: false },
          message: { ...prevState.message, name: 'please input your name' },
        });
      });
      return false;
    }

    this.setState((prevState) => {
      return ({
        isValid: { ...prevState.isValid, name: true },
        message: { ...prevState.message, name: '' },
      });
    });
    return true;
  }

  validatePassword(password) {
    // validate mandatory
    if (!password) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, password: false },
          message: { ...prevState.message, password: 'please input password' },
        });
      });
      return false;
    }

    // validate password criteria : 8 digit; contain word and letter
    const passwordFormat = /^(?=.*?\D)(?=.*?\d).{8,}$/g;
    if (!password.match(passwordFormat)) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, password: false },
          message: { ...prevState.message, password: 'password must at least 8 digit which contain letter and number' },
        });
      });
      return false;
    }

    this.setState((prevState) => {
      return ({
        isValid: { ...prevState.isValid, password: true },
        message: { ...prevState.message, password: '' },
      });
    });
    return true;
  }

  validateRePassword(rePassword) {
    // validate mandatory
    if (!rePassword) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, rePassword: false },
          message: { ...prevState.message, rePassword: 'please retype password' },
        });
      });
      return false;
    }

    // check if the password already valid
    const { isValid } = this.state;
    if (!isValid.password) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, rePassword: false },
          message: { ...prevState.message, rePassword: 'the above password is not valid yet' },
        });
      });
      return false;
    }

    // compare with password
    const { user } = this.state;
    if (rePassword !== user.password) {
      this.setState((prevState) => {
        return ({
          isValid: { ...prevState.isValid, rePassword: false },
          message: { ...prevState.message, rePassword: 'password doesn\'t match' },
        });
      });
      return false;
    }

    this.setState((prevState) => {
      return ({
        isValid: { ...prevState.isValid, rePassword: true },
        message: { ...prevState.message, rePassword: '' },
      });
    });
    return true;
  }

  render() {
    const { user, message, isValid } = this.state;
    const { onRegisterHandler, title, redirectAfterRegister } = this.props;

    const isFormValid = isValid.email
      && isValid.password && isValid.name
      && isValid.phone && isValid.rePassword;

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
              {'Email'}
            </span>
            <input
              id="email"
              type="email"
              pattern=".+@+.+.com"
              onChange={this.updateValues}
            />
            <span className="message">
              {message.email}
            </span>
          </div>

          <div>
            <span>
              {'Name'}
            </span>
            <input id="name" type="text" onChange={this.updateValues} />
            <span className="message">
              {message.name}
            </span>
          </div>

          <div>
            <span>
              {'Phone'}
            </span>
            <input id="phone" type="text" onChange={this.updateValues} />
            <span className="message">
              {message.phone}
            </span>
          </div>

          <div>
            <span>
              {'Password'}
            </span>
            <input id="password" type="password" onChange={this.updateValues} />
            <span className="message">
              {message.password}
            </span>
          </div>

          <div>
            <span>
              {'Retype Password'}
            </span>
            <input id="rePassword" type="password" onChange={this.updateValues} />
            <span className="message">
              {message.rePassword}
            </span>
          </div>

          <div style={{ marginTop: 15 }}>
            <span>
              {' '}
            </span>
            <input
              className={(isFormValid) ? 'btn' : 'btnDisabled'}
              disabled={!isFormValid}
              type="button"
              value="Register"
              onClick={() => {
                onRegisterHandler(user);
              }}
            />
            <span className="message" style={{ marginLeft: 10 }}>
              <Link to="/">
                {'Cancel'}
              </Link>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
