import React from 'react';
import { Select, MenuItem, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NumberComponent from '../components/NumberComponent';


function reducer(state) {
    return {spelldcblock: state.spelldcblock};
}


function SpellDCBlock(props) {

    const statOrder = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

    const [state, dispatch] = React.useReducer(reducer, {spelldcblock: props.spelldcblock});

    const calculateSpellSaveDC = () => {
        const proficiencyBonus = parseInt(props.proficiencyBonus);
        const statname = props.spelldcblock.statname;
        const value = 8 + Math.floor((props.stats[statname] - 10)/2)
            + props.spelldcblock.override.spellsavedc 
            + proficiencyBonus;

        return value ? value : 0;
    };

    const calculateSpellAttack = () => {
        const proficiencyBonus = parseInt(props.proficiencyBonus);
        const statname = props.spelldcblock.statname;
        const value = Math.floor((props.stats[statname] - 10)/2) 
            + props.spelldcblock.override.spellattack 
            + proficiencyBonus;
        const sign = value < 0 ? "" : "+";

        return value ? sign + value : "+0";
    };

    const spellAbilityOnChange = (e) => {
        props.spellAbilityOnChange(e.target.value);
        dispatch();
    }

    const overrideOnChange = (value, item) => {
        props.overrideOnChange(value, item);
        dispatch();
    }

    return (
        <TableContainer component={Paper} style={{marginTop: -4}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Spell Casting Ability</TableCell>
                        <TableCell align="center">Spell Save DC</TableCell>
                        <TableCell align="center">Spell Attack Bonus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Select
                                key={"spelldcblockstat"}
                                value={state.spelldcblock.statname}
                                fullWidth={true}
                                variant="outlined"
                                onChange={(e) => spellAbilityOnChange(e)}
                            >
                                {statOrder.map((statname) => (
                                    <MenuItem key={statname} value={statname}>{statname}</MenuItem>
                                ))}
                            </Select>
                        </TableCell>
                        <TableCell align="center">{calculateSpellSaveDC()}</TableCell>
                        <TableCell align="center">{calculateSpellAttack()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">Override</TableCell>
                        <TableCell align="center">
                            <NumberComponent
                                count={state.spelldcblock.override.spellsavedc}
                                onChange={(value) => overrideOnChange(value, "spellsavedc")}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <NumberComponent
                                count={state.spelldcblock.override.spellattack}
                                onChange={(value) => overrideOnChange(value, "spellattack")}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SpellDCBlock;