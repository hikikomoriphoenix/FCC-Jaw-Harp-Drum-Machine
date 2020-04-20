import React from 'react';
import './App.css';
import DrumPad from './DrumPad.js';

const keys = [
  [
    'Q', 'W', 'E'
  ],
  [
    'A', 'S', 'D'
  ],
  [
    'Z', 'X', 'C'
  ]
];

const clips = [
  require('./audio-clips/jaw-harp-1.wav'),
  require('./audio-clips/jaw-harp-2.wav'),
  require('./audio-clips/jaw-harp-3.wav'),
  require('./audio-clips/jaw-harp-4.wav'),
  require('./audio-clips/jaw-harp-5.wav'),
  require('./audio-clips/jaw-harp-6.wav'),
  require('./audio-clips/jaw-harp-7.wav'),
  require('./audio-clips/jaw-harp-8.wav'),
  require('./audio-clips/jaw-harp-9.wav')
];

const keyCodeValues = {
  81: 'Q',
  87: 'W',
  69: 'E',
  65: 'A',
  83: 'S',
  68: 'D',
  90: 'Z',
  88: 'X',
  67: 'C'
}

const displays = {
  Q: "Jaw Harp 1",
  W: "Jaw Harp 2",
  E: "Jaw Harp 3",
  A: "Jaw Harp 4",
  S: "Jaw Harp 5",
  D: "Jaw Harp 6",
  Z: "Jaw Harp 7",
  X: "Jaw Harp 8",
  C: "Jaw Harp 9"
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Play Jaw Harp'
    };
  }

  handleKeyDown = (event) => {
    if (keyCodeValues.hasOwnProperty(event.keyCode)) {
      this.playAudio(keyCodeValues[event.keyCode]);
    }
  }

  playAudio = (id) => {
    const audio = document.getElementById(id);
    if (audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2) {
      audio.cloneNode(true).play();
    } else {
      audio.play();
    }
    this.setState({display: displays[id]});
  }

  render() {
    const rows = [];
    var k = 0;
    for (let i = 0; i < 3; i++) {
      const cells = [];
      for (let j = 0; j < 3; j++) {
        cells.push(<DrumPad drumKey={keys[i][j]} drumAudio={clips[k]} clickHandler={this.playAudio}/>);
        k++;
      }
      rows.push(<div className="row">
        {cells}
      </div>);
    }

    return (<div className="App container-fluid d-flex flex-column
     justify-content-center">
      <div className="row">
        <div id="drum-machine" className="col-md-4 mx-auto">
          <div className="row py-3">
            <div id="display" className="col-sm-6 text-center m-auto p-1">{this.state.display}</div>
          </div>
          {rows}
        </div>
      </div>
    </div>);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
}

export default App;
