import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, MenuItem, InputLabel,
    Paper, TextField, Select, FormControl, Drawer } from '@material-ui/core';

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

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import DisplayTextField from '../components/DisplayTextField';

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxHeight: 512,
        height: 512,
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

function reducer(state) {
    return {featblock: state.featblock};
}

function FeatBlock(props) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(reducer, {featblock: props.featblock});

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [featOpen, setFeatOpen] = React.useState(false);
    const [featName, setFeatName] = React.useState("");
    const [featLevel, setFeatLevel] = React.useState(1);
    const [featDesc, setFeatDesc] = React.useState("");
    const [type, setType] = React.useState("");
    const [indx, setIndx] = React.useState(0);

    const handleDialogOpen = (type) => {
        setType(type);
        setFeatName("");
        setFeatLevel(1);
        setFeatDesc("");
        setDialogOpen(true);
    };

    const openFeatEditDialog = (type, indx, featName, featLevel, featDesc) => {
        setType(type);
        setIndx(indx);
        setFeatName(featName);
        setFeatLevel(featLevel);
        setFeatDesc(featDesc);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        if (type === "Add") {
            props.onFeatAdd(featName, featLevel, featDesc);
        } else if (type === "Edit") {
            props.onFeatEdit(indx, featName, featLevel, featDesc);
        }

        dispatch();
        setDialogOpen(false);
    };

    const handleDialogCancel = () => {
        dispatch();
        setDialogOpen(false);
    };

    const onFeatRemove = (indx) => {
        props.onFeatRemove(indx);
        dispatch();
    }

    const showFeatDetails = (featName, featLevel, featDesc) => {
        setFeatName(featName);
        setFeatLevel(featLevel);
        setFeatDesc(featDesc);
        setFeatOpen(true);
    }

    return (
        <Grid container component={Paper}>
            <FeatDialog
                open={dialogOpen}
                onCancel={handleDialogCancel}
                onClose={handleDialogClose}
                featName={featName}
                featLevel={featLevel}
                featDesc={featDesc}
                featNameOnChange={(e) => setFeatName(e.target.value)}
                featLevelOnChange={(e) => setFeatLevel(e.target.value)}
                featDescOnChange={(e) => setFeatDesc(e.target.value)}
                type={type}
            />
            <Drawer anchor={"right"} open={featOpen} onClose={() => setFeatOpen(false)}>
                <TableContainer component={Paper} style={{width: 500, height: "100%"}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow><TableCell align="center">{featName}</TableCell></TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <DisplayTextField 
                                        disabled
                                        value={featDesc}
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
                {/* <List
                    className={classes.root}
                >
                    {state.featblock.map((item, indx) => (
                        <React.Fragment>
                            {indx !== 0 && <ListItem><Divider style={{width: "100%"}}/></ListItem>}
                            <ListItem 
                                button
                                key={item.featName + indx}
                                onDoubleClick={() => showFeatDetails(item.featName, item.featLevel, item.featDesc)}
                                
                            >
                                <ListItemText primary={item.featName}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" size="small"
                                        onClick={() => openFeatEditDialog("Edit", indx, item.featName, item.featLevel, item.featDesc)}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <br/>
                                    <IconButton edge="end" size="small" onClick={() => onFeatRemove(indx)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            
                            {indx === state.featblock.length - 1 && <ListItem><Divider style={{width: "100%"}}/></ListItem>}
                        </React.Fragment>
                    ))}

                </List> */}
                <TableContainer className={classes.root}>
                    <Table size="small">
                        <TableBody>
                            {state.featblock.map((item, indx) => (
                                <TableRow 
                                    hover
                                    className={classes.clickable}
                                    onDoubleClick={() => showFeatDetails(item.featName, item.featLevel, item.featDesc)}
                                >
                                    <TableCell style={{width: "80%"}}>
                                        {item.featName}
                                    </TableCell>
                                    <TableCell align="right" style={{width: "20%"}}>
                                        <IconButton edge="end"
                                            onClick={() => openFeatEditDialog("Edit", indx, item.featName, item.featLevel, item.featDesc)}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => onFeatRemove(indx)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Button 
                    variant="contained"
                    disableElevation
                    fullWidth={true}
                    onClick={() => handleDialogOpen("Add")}
                >
                    Add Feat
                </Button>
            </Grid>
        </Grid>
    );
}

function FeatDialog(props) {

    const onCancel = () => {
        props.onCancel();
    }

    return (
        <Dialog open={props.open} onClose={onCancel} fullWidth maxWidth={"sm"} >
            <DialogTitle>{props.type} Feat</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Feat Name"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.featNameOnChange}
                            value={props.featName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel id="dialog-select-feat-level-label">Feat Level</InputLabel>
                            <Select
                                labelId="dialog-select-feat-level-label"
                                fullWidth={true}
                                onChange={props.featLevelOnChange}
                                value={props.featLevel}
                                label="Feat Level"
                            >
                                {Array.from(Array(20).keys()).map((item) => (
                                    <MenuItem key={item+1} value={item+1}>{item+1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                            label="Feat Description"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.featDescOnChange}
                            value={props.featDesc}
                            multiline
                            rows={20}
                            inputProps={{style: {
                                // width: 500,
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

export default FeatBlock;