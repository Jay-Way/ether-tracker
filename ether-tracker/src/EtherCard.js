import React, { Component } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#82b1ff',
            green: '#43a047',
            red: '#e53935',
        },
        secondary: {
            main: '#212121',
        }
    }
});


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
            change: [],
            change1h: '',
            change24h: '',
            change7d: '',
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
    // Kein bind nötig:
    fetchPriceChanges() {
        fetch('https://api.coinmarketcap.com/v2/ticker/1027/')
            .then(response => response.json())
            .then(change => {
                    this.setState({
                        change1h:  change.data.quotes.USD.percent_change_1h,
                        change24h: change.data.quotes.USD.percent_change_24h,
                        change7d:  change.data.quotes.USD.percent_change_7d,
                    });

                });
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
    colorChanges(){
        if (this.state.change1h < 0) {
            let change1hColored = (this.state.change1h.style.color = "green");

        }
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
        this.fetchPriceChanges();
        // Alle 10 sekunden neu fetchen und Preise aktualisieren
        this.timer = setInterval(()=> this.fetchPrices(), 10000)

    }

    handleButtonRefresh(){
        this.fetchPrices();
        console.log('state usd: '+this.state.usd);
    }



    render() {
        const {usd, eur, btc, change1h} = this.state;
        // Ether Supply in Wei umrechnen auf ganze Ether, dann abrunden und mit 1000er Trennzeichen aufteilen
        let supplyInEther = this.sliceNumbers((Math.floor(this.state.supply/1000000000000000000)));
        const primaryColorGreen = theme.palette.primary.green;
        const primaryColorRed = theme.palette.primary.red;
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
                    },
                    changePlus: {
                        color: primaryColorGreen
                    },
                    changeMinus: {
                        color: primaryColorRed
                    },
                    changeText: {
                        display: 'inline-block',
                        margin: 25
                    }
            };
        return (
            <MuiThemeProvider theme={theme}>
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
                        <Typography variant="display2" component="h2" color="secondary">
                            {usd}{'$  '}
                            {eur}{'€  '}
                            {btc}{'฿  '}
                        </Typography>
                        <Divider style={styles.divider}/>
                            <div style={{marginTop: 24}}>
                            <Typography variant="display1" >
                                Current Supply: {supplyInEther} ETH
                            </Typography>
                            </div>
                            <Divider style={styles.divider}/>
                            <div style={{marginTop: 24}}>
                                <Typography variant="headline" style={styles.changeText}>
                                    1h change: {
                                    this.state.change1h < 0 ? (
                                        <Typography style={styles.changeMinus} variant="headline">
                                            {this.state.change1h}
                                        </Typography>
                                    ) : (
                                        <Typography style={styles.changePlus} variant="headline">
                                            {this.state.change1h}
                                        </Typography>
                                    )


                                }
                                </Typography>
                                <Typography variant="headline" style={styles.changeText}>
                                    24h change: {
                                    this.state.change24h < 0 ? (
                                        <Typography style={styles.changeMinus} variant="headline">
                                            {this.state.change24h}
                                        </Typography>
                                    ) : (
                                        <Typography style={styles.changePlus} variant="headline">
                                            {this.state.change24h}
                                        </Typography>
                                    )


                                }
                                </Typography>
                                <Typography variant="headline" style={styles.changeText}>
                                    7d change: {
                                    this.state.change7d < 0 ? (
                                        <Typography style={styles.changeMinus} variant="headline">
                                            {this.state.change7d}
                                        </Typography>
                                    ) : (
                                        <Typography style={styles.changePlus} variant="headline">
                                            {this.state.change7d}
                                        </Typography>
                                    )


                                }
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
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(EtherCard);