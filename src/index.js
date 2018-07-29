import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Password from './components/Password';
import './index.css';

const history = createBrowserHistory();

const HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

const ENDPOINT = 'http://localhost:2121';

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
        console.log(err);
      });
  }

  onUpdateHandler(user) {
    // console.log(HEADER);
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
        this.setSignInInfo(result.updatedUser, user.password); // {email, id, name, phone}
      })
      .catch((err) => {
        console.log(err);
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
        alert('Username and Password does not match');
        return null;
      })
      .then((result) => {
        this.setSignInInfo(result.user, newPassword);
      })
      .then(() => {
        const { user } = this.state;
        user.password = newPassword;
        this.onUpdateHandler(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setSignInInfo(result, password) {
    result = { ...result, password };
    this.setState({ user: result, redirectAfterRegister: true });
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
        this.setSignInInfo(result.user, credential.password); // {email, id, name, phone}
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const { user, redirectAfterRegister } = this.state;

    return (
      <div>
        <Router history={history}>
          <div className="container">
            <div className="header">
              <h2>
                {'user management'}
              </h2>
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
