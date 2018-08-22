import React, { Component } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PriceSwitches from './priceSwitches';
import SupplySwitch from './supplySwitch';
import ChangeSwitch from './changeSwitch';


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

        this.handleSwitchUsd = this.handleSwitchUsd.bind(this);
        this.handleSwitchEur = this.handleSwitchEur.bind(this);
        this.handleSwitchBtc = this.handleSwitchBtc.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleSwitchSupply = this.handleSwitchSupply.bind(this);
        this.fetchVolume = this.fetchVolume.bind(this);


        this.state = {
            price: [],
            eur: '',
            showEur: true,
            usd: '',
            showUsd: true,
            btc: '',
            showBtc: true,
            supply: [],
            showSupply: true,
            change: [],
            change1h: '',
            change24h: '',
            change7d: '',
            showChange: true,
            volume: ''
        };
    }

    sliceNumbers(number) {
        // Info: Die '' sind zwei Hochkommas
        number = '' + number;
        if (number.length > 3) {
            let mod = number.length % 3;
            let i;
            let output = (mod > 0 ? (number.substring(0, mod)) : '');
            for (i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod === 0) && (i === 0))
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                else

            // hier wird das Trennzeichen festgelegt mit '.'
                    output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
            return (output);
        }
        else return number;
    }
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
    fetchVolume() {
        fetch('https://api.coinmarketcap.com/v2/ticker/1027/',
            )
            .then(response => response.json())
            .then(volume => {
                this.setState({
                    volume:  volume.data.quotes.USD.volume_24h,
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

    fetchSupply(){
        fetch('https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=2YPV5DF98A5PXVZCMNMDAPYVAB4JZFIKVP')
            .then(response => response.json())
            .then(supply => {
                this.setState({
                    supply: supply.result
                });
                console.log('Supply: '+this.state.supply+' Wei');
            });

    }
    fetchAll(){
        this.fetchPrices();
        this.fetchSupply();
        this.fetchPriceChanges();
        this.fetchVolume();
    }

    componentDidMount() {
        // Seitentitel:
        this.fetchAll();
        document.title = "Ether Tracker";
        // Alle 10 sekunden neu fetchen
        this.timer = setInterval(()=> this.fetchAll(), 10000)

    }

    handleSwitchUsd(){
        this.setState(prevState => ({
            showUsd: !prevState.showUsd
        }));
    }
    handleSwitchEur(){
        this.setState(prevState => ({
            showEur: !prevState.showEur
        }));
    }
    handleSwitchBtc(){
        this.setState(prevState => ({
            showBtc: !prevState.showBtc
        }));
    }
    handleSwitchSupply(){
        this.setState(prevState => ({
            showSupply: !prevState.showSupply
        }));
    }
    handleSwitchChange(){
        this.setState(prevState => ({
            showChange: !prevState.showChange
        }));
    }



    render() {
        const {usd, eur, btc} = this.state;
        // Ether Supply in Wei umrechnen auf ganze Ether, dann abrunden und mit 1000er Trennzeichen aufteilen
        let supplyInEther = this.sliceNumbers((Math.round(this.state.supply/1000000000000000000)));
        let volume = this.sliceNumbers((Math.round(this.state.volume)));
        const primaryColorGreen = theme.palette.primary.green;
        const primaryColorRed = theme.palette.primary.red;
        const styles = {
                    card: {
                        maxWidth: 770,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        },
                    div: {
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    },
                    media: {
                        height: 0,
                        paddingTop: '56.25%', // 16:9
                    },
                    divider: {
                        margin: 14,
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
                        marginLeft: 25,
                        marginTop: 4
                    },
                    details: {
                        justifyContent: 'center',
                        alignSelf: 'center',
                    },
                    volumeText: {
                        marginTop: 24
                    }
            };
        return (
            <MuiThemeProvider theme={theme}>
            <div style={styles.div} >
                <Card style={styles.card}>
                    <CardMedia
                        style={styles.media}
                        image="https://www.ethereum.org/images/logos/ETHEREUM-LOGO_LANDSCAPE_Black.png"
                        title="Ethereum"
                    />

                    <CardContent>
                            {this.state.showUsd || this.state.showEur || this.state.showBtc ? (
                            <div>
                <Typography variant="display2" component="h2" color="secondary">
                    Current Ether price:
                </Typography>
                            </div>
                                ) : ( null )}
                            <div>
                            {this.state.showUsd === true ? (
                                <Typography variant="display3" component="h2" color="secondary" style={{margin: 10}}>{usd}{'$'}</Typography>) : ( null )}
                            {this.state.showEur === true ? (
                                <Typography variant="display3" component="h2" color="secondary" style={{margin: 10}}>{eur}{'€'}</Typography>) : ( null )}
                            {this.state.showBtc === true ? (
                                <Typography variant="display3" component="h2" color="secondary" style={{margin: 10}}>{btc}{'฿'}</Typography>) : ( null )}
                            <div style={{marginTop: 24}}>


                                {this.state.showSupply ? (
                                    <div>
                                    <Typography variant="headline">
                                        Current supply: {supplyInEther} ETH
                                    </Typography>

                                    </div>

                                ) : (null)
                                }
                            </div>
                                {this.state.showChange ? (

                                    <div style={{marginTop: 24}}>

                                        <Typography variant="headline" style={styles.changeText}>
                                            1h change: {
                                            this.state.change1h < 0 ? (
                                                <Typography style={styles.changeMinus} variant="headline">
                                                    {this.state.change1h}%
                                                </Typography>
                                            ) : (
                                                <Typography style={styles.changePlus} variant="headline">
                                                    {this.state.change1h}%
                                                </Typography>
                                            )
                                        }
                                        </Typography>
                                        <Typography variant="headline" style={styles.changeText}>
                                            24h change: {
                                            this.state.change24h < 0 ? (
                                                <Typography style={styles.changeMinus} variant="headline">
                                                    {this.state.change24h}%
                                                </Typography>
                                            ) : (
                                                <Typography style={styles.changePlus} variant="headline">
                                                    {this.state.change24h}%
                                                </Typography>
                                            )
                                        }
                                        </Typography>
                                        <Typography variant="headline" style={styles.changeText}>
                                            7d change: {
                                            this.state.change7d < 0 ? (
                                                <Typography style={styles.changeMinus} variant="headline">
                                                    {this.state.change7d}%
                                                </Typography>
                                            ) : (
                                                <Typography style={styles.changePlus} variant="headline">
                                                    {this.state.change7d}%
                                                </Typography>
                                            )
                                        }
                                        </Typography>
                                        <Typography variant="headline" style={styles.volumeText}>
                                            24h Volume: {volume}$
                                        </Typography>
                                    </div>
                                ) : (null)
                                }
                            <CardActions style={styles.button}>
                            </CardActions>
                        </div>
                    </CardContent>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Options</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={styles.details}>
                            <div style={styles.div}>
                                <PriceSwitches
                                    showUsd={this.state.showUsd}
                                    changeUsd={this.handleSwitchUsd}
                                    showEur={this.state.showEur}
                                    changeEur={this.handleSwitchEur}
                                    showBtc={this.state.showBtc}
                                    changeBtc={this.handleSwitchBtc}
                                />
                                <Divider style={styles.divider}/>
                                <div>
                                <SupplySwitch

                                    showSupply={this.state.showSupply}
                                    changeSupply={this.handleSwitchSupply}
                                />
                                </div>
                                <div>
                                <ChangeSwitch

                                    showChange={this.state.showChange}
                                    changeChange={this.handleSwitchChange}
                                />
                            </div>
                                <Typography variant="caption" style={{marginTop: 20}}>
                                    Values are refreshed every 10 seconds
                                </Typography>
                                <Typography variant="caption">
                                    Data from coinmarketcap, etherscan and cryptocompare.
                                </Typography>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Card>

            </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(EtherCard);