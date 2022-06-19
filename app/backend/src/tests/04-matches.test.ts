import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/Match';
import {
  allMatches,
  finishedMatches,
  inProgressMatches,
} from './mocks/matches';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  let stub: sinon.SinonStub;
  let chaiHttpResponse: Response;

  describe('get matches route', () => {
    afterEach(() => {
      stub.restore();
    });

    describe('when given no filter', () => {
      before(async () => {
        stub = sinon
          .stub(Match, 'findAll')
          .resolves(allMatches as unknown as Match[]);

        chaiHttpResponse = await chai.request(app).get('/matches');
      });

      it('should return a 200 status and all matches', async () => {
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(allMatches);
      });
    });

    describe('when given finished matches filter', () => {
      before(async () => {
        stub = sinon
          .stub(Match, 'findAll')
          .resolves(finishedMatches as unknown as Match[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false');
      });

      it('should return a 200 status and the finished matches only', async () => {
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(finishedMatches);
      });
    });

    describe('when given in progress matches filter', () => {
      before(async () => {
        stub = sinon
          .stub(Match, 'findAll')
          .resolves(inProgressMatches as unknown as Match[]);

        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true');
      });

      it('should return a 200 status and the in progress matches only', async () => {
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(inProgressMatches);
      });
    });
  });
});
