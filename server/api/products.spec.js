/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Product } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Product routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/products/', () => {

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
    })
  })
})
