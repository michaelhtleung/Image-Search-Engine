import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import FormData from 'form-data';

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
                        // local:
                        let uri = 'http://localhost:8080/api/';
                        // production:
                        // let uri = 'https://shopify-dev-challenge-f21.uc.r.appspot.com/api/';
                        let searchText = props.searchText;
                        try {
                            if (props.searchImage !== 0) {
                                // case: there is an attached image
                                uri = `${uri}searchImagesByImages`
                                const formData = new FormData();
                                formData.append('base64', props.searchImage)
                                let cardData = await axios.post(uri, formData, {
                                    url: uri,
                                    method: 'post',
                                    data: formData,
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                });
                                props.updateImageCardData(await cardData);
                                // TODO: empty search text after submission
                                } else {
                                    // case: there is no attached image
                                    uri = `${uri}searchImagesByText`
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
                        } catch (error) {
                            alert(error);
                        }
                    }
                }
            >
                Run Search
            </Button>
        </div>
    );
}
