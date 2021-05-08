import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

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
                onClick={
                    async () => {
                        // alert('click');
                        let searchText = props.searchText;
                        try {
                            if (props.searchImage !== 0) {
                                // case: there is an attached image
                                await post_and_update_state_text_and_image(searchText, props.searchImage);
                            } else {
                                // case: there is no attached image
                                await post_and_update_state_text_only(searchText);
                            }
                        } catch (error) {
                            alert(error);
                        }
                        async function post_and_update_state_text_and_image(searchText, searchImage) {
                            let uri = 'http://localhost:8080/searchImagesByImages';
                            let data = new URLSearchParams();
                            data.append('search_image', searchImage);
                            let cardData = await axios.post(uri, data, {
                                url: uri,
                                method: 'post',
                                data: data,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                            });
                            // alert('POST response received');
                            props.updateImageCardData(await cardData);
                        }
                        async function post_and_update_state_text_only(searchText) {
                            let uri = 'http://localhost:8080/searchImagesByText';
                            let data = new URLSearchParams();
                            data.append('search_terms', searchText);
                            let cardData = await axios.post(uri, data, {
                                url: uri,
                                method: 'post',
                                data: data,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                            });
                            // alert('POST response received');
                            props.updateImageCardData(await cardData);
                        }
                    }
                }
            >
                Run Search
            </Button>
        </div>
    );
}
