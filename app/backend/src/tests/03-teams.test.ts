import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  describe('Route GET:/teams', () => {
    describe('Success case', () => {
      let chaiHttpResponse: Response;

      it('Should respond with status code 200 and teams list on body', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');
        const teams = [
          { id: 1, teamName: 'Avaí/Kindermann' },
          { id: 2, teamName: 'Bahia' },
          { id: 3, teamName: 'Botafogo' },
          { id: 4, teamName: 'Corinthians' },
          { id: 5, teamName: 'Cruzeiro' },
          { id: 6, teamName: 'Ferroviária' },
          { id: 7, teamName: 'Flamengo' },
          { id: 8, teamName: 'Grêmio' },
          { id: 9, teamName: 'Internacional' },
          { id: 10, teamName: 'Minas Brasília' },
          { id: 11, teamName: 'Napoli-SC' },
          { id: 12, teamName: 'Palmeiras' },
          { id: 13, teamName: 'Real Brasília' },
          { id: 14, teamName: 'Santos' },
          { id: 15, teamName: 'São José-SP' },
          { id: 16, teamName: 'São Paulo' },
        ];
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(teams);
      });
    });
  });

  describe('Route GET:/teams/:id', () => {
    describe('Success case', () => {
      let chaiHttpResponse: Response;

      it('Should respond with status code 200 and team on body', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/5');
        const team = { id: 5, teamName: 'Cruzeiro' };
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(team);
      });
    });
  });
});
