import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import profilePicture1 from "./static/alice.jpg";
import profilePicture2 from "./static/bob.jpg";
import contentPicture1 from "./static/blue_chair.jpg";
import contentPicture2 from "./static/brown_coat.jpg";
import contentPicture3 from "./static/red_purse.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ImageCard(props) {
    const classes = useStyles();
    let [profilePicture, setProfilePicture] = useState(0);
    useEffect(() => {
        if (props.cardData.author_id == 1) {
            setProfilePicture(profilePicture1);
        } else if (props.cardData.author_id == 2) {
            setProfilePicture(profilePicture2);
        }
    });

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={profilePicture} alt={"Alice"}/>
                }
                title={props.cardData.first_name}
                subheader={props.cardData.datetime_upload}
            />
            <CardMedia className={classes.media} image={"data:image/png;base64," + props.cardData.pixels}/>
            {/*<CardMedia className={classes.media} image={props.pixels} title="Paella dish"/>*/}
        </Card>
    );
}
