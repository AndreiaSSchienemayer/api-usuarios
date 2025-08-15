const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../app');
const loginService = require('../src/services/loginService');

chai.use(chaiHttp);
const { expect } = chai;

describe('Login Controller', () => {
  let authenticateStub;

  beforeEach(() => {
    authenticateStub = sinon.stub(loginService, 'authenticate');
  });

  afterEach(() => {
    authenticateStub.restore();
  });

  it('deve retornar token para login válido', async () => {
    authenticateStub.returns({ token: 'fake-jwt-token' });
    const res = await chai.request(app).post('/login').send({ username: 'admin', password: '123456' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  it('deve retornar erro para login inválido', async () => {
    authenticateStub.returns(null);
    const res = await chai.request(app).post('/login').send({ username: 'admin', password: 'laranja' });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message', 'Usuário ou senha inválidos.');
  });

  it('deve chamar o service com os parâmetros corretos', async () => {
    authenticateStub.returns({ token: 'fake-jwt-token' });
    await chai.request(app).post('/login').send({ username: 'Andreia', password: 'pass' });
    expect(authenticateStub.calledWith('Andreia', 'pass')).to.be.true;
  });

  it('deve retornar erro se não enviar username', async () => {
    const res = await chai.request(app).post('/login').send({ password: '123456' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message', 'Usuário e senha são obrigatórios.');
  });

  it('deve retornar erro se não enviar password', async () => {
    const res = await chai.request(app).post('/login').send({ username: 'admin' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message', 'Usuário e senha são obrigatórios.');
  });
});
