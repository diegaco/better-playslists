import React, { Component } from "react";
import "./App.css";

const defaultStyle = {
  color: "#fff"
};

const fakeServerData = {
  user: {
    name: "Diego",
    playlists: [
      {
        name: "Top 50 Uruguay",
        songs: ["Vaina Loca", "Cuando Te Besé", "No Es Justo"]
      },
      {
        name: "Rock Nacional Argentino",
        songs: ["Juguetes Perdidos", "Mirenla", "Persiana Americana"]
      },
      {
        name: "Cumbia Cheta",
        songs: ["Se Canso y Bailó", "Sin Pijama", "Me Niego"]
      },
      {
        name: "De Fiesta",
        songs: ["Mi Cama", "X", "1,2,3"]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div
        className="aggregate"
        style={{ ...defaultStyle, width: "40%", display: "inline-block" }}
      >
        <h2>{this.props.playlists && this.props.playlists.length} playilsts</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    return (
      <div
        className="aggregate"
        style={{ ...defaultStyle, width: "40%", display: "inline-block" }}
      >
        <h2>{this.props.playlists && this.props.playlists.length} Hours</h2>
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
      <div style={{ ...defaultStyle, display: "inline-block", width: "25%" }}>
        <img src="" alt="" />
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
    serverData: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, fontSize: "54px" }}>
              {this.state.serverData.user.name}
              's PlayLists
            </h1>

            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
          </div>
        ) : (
          <h1 style={defaultStyle}>Loading... </h1>
        )}
      </div>
    );
  }
}

export default App;
