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
      describe('given a valid match', () => {
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

      describe('given a match in which the two teams are the same', () => {
        const requestBody = {
          homeTeam: 16,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true,
        };

        before(async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .send(requestBody);
        });

        it('should return a 401 status code and the message: "It is not possible to create a match with two equal teams"', () => {
          expect(chaiHttpResponse.status).to.eq(401);
          expect(chaiHttpResponse.body).to.deep.eq({
            message:
              'It is not possible to create a match with two equal teams',
          });
        });
      });

      describe('given a match in which a team does not exist in the Teams table', () => {
        const requestBody = {
          homeTeam: 99,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true,
        };

        before(async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .send(requestBody);
        });

        it('should return a 404 status code and the message: "There is no team with such id!"', () => {
          expect(chaiHttpResponse.status).to.eq(404);
          expect(chaiHttpResponse.body).to.deep.eq({
            message: 'There is no team with such id!',
          });
        });
      });
    });

    describe('when "finishing" a match', () => {
      describe('given a match which IS in progress', () => {
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

          chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
        });

        it('should return a 200 status code and message "Finished"', () => {
          expect(chaiHttpResponse.status).to.eq(200);
          expect(chaiHttpResponse.body).to.deep.eq(responseBody);
        });
      });
    });
  });

  describe('patch matches route', () => {
    describe('when updating a match', () => {
      const responseBody = { message: 'done' };
      const requestBody = { homeTeamGoals: 3, awayTeamGoals: 1 };

      before(async () => {
        stub = sinon.stub(Match, 'update').resolves();

        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/42')
          .send(requestBody);
      });

      it('should return a 200 status code and "done" message', () => {
        expect(chaiHttpResponse.status).to.eq(200);
        expect(chaiHttpResponse.body).to.deep.eq(responseBody);
      });
    });
  });
});
