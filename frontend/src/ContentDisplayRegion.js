import ImageCard from "./ImageCard";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    ul: {
        "padding-inline-end": "40px"
    },
    message: {
        "margin-top": "40px"
    }
}));

export default function ContentDisplayRegion(props) {
    const classes = useStyles();
    if (props.imageCardData === -1) {
        return (
            <div>
                <Typography className={classes.message} variant="h4">
                    Please enter a search query.
                </Typography>
            </div>
        );
    } else if (props.imageCardData.data !== undefined && props.imageCardData.data.length >= 1) {
        return (
            <div>
                <ul className={classes.ul}>
                    {props.imageCardData.data.map(cardData => {
                        return (
                            <ImageCard
                                cardData={cardData}
                                key={cardData.image_id.toString()}>
                            </ImageCard>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                <Typography className={classes.message} variant="h4">
                    No matching images found.
                </Typography>
                <Typography variant="h6">
                    Please try another search query.
                </Typography>
            </div>
        );
    }
}
