import TextFieldsIcon from "@material-ui/icons/TextFields";
import InputBase from "@material-ui/core/InputBase";
import {React} from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function TextSearchBar(props) {
    const classes = useStyles();
    function keyPress(e){
        if(e.keyCode == 13){
            // alert('enter')
            async function run_search() {
                // alert('click');
                // local:
                // let uri = 'http://localhost:8080/searchImagesByText';
                // production:
                let uri = 'https://shopify-dev-challenge-f21.uc.r.appspot.com/api/searchImagesByText';
                let searchText = props.searchText;
                try {
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
            };
            run_search();
        }
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <TextFieldsIcon />
            </div>
            <InputBase
                placeholder="Type Search Terms"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchText}
                onChange={event => props.updateSearchText(event.target.value)}
                onKeyDown={keyPress}
            />
        </div>
    );
}