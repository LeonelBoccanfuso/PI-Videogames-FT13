/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const should = require('chai').should();
const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));
//   describe('GET /videogames', () => {
//     it('should get 200', () =>
//       agent.get('/videogames').expect(200)
//     );
//   });
// });

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /videogame/:id', () => {
    it('should get 200', () =>
      agent.get('/videogame/1').expect(200),
    );
    it('should get an object', () =>
      agent.get('/videogame/1').then((res) => {
        expect(res.body).to.be.a('object')
      })
    );
    it('should get genres', () =>
      agent.get('/videogame/100').then((res) => {
        expect(res.body).to.have.property('genres').with.lengthOf(2)
      })
    );
    it('should get genres', () =>
      agent.get('/videogame/342').then((res) => {
        expect(res.body).to.have.property('genres').with.lengthOf(5)
      })
    );
    it('should have the propieties', () =>
      agent.get('/videogame/1').then((res) => {
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('released')
        expect(res.body).to.have.property('description')
        expect(res.body).to.have.property('rating')
        expect(res.body).to.have.property('platforms')
      })
    );
  });
});


