import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    let name = 'Diego';
    let headerStyle = {color: '#d5d5d5'};
    return (
      <div className="App">
        <h1>Title</h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 style={headerStyle} className="App-title">Hello, {name}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
