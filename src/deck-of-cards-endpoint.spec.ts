import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const url = 'https://deckofcardsapi.com';

describe('Deck of Cards', () => {

    it('Should return a success', () => {
        return chai.request(url).get('/api/deck/new').then(response => {
            expect(response).to.be.status(200);
            expect(response.body.remaining).to.equal(52);
        });
    });

    it('Should be able to add Jokers', () => {
        return chai.request(url).get('/api/deck/new').query({ jokers_enabled: 'true' }).then(response => {
            expect(response.body.remaining).to.equal(54);
        });
    });
    
    it('Should be able to draw two cards', async () => {
        var deckId;
        await chai.request(url).get('/api/deck/new').then(response => {
            deckId = response.body.deck_id;
        });
        await chai.request(url).get(`/api/deck/${deckId}/draw/?count=2`).then(response => {
            expect(response.body.remaining).to.equal(50);
        });
    });
});