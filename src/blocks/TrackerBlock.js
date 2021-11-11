import React from 'react';

import { Paper, TextField, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    container: {
        maxHeight: 547,
        height: 547
    }
});


function reducer(state) {
    return {trackers: state.trackers};
}


function TrackerBlock(props) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(reducer, {trackers: props.trackers});

    const onTrackerAdd = () => {
        props.onTrackerAdd();
        dispatch();
    }

    const onTrackerRemove = (indx) => {
        props.onTrackerRemove(indx);
        dispatch();
    }

    const onChange = (e, indx, item) => {
        props.onChange(indx, item, e.target.value);
        dispatch();
    }

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{width: "40%"}}>Tracker Name</TableCell>
                        <TableCell align="center" style={{width: "25%"}}>Total</TableCell>
                        <TableCell align="center" style={{width: "25%"}}>Used</TableCell>
                        <TableCell align="center" style={{width: "10%"}}> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.trackers.map((item, indx) => (
                        <TableRow>
                            <TableCell>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    value={item.name}
                                    onChange={(e) => onChange(e, indx, "name")}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    value={item.total}
                                    onChange={(e) => onChange(e, indx, "total")}
                                    inputProps={{style: {textAlign: "center"}}}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    value={item.used}
                                    onChange={(e) => onChange(e, indx, "used")}
                                    inputProps={{style: {textAlign: "center"}}}
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onTrackerRemove(indx)} size="small">
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            <IconButton onClick={() => onTrackerAdd()} size="small">
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TrackerBlock;