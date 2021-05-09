import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
                        // local:
                        // let uri = 'http://localhost:8080/searchImagesByText';
                        // production:
                        let uri = 'https://shopify-dev-challenge-f21.uc.r.appspot.com/api/searchImagesByText';
                        let searchText = props.searchText;
                        try {
                        // if (props.searchImage !== 0) {
                        //     // case: there is an attached image
                        //     let searchTextFromImage = await axios.post(gcp_cv_uri, props.searchImage);
                        //     searchText += ` ${searchTextFromImage }`;
                        //     let cardData = await axios.post(uri, searchText);
                        //     props.updateImageCardData(await cardData);
                        // } else {
                            // case: there is no attached image
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
                        } catch (error) {
                            alert(error);
                        }
                    // }
                }}
            >
                Run Search
            </Button>
        </div>
    );
}
