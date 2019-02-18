/* eslint-env mocha */

const repository = require('src/infra/repositories/shop')

describe('Get all shops', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => repository.create({
      name: 'Foot Locker',
      active: true,
      address: 'asd',
      shippingDetails: 'world wide',
      currency: 'EUR',
      rank: 5,
      region: 'Europe',
      country: 'France'
    })).then(() => {
      done()
    })
  })

  describe('GET /shops', () => {
    it('should list the shops', (done) => {
      request.get(`${BASE_URI}/shops`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(1)
          done(err)
        })
    })
  })
})
