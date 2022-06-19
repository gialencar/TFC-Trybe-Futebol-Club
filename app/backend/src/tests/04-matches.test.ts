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

  describe('post matches route', () => {
    afterEach(() => {
      stub.restore();
    });

    describe('when creating an "in progress" match', () => {
      const requestBody = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      };
      const responseBody = {
        id: 1,
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      };

      before(async () => {
        stub = sinon.stub(Match, 'create').resolves(responseBody as Match);

        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .send(requestBody);
      });

      it('should return a 201 status code and the created match', () => {
        expect(chaiHttpResponse.status).to.eq(201);
        expect(chaiHttpResponse.body).to.deep.eq(responseBody);
      });
    });

    describe('when creating a "finished" match', () => {
      const responseBody = { message: 'Finished' };

      before(async () => {
        stub = sinon.stub(Match, 'update').resolves([
          1,
          [
            {
              id: 1,
              homeTeam: 16,
              awayTeam: 8,
              homeTeamGoals: 2,
              awayTeamGoals: 2,
              inProgress: true,
            } as Match,
          ],
        ]);

        chaiHttpResponse = await chai.request(app).patch('/matches/1/finished');
      });

      it('should return a 200 status code and message "Finished"', () => {
        expect(chaiHttpResponse.status).to.eq(200);
        expect(chaiHttpResponse.body).to.deep.eq(responseBody);
      });
    });
  });
});
