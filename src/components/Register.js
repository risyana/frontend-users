import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { debounce } from 'lodash';
import validateEmail from '../validations/email';
import validatePhone from '../validations/phone';
import validateName from '../validations/name';
import { validatePassword, validateRePassword } from '../validations/password';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      name: '',
      phone: '',
      rePassword: '',
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


  updateValues = async (id, value) => {
    const { user } = this.state;
    const updatedInfo = { [id]: value };
    this.setState({
      user: { ...user, ...updatedInfo },
    });
  };

  inputHandler = async (id, value) => {
    await this.updateValues(id, value);
    await this.validateInputDebounce(id, value);
  }

  validateInput = async (id, value) => {
    const {
      user,
      isValid,
      message,
    } = this.state;

    let validationResult = true;

    switch (id) {
      case 'email':
        validationResult = await validateEmail(value);
        break;
      case 'phone':
        validationResult = await validatePhone(value);
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

    this.setState({
      isValid: { ...isValid, [id]: validationResult.isValid },
      message: { ...message, [id]: validationResult.message },
    });
  }

  validateInputDebounce = debounce(this.validateInput, 600);

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
        <form className="portfolioForm">
          <div>
            <span>
              {'Email'}
            </span>
            <input
              id="email"
              type="email"
              onChange={e => this.inputHandler(e.target.id, e.target.value)}
            />
            <span className="message">
              {message.email}
            </span>
          </div>

          <div>
            <span>
              {'Name'}
            </span>
            <input
              id="name"
              type="text"
              onChange={e => this.inputHandler(e.target.id, e.target.value)}
            />
            <span className="message">
              {message.name}
            </span>
          </div>

          <div>
            <span>
              {'Phone'}
            </span>
            <input
              id="phone"
              type="text"
              onChange={e => this.inputHandler(e.target.id, e.target.value)}
            />
            <span className="message">
              {message.phone}
            </span>
          </div>

          <div>
            <span>
              {'Password'}
            </span>
            <input
              id="password"
              type="password"
              onChange={e => this.inputHandler(e.target.id, e.target.value)}
            />
            <span className="message">
              {message.password}
            </span>
          </div>

          <div>
            <span>
              {'Retype Password'}
            </span>
            <input
              id="rePassword"
              type="password"
              onChange={e => this.inputHandler(e.target.id, e.target.value)}
            />
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
