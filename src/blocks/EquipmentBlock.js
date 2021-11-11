import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Paper, TextField, Divider, Drawer, Typography } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
        maxHeight: 407,
        height: 407,
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

const filter = createFilterOptions();

const openVars = {};

function reducer(state) {
    return {equipmentblock: state.equipmentblock};
}


function openReducer(state) {
    return {openVars: state.openVars};
}


function EquipmentBlock(props) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(reducer, {equipmentblock: props.equipmentblock});
    const order = Object.keys(state.equipmentblock.equipment).sort();
    const currencyOrder = ["CP", "SP", "EP", "GP", "PP"];

    order.forEach((item) => {
        if (!(item in openVars)) openVars[item] = false;
    });

    const [openState, openDispatch] = React.useReducer(openReducer, {openVars: openVars});

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [equipmentOpen, setEquipmentOpen] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [prevCategory, setPrevCategory] = React.useState("");
    const [name, setName] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [weight, setWeight] = React.useState(0);
    const [desc, setDesc] = React.useState("");
    const [type, setType] = React.useState("");
    const [indx, setIndx] = React.useState(0);

    const handleDialogOpen = (type) => {
        setType(type);
        setCategory("");
        setName("");
        setQuantity(0);
        setWeight(0);
        setDesc("");
        setDialogOpen(true);
    };

    const openEquipmentEditDialog = (type, category, indx, name, quantity, weight, desc) => {
        setType(type);
        setCategory(category);
        setPrevCategory(category);
        setIndx(indx);
        setName(name);
        setQuantity(quantity);
        setWeight(weight);
        setDesc(desc);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        if (type === "Add") {
            props.onEquipmentAdd(category.title, name, quantity, weight, desc);
            if (!(category in openVars)) openVars[category] = false;
            openDispatch();
        } else if (type === "Edit") {
            if (category !== prevCategory) {
                props.onEquipmentEdit(category.title, indx, name, quantity, weight, desc, prevCategory);
            } else {
                props.onEquipmentEdit(category, indx, name, quantity, weight, desc, prevCategory);
            }
        }

        dispatch();
        setDialogOpen(false);
    };

    const handleDialogCancel = () => {
        dispatch();
        setDialogOpen(false);
    };

    const categoryOnChange = (e, newValue) => {
        if (typeof newValue === 'string') {
            setCategory({
                title: newValue,
            });
        } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setCategory({
                title: newValue.inputValue,
            });
        } else {
            setCategory(newValue);
        }
    };

    const currencyOnChange = (e, currency) => {
        props.currencyOnChange(currency, e.target.value);
        dispatch();
    };

    const attunedOnChange = (e, attuned) => {
        props.attunedOnChange(attuned, e.target.value);
        dispatch();
    };

    const onEquipmentRemove = (item, indx) => {
        props.onEquipmentRemove(item, indx);
        if (indx === null) delete openVars[item];

        openDispatch();
        dispatch();
    };

    const showEquipmentDetails = (category, name, quantity, weight, desc) => {
        setCategory(category);
        setName(name);
        setQuantity(quantity);
        setWeight(weight);
        setDesc(desc);
        setEquipmentOpen(true);
    };

    const openCategory = (category, open) => {
        openVars[category] = open;
        openDispatch();
    };

    const fontSize = "9pt";

    return (
        <Grid container component={Paper}>
            <EquipmentDialog
                open={dialogOpen}
                onCancel={handleDialogCancel}
                onClose={handleDialogClose}
                category={category}
                name={name}
                quantity={quantity}
                weight={weight}
                desc={desc}
                categoryOnChange={categoryOnChange}
                nameOnChange={(e) => setName(e.target.value)}
                quantityOnChange={(e) => setQuantity(e.target.value)}
                weightOnChange={(e) => setWeight(e.target.value)}
                descOnChange={(e) => setDesc(e.target.value)}
                type={type}
                options={order}
            />
            <Drawer anchor={"right"} open={equipmentOpen} onClose={() => setEquipmentOpen(false)}>
                <TableContainer component={Paper} style={{width: 500, height: "100%"}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow><TableCell align="center">{name}</TableCell></TableRow>
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
            <Grid container item justifyContent="space-around" xs={7} spacing={1}>
                {currencyOrder.map((currency) => (
                    <Grid item xs={currency === "GP" || currency === "PP" ? 6 : 4 } key={currency}>
                        <TextField
                            label={currency}
                            value={state.equipmentblock.currency[currency]}
                            onChange={(e) => currencyOnChange(e, currency)}
                            size="small"
                            variant="outlined"
                            inputProps={{style: {textAlign: "center", fontSize}}}
                        />
                    </Grid>
                ))}
            </Grid>
            <Divider orientation="vertical" flexItem={true} style={{marginRight: 5, marginLeft: 5}}/>
            <Grid container item xs={5} spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        label="Attuned Items"
                        value={state.equipmentblock.attuned["Attuned Items"]}
                        onChange={(e) => attunedOnChange(e, "Attuned Items")}
                        size="small"
                        variant="outlined"
                        fullWidth={true}
                        inputProps={{style: {textAlign: "center", fontSize}}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Maximum Attuned"
                        value={state.equipmentblock.attuned["Maximum Attuned"]}
                        onChange={(e) => attunedOnChange(e, "Maximum Attuned")}
                        size="small"
                        variant="outlined"
                        fullWidth={true}
                        inputProps={{style: {textAlign: "center", fontSize}}}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginTop: 10}}>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <List
                    className={classes.root}
                >
                    {order.map((item, indx) => (
                        <React.Fragment key={item}>
                            <ListItem button onClick={() => openCategory(item, !openState.openVars[item])}>
                                {openState.openVars[item] ? <ExpandLess/> : <ExpandMore/>}
                                <ListItemText secondary={
                                    <Typography style={{fontSize}}>{item}</Typography>
                                }/>
                                {item !== "Weapons" &&
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => onEquipmentRemove(item, null)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                }
                            </ListItem>
                            <Collapse timeout="auto" unmountOnExit in={openState.openVars[item]}>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" style={{width: "25%", fontSize}}>Equipment Name</TableCell>
                                                <TableCell align="right" style={{width: "20%", fontSize}}>Quantity</TableCell>
                                                <TableCell align="right" style={{width: "20%", fontSize}}>Weight Per Unit (lbs.)</TableCell>
                                                <TableCell align="right" style={{width: "20%", fontSize}}>Total Weight (lbs.)</TableCell>
                                                <TableCell align="right" style={{width: "15%", fontSize}}> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {state.equipmentblock.equipment[item].map((eq, eqIndx) => (
                                                <TableRow key={eq.name} 
                                                    hover
                                                    className={classes.clickable}
                                                    onDoubleClick={() => showEquipmentDetails(item, eq.name, eq.quantity, eq.weight, eq.desc)}
                                                >
                                                    <TableCell style={{fontSize, wordWrap: "break-word"}}>{eq.name}</TableCell>
                                                    <TableCell align="right" style={{fontSize}}>{eq.quantity}</TableCell>
                                                    <TableCell align="right" style={{fontSize}}>{eq.weight}</TableCell>
                                                    <TableCell align="right"style={{fontSize}}>{eq.quantity * eq.weight}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton edge="end" size="small"
                                                            onClick={() => openEquipmentEditDialog("Edit", item, eqIndx, eq.name, eq.quantity, eq.weight, eq.desc)}
                                                        >
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton edge="end" size="small" onClick={() => onEquipmentRemove(item, eqIndx)}>
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
                    Add Equipment
                </Button>
            </Grid>
        </Grid>
    );
}

function EquipmentDialog(props) {

    const onCancel = () => {
        props.onCancel();
    }

    const options = [];
    props.options.forEach((item) => {
        options.push({title: item});
    });

    return (
        <Dialog open={props.open} onClose={onCancel} fullWidth maxWidth={"sm"} >
            <DialogTitle>{props.type} Equipment</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                        <Autocomplete
                            value={props.category}
                            onChange={props.categoryOnChange}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                        
                                // Suggest the creation of a new value
                                if (params.inputValue !== '') {
                                    filtered.push({
                                    inputValue: params.inputValue,
                                    title: `Add "${params.inputValue}"`,
                                    });
                                }
                        
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={options}
                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                // Regular option
                                return option.title;
                            }}
                            renderOption={(option) => option.title}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Choose or create a category" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Equipment Name"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.nameOnChange}
                            value={props.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Equipment Quantity"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.quantityOnChange}
                            value={props.quantity}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Weight Per Unit (lbs.)"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.weightOnChange}
                            value={props.weight}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Equipment Description"
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

export default EquipmentBlock;