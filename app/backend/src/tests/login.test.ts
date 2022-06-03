import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { beforeEach } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route POST:/login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'gilson',
      role: 'admin',
      email: 'gilson@email.com',
      password: '$2a$10$/Yono.it5D8/AGsK3dVqN.ey8Tr/I3In0R/.TvNrFONv2VWEQJ1eu',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('When valid email and password is entered', () => {
    beforeEach(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'gilson@email.com',
        password: '1234',
      });
    });

    it('Should return status code 200', () => {
      expect(chaiHttpResponse.status).to.equal(200);
    });

    it('should return user object with properties "id", "username", "role" and "email"', () => {
      expect(chaiHttpResponse.body).to.have.property('user');
      const { user } = chaiHttpResponse.body;
      expect(user).to.be.an('object');
      expect(user).to.have.all.keys('id', 'username', 'role', 'email');
    });

    it('should NOT have property "password"', () => {
      expect(chaiHttpResponse.body).not.to.have.property('password');
    });
  });
});
