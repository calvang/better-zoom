import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Help from '../views/Help';
import Room from '../views/Room';

export default function Routes() {
  const [username, setUser] = useState('');

  const updateUsername = (e: any) => {
    setUser(e.target.value);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/room/:roomId?" render={(props: any) =>
          <Room {...props} username={username} />}>
        </Route>
        <Route path="/help" component={Help}></Route>
        <Route path="/" render={(props: any) =>
          <Home {...props} updateUsername={updateUsername} username={username} />}>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}