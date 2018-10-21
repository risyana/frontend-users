import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Password from './components/Password';
import CONFIG from './config/config';
import HEADER from './config/header';

import './index.css';

const history = createBrowserHistory();

const { ENDPOINT } = CONFIG;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      redirectAfterRegister: false,
    };

    this.onLogout = this.onLogout.bind(this);

    this.fetchSignInInfo = this.fetchSignInInfo.bind(this);
    this.setSignInInfo = this.setSignInInfo.bind(this);
    this.onSignInHandler = this.onSignInHandler.bind(this);

    this.onRegisterHandler = this.onRegisterHandler.bind(this);
    this.onUpdateHandler = this.onUpdateHandler.bind(this);
    this.onEditPasswordHandler = this.onEditPasswordHandler.bind(this);
  }

  componentDidMount() {
    fetch(`${ENDPOINT}/users/test/`)
      .then(res => res.json())
      .then((result) => {
        console.log(result.message);
      })
      .catch((err) => {
        alert(`${err}\n${ENDPOINT}`);
      });
  }

  onLogout() {
    this.setState({ user: null, redirectAfterRegister: false });
  }

  onSignInHandler(credential) {
    this.fetchSignInInfo(credential);
  }

  onRegisterHandler(user) {
    fetch(`${ENDPOINT}/users/`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user),
      headers: { ...HEADER },
    })
      .then((response) => {
        if (response.status === 201) {
          alert('Registration Success. You can login now');
          return response.json();
        }
        alert('Registration Failed');
        return null;
      })
      .then(() => {
        this.setState({ redirectAfterRegister: true });
      })
      .then(() => {
        this.setState({ redirectAfterRegister: false });
      })
      .catch((err) => {
        alert(`${err}\n${ENDPOINT}`);
      });
  }

  onUpdateHandler(user) {
    fetch(`${ENDPOINT}/users/${user.id}`, {
      method: 'PATCH',
      mode: 'cors',
      body: JSON.stringify(user),
      headers: { ...HEADER },
    })
      .then((response) => {
        if (response.status === 201) {
          alert('Update Success !');
          return response.json();
        }
        alert('Update Failed');
        return null;
      })
      .then((result) => {
        const token = localStorage.getItem('token');
        this.setSignInInfo(result.updatedUser, user.password, token); // {email, id, name, phone}
      })
      .catch((err) => {
        alert(`${err}\n${ENDPOINT}`);
      });
  }

  onEditPasswordHandler(email, password, newPassword) {
    fetch(`${ENDPOINT}/users/signin`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email, password }),
      headers: { ...HEADER },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Email & Current Password does not match');
      })
      .then(() => {
        const { user } = this.state;
        user.password = newPassword;
        this.onUpdateHandler(user);
      })
      .catch((err) => {
        alert(`${err}\n${ENDPOINT}`);
      });
  }

  setSignInInfo(result, password, token) {
    result = { ...result, password };
    this.setState({ user: result, redirectAfterRegister: true });
    localStorage.setItem('token', token);
  }

  fetchSignInInfo(credential) {
    fetch(`${ENDPOINT}/users/signin`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(credential),
      headers: { ...HEADER },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        alert('Username and Password does not match');
        return null;
      })
      .then((result) => {
        if (result) {
          this.setSignInInfo(result.user, credential.password, result.token); // {email, id, name, phone}
        }
      })
      .catch((err) => {
        alert(`${err}\n${ENDPOINT}`);
      });
  }

  render() {
    const { user, redirectAfterRegister } = this.state;

    return (
      <div>
        <Router history={history}>
          <div className="container">
            <div className="header">
              <h1>
                {'User Management'}
              </h1>
              <div>
                {user ? user.email : ''}
              </div>
            </div>
            <Nav onlogout={this.onLogout} user={user} />
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Login
                    title="Login"
                    onSignInHandler={this.onSignInHandler}
                    currentUser={user}
                  />
                )}
              />
              <Route
                path="/profile"
                component={() => (
                  <Profile user={user} onUpdateHandler={this.onUpdateHandler} />
                )}
              />
              <Route
                path="/password"
                component={() => (
                  <Password user={user} onEditPasswordHandler={this.onEditPasswordHandler} />
                )}
              />
              {
                <Route
                  path="/register"
                  component={() => (
                    <Register
                      title="Register"
                      onRegisterHandler={this.onRegisterHandler}
                      redirectAfterRegister={redirectAfterRegister}
                    />
                  )}
                />
              }
              <Route component={() => (
                <h1>
                  {'404: not found'}
                </h1>
              )}
              />
            </Switch>
            <div className="footer">
              <p>
                {'risyana.github.io'}
              </p>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
