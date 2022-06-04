import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route GET:/teams', () => {
  describe('Success case', () => {
    let chaiHttpResponse: Response;

    it('Should respond with status code 200 and teams list on body', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
      const teams = [
        { id: 1, team_name: 'Avaí/Kindermann' },
        { id: 2, team_name: 'Bahia' },
        { id: 3, team_name: 'Botafogo' },
        { id: 4, team_name: 'Corinthians' },
        { id: 5, team_name: 'Cruzeiro' },
        { id: 6, team_name: 'Ferroviária' },
        { id: 7, team_name: 'Flamengo' },
        { id: 8, team_name: 'Grêmio' },
        { id: 9, team_name: 'Internacional' },
        { id: 10, team_name: 'Minas Brasília' },
        { id: 11, team_name: 'Napoli-SC' },
        { id: 12, team_name: 'Palmeiras' },
        { id: 13, team_name: 'Real Brasília' },
        { id: 14, team_name: 'Santos' },
        { id: 15, team_name: 'São José-SP' },
        { id: 16, team_name: 'São Paulo' },
      ];
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teams);
    });
  });
});
