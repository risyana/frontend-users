import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PasswordForm from './PasswordForm';

const Password = (props) => {
  const { user, onEditPasswordHandler } = props;

  if (!user) return <Redirect to="/" />;

  return (
    <div className="main">
      <h2>
        {'Edit Password'}
      </h2>
      <Switch>
        <Route
          path="/password/edit/:id" // update
          component={() => (
            <PasswordForm user={user} onEditPasswordHandler={onEditPasswordHandler} />
          )}
        />
      </Switch>
    </div>
  );
};

export default Password;
