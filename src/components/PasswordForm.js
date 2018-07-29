import React from 'react';
import { Link } from 'react-router-dom';
import { validatePassword, validateRePassword } from '../validations/password';

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: '',
        email: '',
        password: '',
        newPassword: '',
        reNewPassword: '',
      },
      isValid: {
        password: false,
        newPassword: false,
        reNewPassword: false,
      },
      message: {
        password: '',
        newPassword: '',
        reNewPassword: '',
      },
    };

    this.updateValues = this.updateValues.bind(this);
  }

  componentWillMount() {
    const stateUser = this.state.user;
    const propsUser = this.props.user;

    const storedUser = { id: propsUser.id, email: propsUser.email };
    this.setState({ user: { ...stateUser, ...storedUser } });
  }

  updateValues(e) {
    const {
      user, isValid,
      message, existingUser,
    } = this.state;

    const { id, value } = e.target;

    let validationResult = true;

    switch (id) {
      case 'password':
        validationResult = validatePassword(value, existingUser);
        break;
      case 'newPassword':
        validationResult = validatePassword(value);
        break;
      case 'reNewPassword':
        validationResult = validateRePassword(value, isValid.newPassword, user.newPassword);
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
    const { onEditPasswordHandler, title } = this.props;

    const isFormValid = isValid.password && isValid.newPassword && isValid.reNewPassword;

    return (
      <div className="main">
        <h3>
          {title}
        </h3>
        <form className="portfolioForm" onChange={this.updateValues}>

          <div>
            <span>
              {'Current Password'}
            </span>
            <input
              id="password"
              type="password"
              onChange={this.updateValues}
              value={user.password}
            />
            <span className="message">
              {message.password}
            </span>
          </div>

          <div>
            <span>
              {'New Password'}
            </span>
            <input
              id="newPassword"
              type="password"
              onChange={this.updateValues}
              value={user.newPassword}
            />
            <span className="message">
              {message.newPassword}
            </span>
          </div>

          <div>
            <span>
              {'Retype new Password'}
            </span>
            <input
              id="reNewPassword"
              type="password"
              onChange={this.updateValues}
              value={user.reNewPassword}
            />
            <span className="message">
              {message.reNewPassword}
            </span>
          </div>

          <div style={{ marginTop: 15 }}>
            <span />
            <input
              className={(isFormValid) ? 'btn' : 'btnDisabled'}
              disabled={!isFormValid}
              type="button"
              value="Update"
              onClick={() => {
                onEditPasswordHandler(user.email, user.password, user.newPassword);
              }}
            />
          </div>
        </form>
        <Link to="/">
          {'Cancel'}
        </Link>
      </div>
    );
  }
}

export default PasswordForm;
