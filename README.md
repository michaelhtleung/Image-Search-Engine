# Shopify Developer Challenge Submission - Fall 2021:
## Completed Features:
- [x] SEARCH function
    - [ ] from characteristics of the images
    - [x] from text
    - [ ] from an image (search for similar images)
    
## How to use Application (as a User):
Click [HERE](https://shopify-dev-challenge-f21.uc.r.appspot.com/) and search from almost 2000 images of fashion items. I assumed that a fashion merchant would find it useful to query images by their content form their store on Shopify.

Enter your search terms in the text field and press "RUN SEARCH" to get results.

Try these search terms to get started:

1. bag
2. belt
3. bracelet
4. dress
5. glasses
6. hat
7. necklace
8. pants
9. shoes
10. top

## How to use Application (as a Developer):
### Set Up:
I used the following Google Cloud Platform as infrastructure for developing and deploying this project, and as such, the set up instructions are very complicated and it would better to refer to the official GCP set up documentation.

### Running Tests:
Run the following with all server environment variables (see `app.standard.yaml` in the root project directory):
`mocha test/apiTests.js`

## Languages, Frameworks, and Technologies used:
- JavaScript
- ReactJS
- Expressjs
- Mocha/Chai

| GCP Technology | Usage                                                                                                          | Why It Matters                                                              |
|----------------|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Vision AI      | labels all images in repository by objects detected                                                            | effective and efficient method for labelling images for querying            |
| App Engine     | deploys ReactJS frontend and Expressjs backend severs and automatically scales them to match user traffic load | simple and scalable solution for deploying servers quickly                  |
| Cloud SQL      | stores user data, image content labels, and GCP bucket URIs to images (instead of image pixels directly)       | saving GCP bucket URIs prevents MySQL from being excessively large and slow |
| Cloud Storage  | stores almost 2000 images in GCP buckets for high availability globally                                        | integrates seamlessly with GCP ecosystem which reduced development time     |