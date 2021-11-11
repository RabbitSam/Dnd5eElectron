import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const DisplayTextField = withStyles({
    root: {
        marginRight: 8,
        "& .MuiInputBase-root.Mui-disabled": {
            color: "rgba(0, 0, 0, 1.0)", // (default alpha is 0.38)
            fontSize: "10pt"
        }
    }
})(TextField);

export default DisplayTextField;