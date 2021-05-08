import ImageCard from "./ImageCard";

export default function ContentDisplayRegion(props) {
    return (
        <div>
            <ul>
                {props.imageCardData.map(cardData => {
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
