import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PasswordForm from './PasswordForm';

const Password = (props) => {
  const { user, onUpdateHandler } = props;

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
            <PasswordForm user={user} onUpdateHandler={onUpdateHandler} />
          )}
        />
      </Switch>
    </div>
  );
};

export default Password;
