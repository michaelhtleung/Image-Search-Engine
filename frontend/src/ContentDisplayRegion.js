import ImageCard from "./ImageCard";
import Typography from '@material-ui/core/Typography';

export default function ContentDisplayRegion(props) {
    if (props.imageCardData.data.length == 0) {
        return (
            <div>
                <Typography variant="h4">
                    No matching images found.
                </Typography>
                <Typography variant="h6">
                    Please try another search query.
                </Typography>
            </div>
        );
    } else {
        return (
            <div>
                <ul>
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
    }
}
