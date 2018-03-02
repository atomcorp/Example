import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './test.module.css';
import { Courses } from './components/courses/courses.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className={styles.thing}>Hello</div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Courses />
      </div>
    );
  }
}

export default App;
