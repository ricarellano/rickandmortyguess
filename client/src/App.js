import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Character from "./components/character/Character";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App wrapper">
            <div className="header">
              <h1 className="header-title">Rick and Morty Guess</h1>
            </div>
            <Route exact path="/" component={Character} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
