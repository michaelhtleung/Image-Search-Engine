import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SearchButton(props) {
    const classes = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={async (event) => {
                    // TODO: make axios call?
                    // pseudocode:
                    // let searchText = props.searchText;
                    // if (props.searchImage !== 0) {
                    //     // case: there is an attached image
                    //     let searchTextFromImage = await axios.post(gcp_cv_uri, props.searchImage);
                    //     searchText += ` ${searchTextFromImage }`;
                    //     let cardData = await axios.post(uri, searchText);
                    //     props.updateImageCardData(await cardData);
                    // } else {
                    //     // case: there is no attached image
                    //     let cardData = await axios.post(uri, searchText);
                    //     props.updateImageCardData(await cardData);
                    // }
                }}
            >
                Run Search
            </Button>
        </div>
    );
}
