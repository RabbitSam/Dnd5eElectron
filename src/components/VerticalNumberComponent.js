import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


function VerticalNumberComponent(props) {

    function valueOnChange(newValue) {
        props.onChange(newValue);
    }

    return (
        <div>
            <Grid
                container 
                direction="column-reverse" 
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <IconButton size="small" onClick={() => valueOnChange(props.count-1)} aria-label="decrease value">
                        <RemoveIcon/>
                    </IconButton>
                </Grid>

                <Grid item>
                    <p style={{textAlign: "center"}}>{props.count}</p>
                </Grid>

                <Grid item>
                    <IconButton size="small" onClick={() => valueOnChange(props.count+1)}>
                        <AddIcon/>
                    </IconButton>
                </Grid>

            </Grid>
        </div>
    );
}

export default React.memo(VerticalNumberComponent);