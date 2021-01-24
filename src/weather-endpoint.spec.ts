import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiAsPromised = require('chai-as-promised');
import 'mocha';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;
const url = 'https://api.weather.gov';

describe('Weather API', async () => {

    it('Should be up and running', async () => {
        var response = await chai.request(url).get('/');
        return expect(response).to.be.status(200);
    });

    it('Should return proper content', async () => {
        var response = await chai.request(url).get('/gridpoints/LWX/96,70/forecast')
            .set('User-Agent', 'telangn@gmail.com')
            .set('Accept', 'application/geo+json');
        return expect(response).to.have.header('content-type', 'application/geo+json');
    });
});