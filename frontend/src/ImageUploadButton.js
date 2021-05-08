import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';


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

export default function ImageUploadButton() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<ImageSearchIcon/>}
                >
                    Upload Similar Image to Search by
                </Button>
            </label>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        </div>
    );
}
