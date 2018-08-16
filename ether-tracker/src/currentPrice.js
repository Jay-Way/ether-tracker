import React, { Component } from 'react';
import './App.css';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';


const styles = {
    root: {
        width: '100%',
        maxWidth: 500,
    },
};


class currentPrice extends Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchReload = this.fetchReload.bind(this);

        this.state = {
            price: [],
            eur: '',
            usd: '',
            btc: '',
        };
    }

    componentDidMount() {
        // Seitentitel:
        document.title = "Ether price";
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
            .then(response => response.json())
            .then(price => {
                        this.setState({
                            usd: price.USD,
                            eur: price.EUR,
                            btc: price.BTC,
                        });

                    });
        // Alle 10 sekunden neu fetchen und Preise aktualisieren
        this.timer = setInterval(()=> this.fetchReload(), 10000)
            }
    fetchReload(){
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
            .then(response => response.json())
            .then(price => {
                this.setState({
                    usd: price.USD,
                    eur: price.EUR,
                    btc: price.BTC,
                });

            });
        console.log('state usd: '+this.state.usd);
    }



    render() {
        const {usd, eur, btc} = this.state;

        return (
            <Paper>
                <Typography variant="display3" component="h3">
                    Current Ether Price:
                        <div>


                        <Typography variant="display2" component="h2">
                            Usd: {usd}{' '}
                            Eur: {eur}{' '}
                            Btc: {btc}{' '}
                        </Typography>
                            <Typography variant="subheading">
                                Preise werden alle 10 Sekunden aktualisiert. Manueller reload:
                                <IconButton>
                                    <Refresh onClick={this.fetchReload}/>
                                </IconButton>
                            </Typography>

                        </div>


                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(currentPrice);