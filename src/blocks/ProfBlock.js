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
    return {skills: state.skills};
}


function ProfBlock(props) {

    const classes = useStyles();
    const [state, dispatch] = React.useReducer(reducer, {skills: props.skills});

    const profOnChange = (e) => {
        props.profOnChange(e.target.value);
    }

    const skillStatOnChange = (e, skill) => {
        props.skillStatOnChange(skill, e.target.value)
        dispatch();
    }

    const skillProfOnChange = (e, skill) => {
        props.skillProfOnChange(skill, e.target.value)
        dispatch();
    }

    const skillOverrideOnChange = (skill, value) => {
        props.skillOverrideOnChange(skill, value);
        dispatch();
    }

    const calculateStats = (skill, statname, proficiency) => {
        let value = Math.floor((props.stats[statname] - 10)/2) + state.skills[skill].override;
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

    const skillOrder = ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight",
        "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion",
        "Sleight of Hand", "Stealth", "Survival"];

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
                                <TableCell align="center">Stat</TableCell>
                                <TableCell align="center">Proficiency</TableCell>
                                <TableCell align="center">Skill</TableCell>
                                <TableCell align="center">Modifier</TableCell>
                                <TableCell align="center">Override</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {skillOrder.map((item) => (
                                <TableRow key={item}>
                                    <TableCell>
                                        <Select
                                            key={item + "stat"}
                                            value={state.skills[item].statname}
                                            fullWidth={true}
                                            variant="outlined"
                                            onChange={(e) => skillStatOnChange(e, item)}
                                        >
                                            {statOrder.map((statname) => (
                                                <MenuItem key={statname} value={statname}>{statname}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            key={item + "prof"}
                                            value={state.skills[item].proficiency}
                                            fullWidth={true}
                                            variant="outlined"
                                            onChange={(e) => skillProfOnChange(e, item)}
                                        >
                                            {proficiencies.map((prof) => (
                                                <MenuItem key={prof} value={prof}>{prof}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell align="center">{item}</TableCell>
                                    <TableCell align="center">
                                        {calculateStats(item, props.skills[item].statname, props.skills[item].proficiency)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <VerticalNumberComponent 
                                            count={state.skills[item].override}
                                            onChange={(value) => skillOverrideOnChange(item, value)}
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

export default ProfBlock;