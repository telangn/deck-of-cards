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
        var res = await chai.request(url).get('/api/deck/new').query({ jokers_enabled: 'true' });
        deckId = res.body.deck_id;
        return expect(res.body.remaining).to.equal(54);
    });

    it('Should shuffle deck', async () => {
        var res = await chai.request(url).get(`/api/deck/${deckId}/shuffle`);
        return expect(res.body.shuffled).to.be.true;
    });

    it('Should draw two random cards', async () => {
        var res = await chai.request(url).get(`/api/deck/${deckId}/draw/?count=2`);
        console.log('First Card Drawn: ' + res.body.cards[0].value + ' ' + res.body.cards[0].suit);
        console.log('Second Card Drawn: ' + res.body.cards[1].value + ' ' + res.body.cards[1].suit);
        return expect(res.body.remaining).to.equal(52);
    });
});