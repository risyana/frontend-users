import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Profile from './components/Profile';
import './index.css';

const history = createBrowserHistory();

const HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

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
  }

  onLogout() {
    this.setState({ user: null, redirectAfterRegister: false });
  }

  onSignInHandler(credential) {
    this.fetchSignInInfo(credential);
  }

  onRegisterHandler(user) {
    fetch('http://localhost:2121/users/', {
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
      .catch((err) => {
        console.log(err);
      });
  }

  onUpdateHandler(user) {
    // console.log(HEADER);
    fetch(`http://localhost:2121/users/${user.id}`, {
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

  setSignInInfo(result, password) {
    result = { ...result, password };
    this.setState({ user: result, redirectAfterRegister: true });
  }

  fetchSignInInfo(credential) {
    fetch('http://localhost:2121/users/signin', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(credential),
      headers: { ...HEADER },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        alert('Login Failed');
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
                user management
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
                  404: not found
                </h1>
              )}
              />
            </Switch>
            <div className="footer">
              <p>
                risyana.github.io
              </p>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
