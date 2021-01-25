import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiAsPromised = require('chai-as-promised');
import 'mocha';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;
const url = 'https://deckofcardsapi.com';

describe('Deck of Cards API', () => {

    var deckId: any;

    it('Should create a deck with Jokers', async () => {
        var response = await chai.request(url).get('/api/deck/new').query({ jokers_enabled: 'true' });
        deckId = response.body.deck_id;
        return expect(response.body.remaining).to.equal(54);
    });

    it('Should shuffle deck', async () => {
        var response = await chai.request(url).get(`/api/deck/${deckId}/shuffle`);
        return expect(response.body.shuffled).to.be.true;
    });

    it('Should draw two random cards', async () => {
        var response = await chai.request(url).get(`/api/deck/${deckId}/draw/?count=2`);
        console.log('First Card Drawn: ' + response.body.cards[0].value + ' ' + response.body.cards[0].suit);
        console.log('Second Card Drawn: ' + response.body.cards[1].value + ' ' + response.body.cards[1].suit);
        return expect(response.body.remaining).to.equal(52);
    });
});