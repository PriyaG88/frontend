import React, { Component } from 'react';
import './App.css';
import SessionPage from './components/SessionPage';

class App extends Component {
  render() {
    return (
      <div className='session-background'>
        <SessionPage />
      </div>
    );
  }
}

export default App;
