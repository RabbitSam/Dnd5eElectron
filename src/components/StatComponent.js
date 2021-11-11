import { Grid, TextField } from '@material-ui/core';
import React from 'react';

function StatComponent(props) {

    const calculateModifier = () => {
        let modifier = Math.floor((props.statvalue-10)/2);
        let sign = modifier < 0 ? "" : "+";
        return sign + modifier;
    }

    const onChange = (e) => {
        props.onChange(props.statname, e.target.value);
    }

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        key={props.statname}
                        label={props.statname}
                        value={props.statvalue}
                        onChange={onChange}
                        variant="outlined"
                        inputProps={{style: {textAlign: "center"}}}
                    />
                </Grid>
                <Grid item xs={12}>
                    {calculateModifier()}
                </Grid>
            </Grid>
        </div>
    );
}

export default React.memo(StatComponent);