import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import users from 'server/data/fixtures/users'
import { ScenesApi, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        scenesScenesApi = "random name",
        slug = slugify(scenesScenesApi)

export default describe('/scenesApis API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    after(function() {
        ScenesApi.destroy({where: { name: scenesScenesApi }})
    })

    it('POST scenesApi', async function() {
        const agent = await loginUser(username, password)
        await agent.post('/api/scenesApis')
            .send({ name: scenesScenesApi })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function(res) {
                return res.body.slug.should.be.equal(slug)
            })
            .catch(error => {
                console.error(error)
                throw new Error(error)
            })
    })

    it('GET scenesApis', function(done) {
        request(server)
            .get('/api/scenesApis')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.scenesApis.should.be.a('array')
                done()
            });
    })

    it('GET single scenesApi', function(done) {
        user
            .get('/api/scenesApis/scenesApi/' + slug )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.name.should.be.equal(scenesScenesApi)
                done()
            });
    })

    it('GET /search scenesApis', function(done) {
        user
            .get('/api/scenesApis/search/' + 'something' )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.scenesApis.should.be.a('array')
                done()
            });
    })
    // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
        user
            .post('/api/scenesApis')
            .send({ name: scenesScenesApi })
            .expect(401, done)
    })

})