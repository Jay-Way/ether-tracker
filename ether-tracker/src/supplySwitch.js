import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function priceSwitches(props) {

    return (
        <div >
        <FormGroup row
        >
            <FormControlLabel

                control={
                    <Switch
                        checked={props.showSupply}
                        onChange={props.changeSupply}
                        value="showUsd"
                        color="primary"
                    />
                }
                label="Show supply"
            />
        </FormGroup>
        </div>
    );
}

export default priceSwitches;
