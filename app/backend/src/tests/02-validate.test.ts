import * as sinon from 'sinon';
import * as chai from 'chai';
import { readFileSync } from 'fs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route GET:/login/validate', () => {
  let chaiHttpResponse: Response;
  let authorization: string;

  describe('When user have authorization token', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves({
        id: 1,
        username: 'gilson',
        role: 'admin',
        email: 'gilson@email.com',
        password:
          '$2a$10$/Yono.it5D8/AGsK3dVqN.ey8Tr/I3In0R/.TvNrFONv2VWEQJ1eu',
      } as User);

      const {
        body: { token },
      } = await chai.request(app).post('/login').send({
        email: 'gilson@email.com',
        password: '1234',
      });
      authorization = token;
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    beforeEach(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', authorization);
    });

    it('should return status 200 with user role in body', async () => {
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.be.an.string;
      expect(chaiHttpResponse.body).to.equal('admin');
    });
  });
});
