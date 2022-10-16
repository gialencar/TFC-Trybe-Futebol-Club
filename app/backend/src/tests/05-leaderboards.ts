import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboards', () => {
  let stub: sinon.SinonStub;
  let chaiHttpResponse: Response;

  describe('leaderboard/home route ', () => {
    
  });
});