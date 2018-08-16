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
          <Paper style={{flex: 1, flexDirection: 'column', margin: 25, padding: 25}}>
            <EtherCard />
              <ExpansionPanel style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}/>
          </Paper>
      </div>


    );
  }
}

export default App;
