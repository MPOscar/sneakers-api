/* eslint-env mocha */

describe('Routes: POST Brands', () => {
  const BASE_URI = `/api/${config.version}`

  const signIn = app.resolve('jwt').signin()
  let token = signIn({
    id: 'd6ac077f-eac2-43f8-840b-6d43317c6a56',
    email: 'testdev1@gmail.com',
    roleId: 0
  })

  describe('Should post brands', () => {
    it('should return create brands', (done) => {
      request.post(`${BASE_URI}/brands`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Fila',
          description: 'This is a wonderful brand',
          imgUrl: 'http://moresneakers/url'
        })
        .expect(200)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should validate brand object is not complete', (done) => {
      request.post(`${BASE_URI}/brands`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'This is a wonderful brand',
          imgUrl: 'http://moresneakers/url'
        })
        .expect(400)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })
  })
})
