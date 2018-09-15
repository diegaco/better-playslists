import React, { Component } from "react";
import "./App.css";
import qs from "qs";

const defaultStyle = {
  color: "#fff"
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
        <input
          type="text"
          onKeyUp={evt => this.props.onTextChange(evt.target.value)}
        />
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div style={{ ...defaultStyle, display: "inline-block", width: "25%" }}>
        <img src={playlist.imageUrl} alt={playlist.name} />
        <h3> {playlist.name} </h3>
        <ul>
          {playlist.songs.map(song => {
            return <li key={song.name}>{song.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  state = {
    serverData: [],
    filterString: ""
  };

  componentDidMount() {
    const urlParsed = qs.parse(window.location.search);
    const accessToken = urlParsed["?access_token"];

    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: {
            name: data.display_name
          }
        });
      });

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          playlists: data.items.map(item => ({
            name: item.name,
            imageUrl: item.images.find(image => image.width == 60).url,
            songs: []
          }))
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const playlistsToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist => {
            return playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase());
          })
        : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h1 style={{ ...defaultStyle, fontSize: "54px" }}>
              {this.state.user.name}
              's PlayLists
            </h1>

            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {playlistsToRender.map((playlist, index) => {
              return <Playlist key={index} playlist={playlist} />;
            })}
          </div>
        ) : (
          <button
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://better-playlists-diego.herokuapp.com/login";
            }}
            style={{
              padding: "15px 30px",
              fontSize: "16px",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}
          >
            Sign In with Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
