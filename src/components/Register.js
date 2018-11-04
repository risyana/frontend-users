import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import validateEmail from '../validations/email';
import validatePhone from '../validations/phone';
import validateName from '../validations/name';
import { validatePassword, validateRePassword } from '../validations/password';

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

  async updateValues(e) {
    const {
      user, isValid,
      message,
    } = this.state;

    const { id, value } = e.target;

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
              value={user.email}
              id="email"
              type="email"
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
            <input
              value={user.name}
              id="name"
              type="text"
              onChange={this.updateValues} 
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
              value={user.phone}
              id="phone"
              type="text"
              onChange={this.updateValues}
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
              value={user.password}
              id="password"
              type="password"
              onChange={this.updateValues}
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
              value={user.rePassword}
              id="rePassword"
              type="password"
              onChange={this.updateValues}
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
