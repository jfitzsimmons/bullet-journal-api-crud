
import React, { Component } from "react";
import AddBullet from "./Components/AddBullet";
import { Route, BrowserRouter as Router } from "react-router-dom";
// import Dailies from "./Components/Dailies";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={AddBullet} />
        {/* <Route exact path="/view" component={Dailies} /> */}
      </Router>
    );
  }
}

export default App;