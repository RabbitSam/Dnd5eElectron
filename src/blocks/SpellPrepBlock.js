import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, IconButton, Paper, Drawer, Typography, Checkbox, Divider, TextField } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import DisplayTextField from '../components/DisplayTextField';

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxHeight: 400,
        height: 400,
        overflowY: "auto",
        overflowX: "hidden"
    },
    nested: {
        marginLeft: 40
    },
    clickable: {
        "&:hover": {
            cursor: "pointer",
            "-webkit-user-select": "none",
            "-moz-user-select": "none", 
            "-ms-user-select": "none",
            "user-select": "none"

        }
    },
    listRoot: {
        width: "100%",
        maxHeight: 365,
        height: 365,
        overflowY: "auto",
        overflowX: "hidden"
    }
});

const openVars = {
    "Cantrip": false,
    "1st": false,
    "2nd": false,
    "3rd": false,
    "4th": false,
    "5th": false,
    "6th": false,
    "7th": false,
    "8th": false,
    "9th": false
};

function reducer(state) {
    return {spellblock: state.spellblock};
}


function openReducer(state) {
    return {openVars: state.openVars};
}

function SpellPrepBlock(props) {
    const classes = useStyles();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

    const [state, dispatch] = React.useReducer(reducer, {spellblock: props.spellblock});
    const order = ["Cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
    const listOrder1stRow = ["Cantrip", "2nd", "4th", "6th", "8th"];
    const listOrder2ndRow = ["1st", "3rd", "5th", "7th", "9th"];

    const [openState, openDispatch] = React.useReducer(openReducer, {openVars: openVars});

    const [spellOpen, setSpellOpen] = React.useState(false);
    const [school, setSchool] = React.useState("Abjuration");
    const [level, setLevel] = React.useState("Cantrip");
    const [name, setName] = React.useState("");
    const [castingTime, setCastingTime] = React.useState("");
    const [range, setRange] = React.useState("");
    const [components, setComponents] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [desc, setDesc] = React.useState("");

    const [unpreppedSelected, setUnpreppedSelected] = React.useState(-1);
    const [uLevel, setULevel] = React.useState("");
    const [preppedSelected, setPreppedSelected] = React.useState(-1);
    const [pLevel, setPLevel] = React.useState("");

    const showSpellDetails = (level, spellIndx) => {
        const spell = state.spellblock[level][spellIndx];
        setSchool(spell.school);
        setLevel(spell.level);
        setName(spell.name);
        setCastingTime(spell.castingTime);
        setRange(spell.range);
        setComponents(spell.components);
        setDuration(spell.duration);
        setDesc(spell.desc);
        setSpellOpen(true);
    };

    const openLevel = (level, open) => {
        openVars[level] = open;
        openDispatch();
    };

    const fontSize = "9pt";

    const selectSpell = (e, type, level, indx) => {
        if (e.target.checked) {
            if (type === "prepped") {
                setPreppedSelected(indx);
                setPLevel(level);
            } else {
                setUnpreppedSelected(indx);
                setULevel(level);
            }
        } else {
            if (type === "prepped") {
                setPreppedSelected(-1);
                setPLevel("");
            } else {
                setUnpreppedSelected(-1);
                setULevel("");
            }
        }
    };

    const prepareSpell = () => {
        if (unpreppedSelected >= 0 && order.includes(uLevel)) {
            props.prepareSpell(uLevel, unpreppedSelected);
            dispatch();
            setUnpreppedSelected(-1);
            setULevel("");
        }
    };

    const unprepareSpell = () => {
        if (preppedSelected >= 0 && order.includes(pLevel)) {
            props.unprepareSpell(pLevel, preppedSelected);
            dispatch();
            setPreppedSelected(-1);
            setPLevel("");
        }
    };

    const slotsOnChange = (level, item, value) => {
        props.slotsOnChange(level, item, value);
    };

    return (
        <React.Fragment>
            <Drawer anchor={"right"} open={spellOpen} onClose={() => setSpellOpen(false)}>
                <TableContainer component={Paper} style={{width: 500, height: "100%"}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow><TableCell align="center">{name}</TableCell></TableRow>
                            <TableRow><TableCell align="center"><em>School of {school}</em></TableCell></TableRow>
                            <TableRow>
                                <TableCell>
                                    <Grid container spacing={1}>
                                        <Grid item xs={3}><strong>Spell Level:</strong></Grid>
                                        <Grid item xs={9}>{level}</Grid>
                                        <Grid item xs={3}><strong>Casting Time:</strong></Grid>
                                        <Grid item xs={9}>{castingTime}</Grid>
                                        <Grid item xs={3}><strong>Range:</strong></Grid>
                                        <Grid item xs={9}>{range}</Grid>
                                        <Grid item xs={3}><strong>Components:</strong></Grid>
                                        <Grid item xs={9}>{components}</Grid>
                                        <Grid item xs={3}><strong>Duration:</strong></Grid>
                                        <Grid item xs={9}>{duration}</Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <DisplayTextField 
                                        disabled
                                        value={desc}
                                        fullWidth={true}
                                        multiline
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Drawer>

            {order.map((spellLevel) => (
                <Grid item xs={6} md={3} key={spellLevel}>
                    <TableContainer component={Paper} className={classes.root}>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{width: "70%", fontSize}} colSpan={2}>{spellLevel}</TableCell>
                                </TableRow>
                                {spellLevel !== "Cantrip" &&
                                    <React.Fragment>
                                        <TableRow>
                                            <TableCell align="center" style={{width: "50%", fontSize}}>Slots Total</TableCell>
                                            <TableCell align="center" style={{width: "50%", fontSize}}>Slots Expended</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center" style={{width: "50%"}}>
                                                <TextField
                                                    value={props.spellprepblock[spellLevel].slots_total}
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{style: {textAlign: "center", fontSize}}}
                                                    onChange={(e) => slotsOnChange(spellLevel, "slots_total", e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center" style={{width: "50%"}}>
                                                <TextField
                                                    value={props.spellprepblock[spellLevel].slots_expended}
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{style: {textAlign: "center", fontSize}}}
                                                    onChange={(e) => slotsOnChange(spellLevel, "slots_expended", e.target.value)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                }
                            </TableHead>
                            <TableBody>
                                {props.spellprepblock[spellLevel].spells.map((spell, spellIndx) => (
                                    <TableRow key={spell.name + spell.indx} 
                                        hover
                                        className={classes.clickable}
                                        onDoubleClick={() => showSpellDetails(spellLevel, spellIndx)}
                                    >
                                        <TableCell style={{fontSize, wordWrap: "break-word"}}>{spell.name}</TableCell>
                                        <TableCell align="right">
                                            <Checkbox 
                                                color="primary" 
                                                checked={spellLevel === pLevel && spellIndx === preppedSelected}
                                                onChange={(e) => selectSpell(e, "prepped", spellLevel, spellIndx)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ))}

            <Grid item xs={6} md={3}>
                <Grid item xs={12}>
                    <IconButton component={Paper} onClick={() => prepareSpell()}>
                        <KeyboardArrowLeft/>
                    </IconButton>
                </Grid>
                <Grid item xs={12} style={{marginTop: 30}}>
                    <IconButton component={Paper} size="large" onClick={() => unprepareSpell()}>
                        <KeyboardArrowRight/>
                    </IconButton>
                </Grid>
            </Grid>

            <Grid item xs={6} md={3}>
                <Grid item xs={12}><Typography style={{fontSize}}>Unprepared Spells</Typography></Grid>
                <Grid item xs={12}>
                    <List
                        className={classes.listRoot}
                        component={Paper}
                    >
                        {order.map((spellLevel, indx) => (
                            <React.Fragment key={spellLevel}>
                                <ListItem button onClick={() => openLevel(spellLevel, !openState.openVars[spellLevel])}>
                                    {openState.openVars[spellLevel] ? <ExpandLess/> : <ExpandMore/>}
                                    <ListItemText secondary={
                                        <Typography style={{fontSize}}>{spellLevel}</Typography>
                                    }/>
                                </ListItem>
                                <Collapse timeout="auto" unmountOnExit in={openState.openVars[spellLevel]}>
                                    <Divider fullWidth/>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableBody>
                                                {props.spellprepblock.unprepared[spellLevel].map((spell, spellIndx) => (
                                                    <TableRow key={spell.name + spell.indx} 
                                                        hover
                                                        className={classes.clickable}
                                                        onDoubleClick={() => showSpellDetails(spellLevel, spellIndx)}
                                                    >
                                                        <TableCell style={{fontSize, wordWrap: "break-word"}}>{spell.name}</TableCell>
                                                        <TableCell align="right">
                                                            <Checkbox 
                                                                color={"primary"}
                                                                checked={spellLevel === uLevel && spellIndx === unpreppedSelected}
                                                                onChange={(e) => selectSpell(e, "unprepped", spellLevel, spellIndx)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Collapse>
                            </React.Fragment>
                        ))}

                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SpellPrepBlock;