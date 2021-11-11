import React from 'react';

import { Grid, IconButton, Paper, TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

import NumberComponent from '../components/NumberComponent';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    container: {
        maxHeight: 225,
        height: 225
    }
});


function reducer(state, action) {
    let nClasses = state.classes;
    return {classes: nClasses};
}


function InfoBlock(props) {

    const info = props.info;

    const [cName, setCName] = React.useState(info["Character Name"]);
    const [pName, setPName] = React.useState(info["Player Name"]);
    const [race, setRace] = React.useState(info["Race"]);
    const [background, setBackground] = React.useState(info["Background"]);
    const [alignment, setAlignment] = React.useState(info["Alignment"]);
    const [exp, setExp] = React.useState(info["Experience Points"]);
    const [classes, dispatch] = React.useReducer(reducer, {classes: info["Classes"]});

    const fList = {
        "Character Name": setCName,
        "Player Name": setPName,
        "Race": setRace,
        "Background": setBackground,
        "Alignment": setAlignment,
        "Experience Points": setExp,
    }

    const styleclasses = useStyles();
    const style = { width: "100%" };

    const infoOnChange = (e, item) => {
        props.infoOnChange(item, e.target.value);
        fList[item](e.target.value);
    };

    const classOnChange = (e, indx1, indx2) => {
        props.classOnChange(indx1, indx2, e.target.value);
        dispatch({type: "class", indx1: indx1, indx2: indx2, value: e.target.value});
    };

    const levelOnChange = (indx, count) => {
        props.levelOnChange(indx, count);
        dispatch({type: "level", indx: indx, value: count});
    }

    const classOnAdd = () => {
        props.classOnAdd();
        dispatch({type: "classnum+"});
    }

    const classOnRemove = (indx) => {
        props.classOnRemove(indx);
        dispatch({type: "classnum-", indx: indx});
    }
    
    return (
        <Grid container spacing={1} component={Paper}>
            <Grid item xs={6}>
                <TextField
                    key="Character Name"
                    label="Character Name"
                    variant="outlined"
                    value={cName}
                    onChange={(e) => infoOnChange(e, "Character Name")}
                    style={style}
                    size="small"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    key="Player Name"
                    label="Player Name"
                    variant="outlined"
                    value={pName}
                    onChange={(e) => infoOnChange(e, "Player Name")}
                    style={style}
                    size="small"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    key="Race"
                    label="Race" 
                    variant="outlined"
                    value={race}
                    onChange={(e) => infoOnChange(e, "Race")}
                    style={style}
                    size="small"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    key="Background"
                    label="Background"
                    variant="outlined"
                    value={background}
                    onChange={(e) => infoOnChange(e, "Background")}
                    style={style}
                    size="small"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    key="Alignment"
                    label="Alignment"
                    variant="outlined"
                    value={alignment}
                    onChange={(e) => infoOnChange(e, "Alignment")}
                    style={style}
                    size="small"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    key="Experience Points"
                    label="Experience Points"
                    variant="outlined" 
                    value={exp}
                    onChange={(e) => infoOnChange(e, "Experience Points")}
                    style={style}
                    size="small"
                />
            </Grid>
            {/* <Grid item xs={12}>
                <TextField 
                        label="Class & Level" 
                        variant="outlined" 
                        value={info["Class & Level"]}
                        onChange={(e) => infoOnChange(e, "Class & Level")}
                        style={style}
                        size="small"
                    />
            </Grid> */}
            <Grid item xs={12}><Divider/></Grid>
            <Grid item xs={12}>
                <TableContainer className={styleclasses.container}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{width:"30%"}} align="center">Class</TableCell>
                                <TableCell style={{width:"30%"}} align="center">Subclass (If Applicable)</TableCell>
                                <TableCell style={{width:"30%"}} align="center">Level</TableCell>
                                <TableCell style={{width:"10%"}} align="left"> </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {classes.classes.map((row, indx) => (
                                <TableRow key={indx}>
                                    <TableCell style={{width:"30%"}}>
                                        <TextField
                                            variant="outlined"
                                            value={row[0]}
                                            style={style}
                                            onChange={(e) => classOnChange(e, indx, 0)}
                                            size="small"
                                            placeholder="Type in your Class"
                                        />
                                    </TableCell>
                                    <TableCell style={{width:"30%"}}>
                                        <TextField
                                            variant="outlined"
                                            value={row[1]}
                                            style={style}
                                            onChange={(e) => classOnChange(e, indx, 1)}
                                            size="small"
                                            placeholder="Type in your Subclass"
                                        />
                                    </TableCell>
                                    <TableCell align="center" style={{width:"30%"}}>
                                        <NumberComponent count={row[2]} onChange={(count) => levelOnChange(indx, count)}/>
                                    </TableCell>
                                    { indx === 0 &&
                                        <TableCell style={{width:"10%"}}> </TableCell>
                                    }
                                    { indx > 0 &&
                                        <TableCell align="left" style={{width:"10%"}}>
                                            <IconButton onClick={() => classOnRemove(indx)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell>
                                    <IconButton onClick={() => classOnAdd()}>
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
            </Grid>
        </Grid>
    );
}

function areEqual(prevProps, nextProps) {
    const pInfo = prevProps.info;
    const nInfo = nextProps.info;
    const pClasses = prevProps.info["Classes"]
    const nClasses = nextProps.info["Classes"]

    if (pClasses.length !== nClasses.length) return true;

    for (const pKey in pInfo) {
        if (pKey !== "Classes") {
            if (pInfo[pKey] !== nInfo[pKey]) {
                return true;
            }
        } else {
            for (let i = 0; i < pClasses.length; i++) {
                const current = pClasses[i];
                const nCurrent = nClasses[i];
        
                if (current[0] !== nCurrent[0] || current[1] !== nCurrent[1] || current[2] !== nCurrent[2]) return true;
            }
        }
    }

    return false;
}

export default React.memo(InfoBlock, areEqual);