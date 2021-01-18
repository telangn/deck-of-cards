import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const url = 'https://deckofcardsapi.com';

describe('Deck of Cards API', () => {

    var deckId: any;

    it('Should create a deck with Jokers', () => {
        return chai.request(url).get('/api/deck/new').query({ jokers_enabled: 'true' }).then(res => {
            expect(res).to.be.status(200);
            expect(res.body.remaining).to.equal(54);
            deckId = res.body.deck_id;
        });
    });

    it('Should shuffle deck', () => {
        return chai.request(url).get(`/api/deck/${deckId}/shuffle`).then(res => {
            expect(res).to.be.status(200);
            expect(res.body.shuffled).to.be.true;
        });
    });

    it('Should draw two cards', () => {
        return chai.request(url).get(`/api/deck/${deckId}/draw/?count=2`).then(res => {
            expect(res).to.be.status(200);
            expect(res.body.remaining).to.equal(52);
            console.log('First Card Drawn: ' + res.body.cards[0].value + ' ' + res.body.cards[0].suit);
            console.log('Second Card Drawn: ' + res.body.cards[1].value + ' ' + res.body.cards[1].suit);
        });
    });
});