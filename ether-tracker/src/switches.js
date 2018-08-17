import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
    state = {
        checkedA: true,
        checkedB: true,
    };

    handleChange () {
        this.props.changeUsd();
    };


    render() {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.showUsd}
                            onChange={this.props.changeUsd}
                            value="showUsd"
                            color="primary"
                        />
                    }
                    label="Show USD price"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.showEur}
                            onChange={this.props.changeEur}
                            value="showEur"
                            color="primary"
                        />
                    }
                    label="Show EUR price"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.showBtc}
                            onChange={this.props.changeBtc}
                            value="showBtc"
                            color="primary"
                        />
                    }
                    label="Show BTC price"
                />

            </FormGroup>
        );
    }
}

export default SwitchLabels;
