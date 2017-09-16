import { mustLogin } from 'server/services/permissions'
import { Projects } from 'server/data/models'
import express from 'express'
import slugify from 'slug'

// routes
const router = express.Router()
const limit = 12

router

  // get all projects for index page
  .get('/:UserId/:page?', async (req, res) => { // TODO make sure pagination works right
    try {
      const { page, UserId } = req.params
      const offset = page ? limit * (page -1) : 0
      const totalProjectss = await Projects.count()
      const totalPages = Math.ceil(totalProjectss / limit)
      const projects = await Projects.findAll({
        where: {UserId},
        limit,
        offset,
        order: 'rand()',
      })
      res.json({ projects, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single project by slug or title
  .get('/project/:UserId/:slug?', async ({params, query}, res) => {
    try {
      const {slug, UserId} = params
      const title = query.title
      const project = await Projects.findOne({
        where: {
          UserId,
          $or: [{slug}, {title}]
        }
      })
      res.json(project)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })


  // create project
  .post('/', mustLogin, async ({user, body}, res) => {
    try {
      const UserId = user.id
      const title = body.title
      const slug = slugify(title)
      const project = await Projects.create({ ...body, UserId, title, slug }) // TODO move this in model definition?
      res.json(project)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // // search for project
  // .get('/search/:name/:page?', async (req, res) => { // TODO make sure pagination works right
  //   try {
  //     const { page, name } = req.params
  //     if (!name) return res.boom.badRequest('invalid query')
  //     const offset = page ? limit * (page -1) : 0
  //     const where = {
  //                     name: { $like: '%' + name + '%' }
  //                   }
  //     const totalProjectss = await Projects.count({ where })
  //     const totalPages = Math.round(totalProjectss / limit)
  //     const projects = await Projects.findAll({
  //       limit,
  //       offset,
  //       where,
  //     }) || []
  //     res.json({ projects, totalPages })
  //   }
  //   catch (error) {
  //     console.log(error);
  //     res.status(500).end(error)
  //   }
  // })
export default router