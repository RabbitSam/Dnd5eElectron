import React from 'react';

import { Grid, Select, TextField, MenuItem, Divider, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import VerticalNumberComponent from '../components/VerticalNumberComponent';


const useStyles = makeStyles({
    container: {
        maxHeight: 756,
    }
});


function reducer(state) {
    return {saves: state.saves}
}


function SaveBlock(props) {

    const classes = useStyles();

    const [state, dispatch] = React.useReducer(reducer, {saves: props.saves});

    const profOnChange = (e) => {
        props.profOnChange(e.target.value);
        dispatch();
    };

    const saveProfOnChange = (e, save) => {
        props.saveProfOnChange(save, e.target.value);
        dispatch();
    };

    const saveOverrideOnChange = (save, value) => {
        props.saveOverrideOnChange(save, value);
        dispatch();
    };

    const calculateStats = (statname, proficiency) => {
        let value = Math.floor((props.stats[statname] - 10)/2) + state.saves[statname].override;
        let proficiencyBonus = parseInt(props.proficiencyBonus) ? parseInt(props.proficiencyBonus) : 0
        switch (proficiency) {
            case "Half":
                value += Math.floor((proficiencyBonus)/2);
                break;

            case "Normal":
                value += proficiencyBonus;
                break;

            case "Double":
                value += (proficiencyBonus * 2);
                break;

            default:
                break;
        }

        const sign = value < 0 ? "" : "+"

        return sign + value;
    }

    const statOrder = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    const proficiencies = ["None", "Half", "Normal", "Double"];

    return (
        <Grid container component={Paper}>
            <Grid item xs={12}>
                <TextField
                    key="Proficiency Bonus"
                    label="Proficiency Bonus"
                    value={props.proficiencyBonus}
                    variant="outlined"
                    inputProps={{style: {textAlign: "center"}}}
                    onChange={profOnChange}
                    fullWidth={true}
                    type="number"
                />
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Proficiency</TableCell>
                                <TableCell align="center">Save</TableCell>
                                <TableCell align="center">Modifier</TableCell>
                                <TableCell align="center">Override</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {statOrder.map((item) => (
                                <TableRow key={item}>
                                    <TableCell>
                                        <Select
                                            key={item + "prof"}
                                            value={state.saves[item].proficiency}
                                            fullWidth={true}
                                            variant="outlined"
                                            onChange={(e) => saveProfOnChange(e, item)}
                                        >
                                            {proficiencies.map((prof) => (
                                                <MenuItem key={prof} value={prof}>{prof}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell align="center">{item}</TableCell>
                                    <TableCell align="center">
                                        {calculateStats(item, state.saves[item].proficiency)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <VerticalNumberComponent 
                                            count={state.saves[item].override}
                                            onChange={(value) => saveOverrideOnChange(item, value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default SaveBlock;