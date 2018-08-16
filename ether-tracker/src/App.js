import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Charts from './chart';
import CurrentPrice from './currentPrice';
import Paper from '@material-ui/core/Paper';


class App extends Component {

    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div className="App">
          <Paper>
          <CurrentPrice />
          <Charts />
          </Paper>
      </div>


    );
  }
}

export default App;
