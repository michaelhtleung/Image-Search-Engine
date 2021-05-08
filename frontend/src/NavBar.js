import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import AccountDisplay from "./AccountDisplay";
import ImageUploadButton from "./ImageUploadButton";
import SearchButton from "./SearchButton";
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextSearchBar from "./TextSearchBar";

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

export default function NavBar(props) {
    let [searchText, setSearchText] = useState('');
    let [searchImage, setSearchImage] = useState('');
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <AccountDisplay></AccountDisplay>
                    <TextSearchBar searchText={searchText} callback={newSearchText => setSearchText(newSearchText)}></TextSearchBar>
                    <ImageUploadButton searchImage={searchImage} callback={newSearchImage => setSearchImage(newSearchImage)}></ImageUploadButton>
                    <SearchButton searchText={searchText} searchImage={searchImage} updateImageCardData={props.updateImageCardData}></SearchButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
