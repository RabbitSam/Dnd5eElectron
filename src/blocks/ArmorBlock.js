import React from 'react';
import { Divider, Grid, Paper, TextField, Checkbox } from '@material-ui/core';


function reducer(state) {
    let armorblock = state.armorblock;
    return {armorblock: armorblock};
}

function ArmorBlock(props) {

    const [state, dispatch] = React.useReducer(reducer, {armorblock: props.armorblock});

    const onChange = (e, category, subcategory) => {
        props.onChange(e.target.value, category, subcategory);
        dispatch();
    };

    const style = {style: {textAlign: "center"}};

    return (
        <Grid 
            container 
            component={Paper}
            spacing={1}
            justifyContent="center"
        >
            <Grid container item xs={12} spacing={1}>
                {/* AC, Initiative, Speed */}
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        key="Armor Class"
                        label="Armor Class"
                        value={state.armorblock["Armor Class"]}
                        onChange={(e) => onChange(e, "Armor Class", null)}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        key="Initiative"
                        label="Initiative"
                        value={props.armorblock["Initiative"]}
                        onChange={(e) => onChange(e, "Initiative", null)}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        key="Speed"
                        label="Speed"
                        value={props.armorblock["Speed"]}
                        onChange={(e) => onChange(e, "Speed", null)}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={6} spacing={1}>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                <Grid item xs={12} style={{fontSize: "10pt" , "margin": "-4.25px 0 -4.25px 0"}}>
                    Hit Points
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                {/* Hit Points */}
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Maximum"
                        key="Maximum"
                        value={props.armorblock["Hit Points"]["Maximum"]}
                        onChange={(e) => onChange(e, "Hit Points", "Maximum")}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        variant="outlined"
                        label="Current"
                        key="Current"
                        value={props.armorblock["Hit Points"]["Current"]}
                        onChange={(e) => onChange(e, "Hit Points", "Current")}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        variant="outlined"
                        label="Temporary"
                        key="Temporary"
                        value={props.armorblock["Hit Points"]["Temporary"]}
                        onChange={(e) => onChange(e, "Hit Points", "Temporary")}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={6} spacing={1}>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                <Grid item xs={12} style={{fontSize: "10pt" , "margin": "-4.25px 0 -4.25px 0"}}>
                    Hit Dice
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                {/* Hit Dice */}
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Dice"
                        key="Dice"
                        value={props.armorblock["Hit Dice"]["Dice"]}
                        onChange={(e) => onChange(e, "Hit Dice", "Dice")}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        variant="outlined"
                        label="Total"
                        key="Total"
                        value={props.armorblock["Hit Dice"]["Total"]}
                        onChange={(e) => onChange(e, "Hit Dice", "Total")}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        variant="outlined"
                        label="Remaining"
                        key="Remaining"
                        value={props.armorblock["Hit Dice"]["Remaining"]}
                        onChange={(e) => onChange(e, "Hit Dice", "Remaining")}
                        size="small"
                        inputProps={style}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                <Grid item xs={12} style={{fontSize: "10pt" , "margin": "-4.25px 0 -4.25px 0"}}>
                    Death Saves
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>
            </Grid>
            <Grid container item xs={6} spacing={1}>
                <Grid item xs={12} style={{fontSize: "10pt" , "margin": "-4.25px 0 -4.25px 0"}}>
                    Successes
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                {/* Successes */}
                <Grid item xs={12}>
                    <Checkbox color="primary"/>
                    <Checkbox color="primary"/>
                    <Checkbox color="primary"/>
                </Grid>
            </Grid>
            <Grid container item xs={6} spacing={1}>
                <Grid item xs={12} style={{fontSize: "10pt" , "margin": "-4.25px 0 -4.25px 0"}}>
                    Failures
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                {/* Failures */}
                <Grid item xs={12}>
                    <Checkbox/>
                    <Checkbox/>
                    <Checkbox/>
                </Grid>
            </Grid>
        </Grid>
    );
}

function areEqual(prevProps, nextProps) {
    const pArmorblock = prevProps.armorblock;
    const nArmorblock = nextProps.armorblock;

    for (const pKey in pArmorblock) {
        if (pKey in ["Hit Points", "Hit Dice"]) {
            for (const hkey in pArmorblock[pKey]) {
                if (pArmorblock[pKey][hkey] !== nArmorblock[pKey][hkey]) return true;
            }

        } else if (pArmorblock[pKey] !== nArmorblock[pKey]) {
            return true;
        }
    }

    return false;
}

export default React.memo(ArmorBlock, areEqual);