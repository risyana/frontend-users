import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProfileForm from './ProfileForm';

const Profile = (props) => {
  const { user, onUpdateHandler } = props;

  if (!user) return <Redirect to="/" />;

  return (
    <div className="main">
      <h2>
        {'Edit Profile'}
      </h2>
      <Switch>
        <Route
          path="/profile/edit/:id" // update & delete
          component={() => (
            <ProfileForm user={user} onUpdateHandler={onUpdateHandler} />
          )}
        />
      </Switch>
    </div>
  );
};

export default Profile;
