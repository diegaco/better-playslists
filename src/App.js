import React, { Component } from 'react';
import './App.css';

const defaultStyle = {
  color: '#fff'
}

const fakeServerData = {
  user: {
    name: 'Diego',
    playlists: [
      {
        name: 'Top 50 Uruguay',
        songs: []
      },
      {
        name: 'Rock Nacional Argentino',
        songs: []
      },
      {
        name: 'Cumbia Cheta',
        songs: []
      }
    ]
  }
}

class Aggregate extends Component {
  render() {
    return (
      <div className="aggregate" style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" />
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img src="" alt=""/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  state = {
    serverData: fakeServerData
  };

  componentDidMount() {
    // this.setState({
    //   serverData: fakeServerData
    // })
  }

  render() {
    return (
      <div className="App">
        <h1 style={{...defaultStyle, fontSize: '54px'}}> { this.state.serverData.user.name }'s PlayLists </h1>
        <Aggregate/>
        <Aggregate/>
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
