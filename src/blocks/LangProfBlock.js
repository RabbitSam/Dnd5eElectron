import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Paper, TextField, Divider, Typography } from '@material-ui/core';
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

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxHeight: 247,
        height: 247,
        overflowY: "auto",
        overflowX: "hidden"
    },
    nested: {
        marginLeft: 5
    }
})

const filter = createFilterOptions();

const openVars = {};


function reducer(state) {
    return {langprofblock: state.langprofblock};
}


function openReducer(state) {
    return {openVars: state.openVars};
}


function LangProfBlock(props) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(reducer, {langprofblock: props.langprofblock});
    const order = Object.keys(state.langprofblock).sort();

    order.forEach((item) => {
        if (!(item in openVars)) openVars[item] = false;
    });

    const [openState, openDispatch] = React.useReducer(openReducer, {openVars: openVars});

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [lpCategory, setLPCategory] = React.useState("");
    const [lpName, setLPName] = React.useState("");

    const handleDialogOpen = () => {
        dispatch();
        setLPCategory("");
        setLPName("");
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        const lpNames = lpName.split(",");
        lpNames.forEach((name) => {
            props.onLangProfAdd(lpCategory, name);
        });
        if (!(lpCategory in openVars)) openVars[lpCategory] = false;
        dispatch();
        openDispatch();
        setDialogOpen(false);
    };

    const handleDialogCancel = () => {
        dispatch();
        setDialogOpen(false);
    };

    const lpCategoryOnChange = (e, newValue) => {
        if (typeof newValue === 'string') {
            setLPCategory({
                title: newValue,
            });
        } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setLPCategory({
                title: newValue.inputValue,
            });
        } else {
            setLPCategory(newValue);
        }
    }

    const lpNameOnChange = (e) => {
        setLPName(e.target.value);
    }

    const onLangProfRemove = (category, indx) => {
        props.onLangProfRemove(category, indx);
        if (indx === null) {
            delete openVars[category];
        }
        dispatch();
        openDispatch();
    }

    const openCategory = (category, open) => {
        openVars[category] = open;
        openDispatch();
    }

    return (
        <Grid container component={Paper}>
            <LangProfDialog
                open={dialogOpen}
                onCancel={handleDialogCancel}
                onClose={handleDialogClose}
                lpCategory={lpCategory}
                lpCategoryOnChange={lpCategoryOnChange}
                lpName={lpName}
                lpNameOnChange={lpNameOnChange}
                options={order}
            />
            <Grid item xs={12} style={{marginTop: 6, marginBottom: 10, fontSize: "11pt"}}>
                {"Languages & Proficiencies"}
            </Grid>
            <Grid item xs={12}>
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
                                    <Typography style={{fontSize: "9pt", wordWrap: "break-word"}}>{item}</Typography>
                                }/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => onLangProfRemove(item, null)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Collapse timeout="auto" unmountOnExit in={openState.openVars[item]}>
                                <List component="div" disablePadding>
                                    {state.langprofblock[item].map((prof, profIndx) => (
                                        <React.Fragment key={prof}>
                                            {profIndx === 0 && <ListItem><Divider style={{width: "100%"}}/></ListItem>}
                                            <ListItem className={classes.nested}>
                                            <ListItemText secondary={
                                                <Typography style={{fontSize: "9pt", wordWrap: "break-word"}}>{prof}</Typography>
                                            }/>
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" onClick={() => onLangProfRemove(item, profIndx)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {profIndx === state.langprofblock[item].length - 1 
                                                && <ListItem><Divider style={{width: "100%"}}/></ListItem>}
                                        </React.Fragment>
                                    ))}
                                </List>
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
                    onClick={handleDialogOpen}
                >
                    Add Item
                </Button>
            </Grid>
        </Grid>
    );
}

function LangProfDialog(props) {

    const onCancel = () => {
        props.onCancel();
    }

    const options = [];
    props.options.forEach((item) => {
        options.push({title: item});
    });

    return (
        <Dialog open={props.open} onClose={onCancel} >
            <DialogTitle>Add Language/Proficiency</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={props.lpCategory}
                            onChange={props.lpCategoryOnChange}
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
                            label="Language/Proficiency Name"
                            fullWidth={true}
                            variant="outlined"
                            onChange={props.lpNameOnChange}
                            value={props.lpName}
                            helperText="To add multiple items to this category: comma separate variables. Eg: abc,def,ghi"
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

export default LangProfBlock;