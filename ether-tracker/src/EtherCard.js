import React, { Component } from 'react';
import './App.css';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import Euro from '@material-ui/icons/EuroSymbol';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

const styles = {
    root: {
        width: '100%',

    },
    Card: {
        minWidth: 275,
        maxWidth: 500,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class EtherCard extends Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleButtonRefresh = this.handleButtonRefresh.bind(this);
        this.fetchPrices = this.fetchPrices.bind(this);
        this.fetchSupply = this.fetchSupply.bind(this);

        this.state = {
            price: [],
            eur: '',
            usd: '',
            btc: '',
            supply: [],
        };
    }

    sliceNumbers(number) {
        // Info: Die '' sind zwei Hochkommas
        number = '' + number;
        console.log(number);
        if (number.length > 3) {
            let mod = number.length % 3;
            let i;
            let output = (mod > 0 ? (number.substring(0, mod)) : '');
            for (i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod == 0) && (i == 0))
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                else

            // hier wird das Trennzeichen festgelegt mit '.'
                    output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
            console.log(output);
            return (output);

        }
        else return number;
    }



    fetchPrices(){
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
            .then(response => response.json())
            .then(price => {
                this.setState({
                    usd: price.USD,
                    eur: price.EUR,
                    btc: price.BTC,
                });

            });
    }
    fetchSupply(){
        fetch('https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=2YPV5DF98A5PXVZCMNMDAPYVAB4JZFIKVP')
            .then(response => response.json())
            .then(supply => {
                this.setState({
                    supply: supply.result
                });
                console.log('state sup: '+this.state.supply);
            });

    }

    componentDidMount() {
        // Seitentitel:
        document.title = "Ether price";
        this.fetchPrices();
        this.fetchSupply();
        // Alle 10 sekunden neu fetchen und Preise aktualisieren
        this.timer = setInterval(()=> this.fetchPrices(), 10000)

    }

    handleButtonRefresh(){
        this.fetchPrices();
        console.log('state usd: '+this.state.usd);
    }



    render() {
        const {usd, eur, btc} = this.state;
        let supplyInEther = this.sliceNumbers((Math.floor(this.state.supply/1000000000000000000)));
        const styles = {
                    card: {
                            maxWidth: 770,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginBottom: 50,
                        },
                    div: {
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    },
                    media: {
                        height: 0,
                        paddingTop: '40%', // 16:9
                    },
                    divider: {
                        marginRight: 24,
                        marginLeft: 24,
                        marginTop: 25
                    },
                    button: {
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }
            };
        return (
            <div style={styles.div} >
                <Card style={styles.card}>
                    <CardMedia
                        style={styles.media}
                        image="https://i.imgur.com/xBssBT5.png"
                        title="Ethereum"
                    />
                        <Divider  style={styles.divider}/>
                    <CardContent>
                        <div>
                <Typography variant="display3" component="h3">
                    Current Ether price:
                </Typography>
                        <div>
                        <Typography variant="display2" component="h2">
                             {usd}{'$ '}
                            {eur}{'€ '}
                            {btc}{'฿ '}
                        </Typography>

                        <Divider style={styles.divider}/>
                            <div style={{marginTop: 24}}>
                            <Typography variant="display1" >
                                Current Supply: {supplyInEther}ETH
                            </Typography>
                            </div>
                            <CardActions style={styles.button}>

                            </CardActions>
                            <Typography variant="caption" paragraph>
                                Values are refreshed every 10 seconds
                            </Typography>
                        </div>


                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(EtherCard);