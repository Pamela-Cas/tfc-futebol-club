import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const reqUser = {  
    email: "admin@admin.com",
    password: bcrypt.hashSync("secret_admin")

  }

  const reqUserBody = {
    email: "admin@admin.com",
    password: "secret_admin"

  }

  const wrongUser = {
    email: 11,
    password: "secret_admin"

  }

describe('/login', () => {
    describe('/POST', () => {
        let chaiResponse : Response
        beforeEach( async() => {
            sinon.stub(User,'findOne').resolves(reqUser as User)
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Deve fazer login com sucesso', async () => {
          chaiResponse = await chai.request(app).post('/login').send(reqUserBody);
            expect(chaiResponse.status).to.equal(200);
            expect(chaiResponse.body).to.have.property('token')
        });
    });
    describe('/POST', () => {
      let chaiResponse: Response;
    
      beforeEach(async () => {
        sinon.stub(User, "findOne").resolves({} as User);
      });
    
      afterEach(() => {
        sinon.restore();
      });
    
      it('Passando um usuário Inválido', async () => {
        chaiResponse = await chai.request(app).post("/login").send(wrongUser);
    
        expect(chaiResponse.status).to.equal(401);
      });
    });
});