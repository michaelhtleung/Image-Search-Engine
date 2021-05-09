import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import AccountDisplay from "./AccountDisplay";
import ImageUploadButton from "./ImageUploadButton";
import SearchButton from "./SearchButton";
import TextSearchBar from "./TextSearchBar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        'min-height': '100px',
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
    },
    interactiveElements: {
        "display": "flex",
        "max-width": "800px",
        "align-items": "center",
    }
}));

export default function NavBar(props) {
    let [searchText, setSearchText] = useState('');
    let [searchImage, setSearchImage] = useState('');
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <AccountDisplay></AccountDisplay>
                    <div className={classes.interactiveElements}>
                        <TextSearchBar searchText={searchText} callback={newSearchText => setSearchText(newSearchText)}></TextSearchBar>
                        <ImageUploadButton searchImage={searchImage} callback={newSearchImage => setSearchImage(newSearchImage)}></ImageUploadButton>
                        <SearchButton searchText={searchText} searchImage={searchImage} updateImageCardData={props.updateImageCardData}></SearchButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
