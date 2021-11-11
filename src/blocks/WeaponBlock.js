import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, MenuItem, InputLabel,
    Paper, TextField, Select, FormControl, Drawer, Divider } from '@material-ui/core';

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
        maxHeight: 300,
        height: 300,
        overflowY: "auto",
        // overflowX: "hidden"
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


function WeaponBlock(props) {
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [weaponOpen, setWeaponOpen] = React.useState(false);
    const [stat, setStat] = React.useState("Strength");
    const [prof, setProf] = React.useState("None");
    const [name, setName] = React.useState("");
    const [damage, setDamage] = React.useState("");
    const [damageType, setDamageType] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [hitBonus, setHitBonus] = React.useState(0);
    const [damageBonus, setDamageBonus] = React.useState(0);
    const [properties, setProperties] = React.useState("");

    const [type, setType] = React.useState("");
    const [subtype, setSubtype] = React.useState("");
    const [indx, setIndx] = React.useState(0);
    const [wIndx, setWIndx] = React.useState(0);


    const handleDialogOpen = (type, subtype) => {
        setType(type);
        setSubtype(subtype);
        setStat("Strength");
        setProf("None");
        setName("");
        setDamage("");
        setDamageType("");
        setHitBonus(0);
        setDamageBonus(0);
        setDesc("");
        setProperties("");
        setDialogOpen(true);
    };

    const openWeaponEditDialog = (type, subtype, indx, weapon, wIndx, weaponName) => {
        setType(type);
        setSubtype(subtype);
        setIndx(indx);
        if (wIndx !== null) setWIndx(wIndx);
        if (weaponName) {
            setName(weaponName);
        } else {
            setName(weapon.name);
        }
        setStat(weapon.stat);
        setProf(weapon.prof);
        setDamage(weapon.damage);
        setDamageType(weapon.damageType);
        setHitBonus(weapon.hitBonus);
        setDamageBonus(weapon.damageBonus);
        setDesc(weapon.desc);
        setProperties(weapon.properties);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        if (type === "Add") {
            if (subtype === "custom") {
                props.addCustomWeapon(stat, prof, name, damage, damageType, desc, hitBonus, damageBonus, properties);
            } else if (subtype === "existing") {
                props.addExistingWeapon(name, stat, prof, damage, damageType, hitBonus, damageBonus, properties);
            }
        } else if (type === "Edit") {
            if (subtype === "custom") {
                props.editCustomWeapon(indx, stat, prof, name, damage, damageType, desc, hitBonus, damageBonus, properties);
            } else if (subtype === "existing") {
                props.editExistingWeapon(indx, wIndx, stat, prof, damage, damageType, hitBonus, damageBonus, properties);
            }
        }

        setDialogOpen(false);
    };

    const handleDialogCancel = () => {
        setDialogOpen(false);
    };

    const onWeaponRemove = (indx, wIndx) => {
        props.onWeaponRemove(indx, wIndx);
    }

    const showWeaponDetails = (weapon) => {
        if (weapon.type === "existing") {
            const weaponDetails = props.equipmentblock.equipment.Weapons[weapon.wIndx];
            setName(weaponDetails.name);
            setDesc(weaponDetails.desc);
        } else {
            setName(weapon.name);
            setDesc(weapon.desc);
        }
        setWeaponOpen(true);
    }

    const calculateHit = (weapon) => {
        let value = Math.floor((props.stats[weapon.stat] - 10)/2) + parseInt(weapon.hitBonus);
        const proficiencyBonus = parseInt(props.proficiencyBonus);
        switch (weapon.prof) {            
            case "Half":
                value += Math.floor(proficiencyBonus/2);
            break;

            case "Normal":
                value += proficiencyBonus;
                break;

            case "Double":
                value += (2 * proficiencyBonus);
            break;
        
            default:
                break;
        }
        return value < 0 ? value : "+" + value;
    }

    const getDamage = (weapon) => {
        const value = Math.floor((props.stats[weapon.stat] - 10)/2) + parseInt(weapon.damageBonus);
        const absValue = Math.abs(value);
        const finalString = value < 0 ? weapon.damage + " - " + absValue : value === 0 ? weapon.damage : weapon.damage + " + " + absValue;
        return finalString + " " + weapon.damageType;
    }

    return (
        <Grid container component={Paper} justifyContent="space-around">
            <WeaponDialog
                open={dialogOpen}
                onCancel={handleDialogCancel}
                onClose={handleDialogClose}
                stat={stat} prof={prof} name={name} damage={damage} damageType={damageType}
                desc={desc} hitBonus={hitBonus} damageBonus={damageBonus} properties={properties}
                onStatChange={(e) => setStat(e.target.value)} onProfChange={(e) => setProf(e.target.value)}
                onNameChange={(e) => setName(e.target.value)} onDamageChange={(e) => setDamage(e.target.value)}
                onDescChange={(e) => setDesc(e.target.value)} onHitBonusChange={(e) => setHitBonus(e.target.value)}
                onPropertiesChange={(e) => setProperties(e.target.value)} onDamageBonusChange={(e) => setDamageBonus(e.target.value)}
                onDamageTypeChange={(e) => setDamageType(e.target.value)}
                type={type}
                subtype={subtype}
                options={props.equipmentblock.equipment.Weapons}
            />
            <Drawer anchor={"right"} open={weaponOpen} onClose={() => setWeaponOpen(false)}>
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
            <Grid item xs={12}>
                <TableContainer className={classes.root}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={7}>Weapons</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stat</TableCell>
                                <TableCell>Proficiency</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Hit</TableCell>
                                <TableCell>Damage</TableCell>
                                <TableCell>Properties</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.weaponblock.map((weapon, indx) => {

                                if (weapon.type === "custom") {
                                    return (
                                        <TableRow 
                                            hover
                                            className={classes.clickable}
                                            onDoubleClick={() => showWeaponDetails(weapon)}
                                            key={weapon.name + weapon.type}
                                        >
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.stat}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.prof}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.name}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{calculateHit(weapon)}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{getDamage(weapon)}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.properties}</TableCell>


                                            <TableCell align="right">
                                                <IconButton edge="end" size="small"
                                                    onClick={() => openWeaponEditDialog("Edit", "custom", indx, weapon, null, null)}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton edge="end" size="small"
                                                    onClick={() => onWeaponRemove(indx, null)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                } else if (weapon.type === "existing") {
                                    return (
                                        <TableRow 
                                            hover
                                            className={classes.clickable}
                                            onDoubleClick={() => showWeaponDetails(weapon)}
                                            key={weapon.name + weapon.type}
                                        >
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.stat}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.prof}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{props.equipmentblock.equipment.Weapons[weapon.wIndx].name}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{calculateHit(weapon)}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{getDamage(weapon)}</TableCell>
                                            <TableCell style={{fontSize: "9pt"}}>{weapon.properties}</TableCell>


                                            <TableCell align="right">
                                                <IconButton edge="end"size="small"
                                                    onClick={() => openWeaponEditDialog("Edit", "existing", indx, weapon, weapon.wIndx,
                                                                                        props.equipmentblock.equipment.Weapons[weapon.wIndx].name)}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton edge="end" size="small"
                                                    onClick={() => onWeaponRemove(indx, wIndx)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }

                                return <TableRow></TableRow>;
                                
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container item xs={12} spacing={1}>
                <Grid item xs={6}>
                    <Button 
                        variant="contained"
                        disableElevation
                        fullWidth={true}
                        onClick={() => handleDialogOpen("Add", "existing")}
                    >
                        Add from Equipment
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button 
                        variant="contained"
                        disableElevation
                        fullWidth={true}
                        onClick={() => handleDialogOpen("Add", "custom")}
                    >
                        Add Custom Weapon
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}


function WeaponDialog(props) {

    const options = [];

    props.options.forEach((weapon, indx) => {
        if (!weapon.wIndx && weapon.wIndx !== 0) {
            options.push({weapon, indx});
        }
    });

    return (
        <Dialog open={props.open} onClose={props.onCancel} fullWidth maxWidth={"sm"} >
            <DialogTitle>{props.type}&nbsp;
                {props.subtype === "custom" ?
                    "Custom Weapon" : props.type === "Add" ? "Weapon from Equipment" : "Weapon from Equipment - " + props.name}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel id="dialog-select-stat-label">Stat</InputLabel>
                            <Select
                                labelId="dialog-select-stat-label"
                                fullWidth={true}
                                onChange={props.onStatChange}
                                value={props.stat}
                                label="Stat"
                            >
                                {["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel id="dialog-select-proficiency-label">Proficiency</InputLabel>
                            <Select
                                labelId="dialog-select-proficiency-label"
                                fullWidth={true}
                                onChange={props.onProfChange}
                                value={props.prof}
                                label="Proficiency"
                            >
                                {["None", "Half", "Normal", "Double"].map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {props.subtype === "custom" ?
                        <React.Fragment>
                            <Grid item xs={12}>
                                <TextField
                                    label="Weapon Name"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onNameChange}
                                    value={props.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Damage Dice"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDamageChange}
                                    value={props.damage}
                                    helperText="eg: 2d8"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Damage Type"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDamageTypeChange}
                                    value={props.damageType}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Properties"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onPropertiesChange}
                                    value={props.properties}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Hit Bonus"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onHitBonusChange}
                                    value={props.hitBonus}
                                    type="number"
                                    helperText="This value is added on top of the calculated hit modifier."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Damage Bonus"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDamageBonusChange}
                                    value={props.damageBonus}
                                    type="number"
                                    helperText="This value is added on top of the calculated damage modifier."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Weapon Description"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDescChange}
                                    value={props.desc}
                                    multiline
                                    rows={20}
                                    inputProps={{style: {
                                        // width: 500,
                                        fontSize: "9pt"
                                    }}}
                                />
                            </Grid>
                        </React.Fragment>

                        :

                        <React.Fragment>
                            <Grid item xs={12}>
                                {props.type === "Add" &&
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel id="dialog-select-weapon-name-label">Weapon Name</InputLabel>
                                        <Select
                                            labelId="dialog-select-weapon-name-label"
                                            label="Weapon Name"
                                            fullWidth={true}
                                            variant="outlined"
                                            onChange={props.onNameChange}
                                            value={props.name}
                                        >
                                            {options.map((item) => (
                                                <MenuItem key={item.weapon.name} value={item.indx}>{item.weapon.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Damage Dice"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDamageChange}
                                    value={props.damage}
                                    helperText="eg: 2d8"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Damage Type"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDamageTypeChange}
                                    value={props.damageType}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Properties"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onPropertiesChange}
                                    value={props.properties}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Hit Bonus"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onHitBonusChange}
                                    value={props.hitBonus}
                                    type="number"
                                    helperText="This value is added on top of the calculated hit modifier."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Damage Bonus"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={props.onDamageBonusChange}
                                    value={props.damageBonus}
                                    type="number"
                                    helperText="This value is added on top of the calculated damage modifier."
                                />
                            </Grid>
                        </React.Fragment>

                    }
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

export default WeaponBlock;