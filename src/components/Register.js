import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import validateEmail from '../validations/email';
import validatePhone from '../validations/phone';
import validateName from '../validations/name';
import { validatePassword, validateRePassword } from '../validations/password';

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
    const {
      user, isValid,
      message, existingUser,
    } = this.state;

    const { id, value } = e.target;

    let validationResult = true;

    switch (id) {
      case 'email':
        validationResult = validateEmail(value, existingUser);
        break;
      case 'phone':
        validationResult = validatePhone(value, existingUser);
        break;
      case 'name':
        validationResult = validateName(value);
        break;
      case 'password':
        validationResult = validatePassword(value);
        break;
      case 'rePassword':
        validationResult = validateRePassword(value, isValid.password, user.password);
        break;
      default:
        validationResult = { isValid: true, message: '' };
        break;
    }

    const updatedInfo = { [id]: value };

    this.setState({
      user: { ...user, ...updatedInfo },
      isValid: { ...isValid, [id]: validationResult.isValid },
      message: { ...message, [id]: validationResult.message },
    });

    return null;
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
