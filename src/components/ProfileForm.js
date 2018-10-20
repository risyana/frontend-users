import React from 'react';
import { Link } from 'react-router-dom';
import validatePhone from '../validations/phone';
import validateName from '../validations/name';

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

    this.updateValues = this.updateValues.bind(this);
  }

  componentWillMount() {
    this.setState((prevState, props) => {
      const { user } = props;
      return { user };
    });
  }

  async updateValues(e) {
    const {
      user, isValid,
      message,
    } = this.state;

    const { id, value } = e.target;

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
    const { onUpdateHandler, title } = this.props;

    const isFormValid = isValid.email && isValid.name && isValid.phone;

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
              onChange={this.updateValues}
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
              onChange={this.updateValues}
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
