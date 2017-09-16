import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import users from 'server/data/fixtures/users'
import { Projects, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        projectName = "random name",
        slug = slugify('projectName')

export default describe('/projectsApis API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    after(function() {
        ProjectsApi.destroy({where: { name: projectsProjectsApi }})
    })

    // it('POST projectsApi', async function() {
    //     const agent = await loginUser(username, password)
    //     await agent.post('/api/projectsApis')
    //         .send({ name: projectsProjectsApi })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .then(function(res) {
    //             return res.body.slug.should.be.equal(slug)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //             throw new Error(error)
    //         })
    // })

    // it('GET projectsApis', function(done) {
    //     request(server)
    //         .get('/api/projectsApis')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.projectsApis.should.be.a('array')
    //             done()
    //         });
    // })

    // it('GET single projectsApi', function(done) {
    //     user
    //         .get('/api/projectsApis/projectsApi/' + slug )
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.name.should.be.equal(projectsProjectsApi)
    //             done()
    //         });
    // })

    // it('GET /search projectsApis', function(done) {
    //     user
    //         .get('/api/projectsApis/search/' + 'something' )
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.projectsApis.should.be.a('array')
    //             done()
    //         });
    // })
    // // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    // it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
    //     user
    //         .post('/api/projectsApis')
    //         .send({ name: projectsProjectsApi })
    //         .expect(401, done)
    // })

})