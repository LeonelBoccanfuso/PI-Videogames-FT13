const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });

    describe('release date', () => {
      it('should throw an error if date is not a date', (done) => {
        Videogame.create({ released: undefined })
          .then(() => done(new Error('It requires a valid date')))
          .catch(() => done());
      });
      it('should work when its a valid date', () => {
        Videogame.create({ released: '04/02/2022' })
        .catch(() => done());
      });
    });

  });
});
