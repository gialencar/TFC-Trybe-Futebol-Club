import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
import validTeam from './mocks/validTeam';
import validTeamList from './mocks/validTeamList';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let chaiHttpResponse: Response;

  describe('GET teams route', () => {
    it('should return a 200 status code and the team list', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(validTeamList);
    });
  });

  describe('GET team route', () => {
    describe('Given the team does exist', () => {
      it('should return a 200 status code and the team', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/5');

        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(validTeam);
      });
    });

    describe('Given the team does not exist', () => {
      it('should return a 404 status', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/42');

        expect(chaiHttpResponse.status).to.equal(404);
      });
    });
  });
});
