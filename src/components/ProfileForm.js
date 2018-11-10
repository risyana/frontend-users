import React from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import validatePhone from '../validations/phone';
import validateName from '../validations/name';

class PageForm extends React.Component {
  state = {
    user: {
      id: '',
      email: '',
      password: '',
      name: '',
      phone: '',
    },
    isValid: {
      email: true,
      name: true,
      phone: true,
    },
    message: {
      email: '',
      name: '',
      phone: '',
    },
  };

  componentWillMount() {
    this.setState((prevState, props) => {
      const { user } = props;
      return { user };
    });
  }

  updateValues = async (id, value) => {
    const { user } = this.state;
    const updatedInfo = { [id]: value };
    this.setState({
      user: { ...user, ...updatedInfo },
    });
  }

  validateInput = async (id, value) => {
    const { isValid, message } = this.state;
    let validationResult = true;
    switch (id) {
      case 'phone':
        validationResult = await validatePhone(value);
        break;
      case 'name':
        validationResult = validateName(value);
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

  inputHanlder = async (id, value) => {
    await this.updateValues(id, value);
    await this.validateInputDebounce(id, value);
  }

  render() {
    const { user, message, isValid } = this.state;
    const { onUpdateHandler, title } = this.props;

    const isFormValid = isValid.email && isValid.name && isValid.phone;

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
              value={user.email}
              disabled
            />
            <span className="message">
              {' '}
            </span>
          </div>

          <div>
            <span>
              {'Name'}
            </span>
            <input
              id="name"
              type="text"
              onChange={e => this.inputHanlder(e.target.id, e.target.value)}
              value={user.name}
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
              onChange={e => this.inputHanlder(e.target.id, e.target.value)}
              value={user.phone}
            />
            <span className="message">
              {message.phone}
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
                onUpdateHandler(user);
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

export default PageForm;
