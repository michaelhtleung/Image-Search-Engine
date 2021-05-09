import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function ImageUploadButton(props) {
    let [buttonColor, setButtonColor] = useState("");
    let [buttonText, setButtonText] = useState("Upload Similar Image to Search");
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                value={props.searchImage}
                onChange={event => {
                    setButtonColor('primary');
                    setButtonText('Image Attached')
                    props.callback(event.target.value);
                }}
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    color={buttonColor}
                    component="span"
                    startIcon={<ImageIcon/>}
                >
                    {buttonText}
                </Button>
            </label>
        </div>
    );
}
