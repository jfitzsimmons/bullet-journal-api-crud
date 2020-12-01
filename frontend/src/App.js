import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AddBullet from './Components/AddBullet';
import Dailies from './Components/Dailies';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={AddBullet} />
        <Route exact path="/view" component={Dailies} />
      </Router>
    );
  }
}

export default App;
