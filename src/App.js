import React from 'react';
import { Switch, Route } from 'react-router-dom';


import HomePage from './pages/homepage/homepage.component';

import './App.css';

const Hat = () => (
  <div>
    <h1>HATSSSSS</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/hats'} component={Hat} />
      </Switch>
    </div>
  );
}

export default App;
