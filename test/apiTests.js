//Require the dev-dependencies
let axios = require('axios');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Search Images by Text', () => {
    describe('/POST search text', () => {
        it('should not return error with empty text', async (done) => {
            let data = {
                'search_terms': "fakeWord",
            };
            chai.request(server)
                .post('/api/searchImagesByText')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.empty;
                    done();
                });
        });

        it('should return image data', async (done) => {
            let data = {
                'search_terms': "top",
            };
            chai.request(server)
                .post('/api/searchImagesByText')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.image_id.should.exist;
                    res.body.author_id.should.exist;
                    res.body.first_name.should.exist;
                    res.body.datetime_upload.should.exist;
                    res.body.public.should.exist;
                    res.body.uri.should.exist;
                    res.body.pixels.should.exist;
                    done();
                });
        });
    });
});