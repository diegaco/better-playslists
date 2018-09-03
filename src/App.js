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
        songs: [
          { name: "Vaina Loca", duration: 1345 },
          { name: "Cuando Te Besé", duration: 2345 },
          { name: "No Es Justo", duration: 3456 }
        ]
      },
      {
        name: "Rock Nacional Argentino",
        songs: [
          { name: "Juguetes Perdidos", duration: 2534 },
          { name: "Mirenla", duration: 4025 },
          { name: "Persiana Americana", duration: 1967 }
        ]
      },
      {
        name: "Cumbia Cheta",
        songs: [
          { name: "Se Canso y Bailó", duration: 3736 },
          { name: "Sin Pijama", duration: 3626 },
          { name: "Me Niego", duration: 4838 }
        ]
      },
      {
        name: "De Fiesta",
        songs: [
          { name: "Mi Cama", duration: 3788 },
          { name: "X", duration: 2535 },
          { name: "1,2,3", duration: 2443 }
        ]
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
        <h2>{this.props.playlists.length} playilsts</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    // we get all the songs in one list
    // songs is the acumulator starting array
    const allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      // eachPlaylist is serverData.user.playlist array object item
      // { name: 'Top 50 Uruguay', songs: [{name: 'Vaina Loca', duration: 1234}]}
      return songs.concat(eachPlaylist.songs);
    }, []);

    const totalDuration = allSongs.reduce((sum, song) => {
      return sum + song.duration;
    }, 0);

    return (
      <div
        className="aggregate"
        style={{ ...defaultStyle, width: "40%", display: "inline-block" }}
      >
        <h2>{Math.floor(totalDuration / 60)} Hours </h2>
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
        <h3> {this.props.playlist.name} </h3>
        <ul>
          {this.props.playlist.songs.map(song => {
            return <li key={song.name}>{song.name}</li>;
          })}
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
        {/* // Conditional Rendering */}
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, fontSize: "54px" }}>
              {this.state.serverData.user.name}
              's PlayLists
            </h1>

            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter />
            {this.state.serverData.user.playlists.map(playlist => {
              return <Playlist playlist={playlist} />;
            })}
          </div>
        ) : (
          <h1 style={defaultStyle}>Loading... </h1>
        )}
      </div>
    );
  }
}

export default App;
