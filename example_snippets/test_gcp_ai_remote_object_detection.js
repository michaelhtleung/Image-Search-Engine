async function main() {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // The ID of your GCS bucket
    const bucketName = 'shopify_michael';

    // The ID of your GCS file
    const fileName = 'blue_chair.jpg';
    const gcsUri = `gs://${bucketName}/${fileName}`;

    const [result] = await client.objectLocalization(gcsUri);
    const objects = result.localizedObjectAnnotations;
    objects.forEach(object => {
        console.log(`Name: ${object.name}`);
        console.log(`Confidence: ${object.score}`);
        const veritices = object.boundingPoly.normalizedVertices;
        veritices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
    });
}

main();