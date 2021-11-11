import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import StatComponent from '../components/StatComponent';

function StatBlock(props) {

    const onChange = (statname, statvalue) => {
        props.onChange(statname, statvalue);
    }

    let statOrder = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];    
    
    return (
        <Grid container alignItems="center" direction="row" component={Paper}>
            {statOrder.map((item) => (
                <React.Fragment key={item}>
                    <Grid item xs={2} style={{marginTop: "10px", paddingLeft: 5, paddingRight: 5}}>
                        <StatComponent
                            statname={item}
                            statvalue={props.stats[item]}
                            onChange={onChange}
                        />
                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    );
}

function areEqual(prevProps, nextProps) {
    const pStats = prevProps.stats;
    const nStats = nextProps.stats;

    for (const pKey in pStats) {
        if (pStats[pKey] !== nStats[pKey]) return true;
    }

    return false;
}



export default React.memo(StatBlock, areEqual);