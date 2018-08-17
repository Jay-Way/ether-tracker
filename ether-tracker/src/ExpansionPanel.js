import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Charts from './chart';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        width: 500,
        justifyContent: 'center',
        alignSelf: 'center',
    },

});

function SimpleExpansionPanel(props) {
    const { classes } = props;
    const styles = {
        div: {
            justifyContent: 'center',
            flexDirection: 'column',
        },
        details: {
            justifyContent: 'center',
            alignSelf: 'center',
        },
    };
    return (
        <div className={classes.root}>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Charts</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={styles.details}>
                    <div>
                    <Charts style={styles.details}/>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Portfolio</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={styles.details}>
                    <div>
                        Test
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
