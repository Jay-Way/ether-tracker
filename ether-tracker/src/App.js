import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Charts from './chart';
import EtherCard from './EtherCard';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from './ExpansionPanel';



class App extends Component {

    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div className="App">
          <Paper style={{flex: 1, flexDirection: 'column', margin: 0, padding: 15, height: '100%'}}>
            <EtherCard />
          </Paper>
      </div>
    );
  }
}

export default App;
