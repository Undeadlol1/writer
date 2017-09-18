import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import users from 'server/data/fixtures/users'
import { CharactersApi, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        charactersCharactersApi = "random name",
        slug = slugify(charactersCharactersApi)

export default describe('/charactersApis API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    after(function() {
        CharactersApi.destroy({where: { name: charactersCharactersApi }})
    })

    it('POST charactersApi', async function() {
        const agent = await loginUser(username, password)
        await agent.post('/api/charactersApis')
            .send({ name: charactersCharactersApi })
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

    it('GET charactersApis', function(done) {
        request(server)
            .get('/api/charactersApis')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.charactersApis.should.be.a('array')
                done()
            });
    })

    it('GET single charactersApi', function(done) {
        user
            .get('/api/charactersApis/charactersApi/' + slug )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.name.should.be.equal(charactersCharactersApi)
                done()
            });
    })

    it('GET /search charactersApis', function(done) {
        user
            .get('/api/charactersApis/search/' + 'something' )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.charactersApis.should.be.a('array')
                done()
            });
    })
    // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
        user
            .post('/api/charactersApis')
            .send({ name: charactersCharactersApi })
            .expect(401, done)
    })

})