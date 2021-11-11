import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function InfoSnackBar(props) {
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        props.setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar 
                open={props.open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Alert onClose={handleClose} severity="info" style={{textAlign: "left"}}>
                    You loaded a legacy character. Please take care to do the following
                    things:
                    <ul>
                        <li>Ensure all your character info is correct.</li>
                        <li>Set your classes and levels (It's a list now)</li>
                        <li>Add your weapons (You can add them from equipment now!)</li>
                        <li>Prepare your spells</li>
                        <li><strong>SAVE THIS CHARACTER (Ctrl+s works too!)</strong></li>
                    </ul>

                    <span style={{fontSize: "9pt"}}><em>NB: Due to the importance of this message, you need to close this manually.</em></span>
                </Alert>
            </Snackbar>
        </div>
    );
}

export default InfoSnackBar;
