import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Paper, TextField, FormControl, Divider,
    Drawer, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import DisplayTextField from '../components/DisplayTextField';

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxHeight: 495,
        height: 495,
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


function SpellBlock(props) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(reducer, {spellblock: props.spellblock});
    const order = ["Cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

    const [openState, openDispatch] = React.useReducer(openReducer, {openVars: openVars});

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [spellOpen, setSpellOpen] = React.useState(false);
    const [school, setSchool] = React.useState("Abjuration");
    const [level, setLevel] = React.useState("Cantrip");
    const [prevLevel, setPrevLevel] = React.useState("Cantrip");
    const [name, setName] = React.useState("");
    const [castingTime, setCastingTime] = React.useState("");
    const [range, setRange] = React.useState("");
    const [components, setComponents] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [type, setType] = React.useState("");
    const [indx, setIndx] = React.useState(0);

    const handleDialogOpen = (type) => {
        setType(type);
        setSchool("Abjuration");
        setLevel("Cantrip");
        setName("");
        setCastingTime("");
        setRange("");
        setComponents("");
        setDuration("");
        setDesc("");
        setDialogOpen(true);
    };

    const openSpellEditDialog = (type, indx, spell) => {
        setType(type);
        setIndx(indx);
        setSchool(spell.school);
        setLevel(spell.level);
        setPrevLevel(spell.level);
        setName(spell.name);
        setCastingTime(spell.castingTime);
        setRange(spell.range);
        setComponents(spell.components);
        setDuration(spell.duration);
        setDesc(spell.desc);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        if (type === "Add") {
            props.onSpellAdd(level, school, name, castingTime, range, components, duration, desc, null);
        } else if (type === "Edit") {
            props.onSpellEdit(level, indx, school, name, castingTime, range, components, duration, desc, prevLevel);
        }

        dispatch();
        setDialogOpen(false);
    };

    const handleDialogCancel = () => {
        dispatch();
        setDialogOpen(false);
    };

    const onSpellRemove = (spell, indx) => {
        props.onSpellRemove(spell, indx, false);
        dispatch();
    };

    const showSpellDetails = (spell) => {
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

    return (
        <Grid container component={Paper}>
            <SpellDialog
                open={dialogOpen}
                onCancel={handleDialogCancel}
                onClose={handleDialogClose}
                school={school} level={level} name={name} castingTime={castingTime}
                range={range} components={components} duration={duration} desc={desc}
                schoolOnChange={(e) => setSchool(e.target.value)} levelOnChange={(e) => setLevel(e.target.value)}
                nameOnChange={(e) => setName(e.target.value)} castingTimeOnChange={(e) => setCastingTime(e.target.value)}
                rangeOnChange={(e) => setRange(e.target.value)} componentsOnChange={(e) => setComponents(e.target.value)}
                durationOnChange={(e) => setDuration(e.target.value)} descOnChange={(e) => setDesc(e.target.value)}
                type={type}
            />
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
            <Grid item xs={12}>
                <List
                    className={classes.root}
                >
                    {order.map((level, indx) => (
                        <React.Fragment key={level}>
                            <ListItem button onClick={() => openLevel(level, !openState.openVars[level])}>
                                {openState.openVars[level] ? <ExpandLess/> : <ExpandMore/>}
                                <ListItemText secondary={
                                    <Typography style={{fontSize}}>{level}</Typography>
                                }/>
                            </ListItem>
                            <Collapse timeout="auto" unmountOnExit in={openState.openVars[level]}>
                                <Divider fullWidth/>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" style={{width: "20%", fontSize}}>Spell Name</TableCell>
                                                <TableCell align="left" style={{width: "20%", fontSize}}>Casting Time</TableCell>
                                                <TableCell align="left" style={{width: "15%", fontSize}}>Range</TableCell>
                                                <TableCell align="left" style={{width: "15%", fontSize}}>Duration</TableCell>
                                                <TableCell align="left" style={{width: "15%", fontSize}}>Components</TableCell>
                                                <TableCell align="right" style={{width: "15%", fontSize}}> </TableCell> 
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {state.spellblock[level].map((spell, spellIndx) => (
                                                <TableRow key={spell.name} 
                                                    hover
                                                    className={classes.clickable}
                                                    onDoubleClick={() => showSpellDetails(spell)}
                                                >
                                                    <TableCell style={{fontSize, wordWrap: "break-word"}}>{spell.name}</TableCell>
                                                    <TableCell align="left" style={{fontSize}}>{spell.castingTime}</TableCell>
                                                    <TableCell align="left"style={{fontSize}}>{spell.range}</TableCell>
                                                    <TableCell align="left"style={{fontSize}}>{spell.duration}</TableCell>
                                                    <TableCell align="left"style={{fontSize}}>
                                                        {spell.components.length > 11 ? spell.components.substring(0, 11) + "..." : spell.components}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton edge="end" size="small"
                                                            onClick={() => openSpellEditDialog("Edit", spellIndx, spell)}
                                                        >
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton edge="end" size="small" onClick={() => onSpellRemove(spell, spellIndx)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
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
            <Grid item xs={12}>
                <Button 
                    variant="contained"
                    disableElevation
                    fullWidth={true}
                    onClick={() => handleDialogOpen("Add")}
                >
                    Add Spell
                </Button>
            </Grid>
        </Grid>
    );
}

function SpellDialog(props) {

    const onCancel = () => {
        props.onCancel();
    }

    const schools = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Transmutation", "Necromancy"]
    const levels = ["Cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

    return (
        <Dialog open={props.open} onClose={onCancel} fullWidth maxWidth={"sm"} >
            <DialogTitle>{props.type} Equipment</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel id="dialog-select-spell-level-label">Spell Level</InputLabel>
                            <Select
                                labelId="dialog-select-spell-level-label"
                                fullWidth={true}
                                onChange={props.levelOnChange}
                                value={props.level}
                                label="Spell Level"
                            >
                                {levels.map((level) => (
                                    <MenuItem key={level} value={level}>{level}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Spell Name"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.nameOnChange}
                            value={props.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel id="dialog-select-school-label">School</InputLabel>
                            <Select
                                labelId="dialog-select-school-label"
                                fullWidth={true}
                                onChange={props.schoolOnChange}
                                value={props.school}
                                label="School"
                            >
                                {schools.map((school) => (
                                    <MenuItem key={school} value={school}>{school}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Casting Time"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.castingTimeOnChange}
                            value={props.castingTime}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Range"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.rangeOnChange}
                            value={props.range}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Duration"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.durationOnChange}
                            value={props.duration}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Components"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.componentsOnChange}
                            value={props.components}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Spell Description"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.descOnChange}
                            value={props.desc}
                            multiline
                            rows={14}
                            inputProps={{style: {
                                fontSize: "9pt"
                            }}}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.onClose} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SpellBlock;