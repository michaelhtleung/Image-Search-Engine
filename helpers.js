const image_limit = 100;

const get_images_authors_presentation_data = async (db, storage_client, query) => {
    let images_authors_presentation_data = await run_query(query)
    images_authors_presentation_data = await attach_image_data(storage_client, images_authors_presentation_data)
    return images_authors_presentation_data

    async function run_query(query) {
        return await db.query(query);
    }
    async function attach_image_data(storage_client, presentation_data) {
        let pixels = presentation_data.map(post => get_image_pixels(storage_client, post.uri));
        let pixels_list = await Promise.all(pixels);
        for (let i = 0; i < pixels_list.length; i++) {
            presentation_data[i].pixels = pixels_list[i]
        }
        return presentation_data
    }
    async function get_image_pixels(storage_client, uri) {
        // {
        //     "image_id": 2,
        //     "author_id": 1,
        //     "first_name": "Alice",
        //     "datetime_upload": "2021-05-07T18:47:04.000Z",
        //     "public": 0,
        //     "uri": "gs://shopify_michael/brown_coat.jpg"
        // },
        // Downloads the file
        let fileName = uri.split("/").reverse()[0]
        let bucketName = uri.split("/").reverse()[1]
        let options = {}
        let in_memory_img = await storage_client.bucket(bucketName).file(fileName).download(options);
        in_memory_img = new Buffer.from(in_memory_img[0]);
        in_memory_img = in_memory_img.toString("base64");
        return in_memory_img;
    }
};

exports.searchImagesByText_get_images_authors_presentation_data = async (db, storage_client, search_terms) => {
    return await get_images_authors_presentation_data(db, storage_client, build_query(search_terms))
    function build_query(search_terms) {
        return `SELECT image_id, author_id, first_name, datetime_upload, public, uri FROM images_search_terms as ist JOIN search_term as st JOIN image as i JOIN user as u
        ON ist.search_term_id=st.id AND ist.image_id=i.id AND i.author_id=u.id
        WHERE st.term IN (${search_terms.map((term)=>`"${term}"`).join(", ")})
        LIMIT ${image_limit}`;
    }
}

exports.root_get_images_authors_presentation_data = async (db, storage_client) => {
    return await get_images_authors_presentation_data(db, storage_client, build_query())
    function build_query() {
        return `SELECT DISTINCT image_id, author_id, first_name, datetime_upload, public, uri FROM images_search_terms as ist JOIN search_term as st JOIN image as i JOIN user as u
        ON ist.search_term_id=st.id AND ist.image_id=i.id AND i.author_id=u.id
        LIMIT ${image_limit}`;
    }
}

exports.detect_objects_locally = async (vision_client, imageBuffer) => {
    const request = {
        image: {content: imageBuffer},
    };
    const [result] = await vision_client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    let max_index = 0;
    for (let i = 0; i < objects.length; i++){
        if (objects[i].score > objects[max_index].score) {
            max_index = i;
        }
    }
    console.log(objects[max_index].name);
    return [objects[max_index].name];
}