import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Team from '../database/models/Team';
import validTeam from './mocks/validTeam';
import validTeamList from './mocks/validTeamList';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let chaiHttpResponse: Response;
  let stub: sinon.SinonStub;

  describe('GET teams route', () => {
    before(async () => {
      stub = sinon.stub(Team, 'findAll').resolves(validTeamList as Team[]);
    });

    after(() => {
      stub.restore();
    });

    it('should return a 200 status code and the team list', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(validTeamList);
    });
  });

  describe('GET team route', () => {
    afterEach(() => {
      stub.restore();
    });

    describe('Given the team does exist', () => {
      before(async () => {
        stub = sinon.stub(Team, 'findByPk').resolves(validTeam as Team);
      });

      it('should return a 200 status code and the team', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/5');

        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(validTeam);
      });
    });

    describe('Given the team does not exist', () => {
      before(async () => {
        stub = sinon.stub(Team, 'findByPk').resolves(null);
      });

      it('should return a 404 status', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/42');

        expect(chaiHttpResponse.status).to.equal(404);
      });
    });
  });
});
