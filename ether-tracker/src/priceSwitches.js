import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function priceSwitches(props) {

        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.showUsd}
                            onChange={props.changeUsd}
                            value="showUsd"
                            color="primary"
                        />
                    }
                    label="Show USD price"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.showEur}
                            onChange={props.changeEur}
                            value="showEur"
                            color="primary"
                        />
                    }
                    label="Show EUR price"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.showBtc}
                            onChange={props.changeBtc}
                            value="showBtc"
                            color="primary"
                        />
                    }
                    label="Show BTC price"
                />

            </FormGroup>
        );
}

export default priceSwitches;
