import React, { Component } from 'react';
import symmetry from './assets/symmetry.svg';
import './App.css';

import colorScheme from './util/colorScheme';

class App extends Component {
  render() {
    return (
      <div style={styles.background}>
        <header className="App-header">
          <img src={symmetry} alt="logo" />
          <h1 style={{color: colorScheme.primary}}>Under construction!</h1>
        </header>
        <p className="Text" style={{color: colorScheme.secondary}}>
          This will later be the new version of Pontek.se.
        </p>
      </div>
    );
  }
}

const styles = {
  background: {
    backgroundColor: colorScheme.background,
    textAlign: 'center',
  },
}

export default App;
