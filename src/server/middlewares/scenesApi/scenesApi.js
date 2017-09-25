import { mustLogin } from 'server/services/permissions'
import { Scenes } from 'server/data/models'
import express from 'express'
import slugify from 'slug'

// routes
const router = express.Router()
const limit = 12

router

  // get all scenes for index page
  .get('/:page?', async (req, res) => {
    try {
      const page = req.params.page
      const offset = page ? limit * (page -1) : 0
      const totalScenes = await Scenes.count()
      const totalPages = Math.ceil(totalScenes / limit)
      const scenes = await Scenes.findAll({
        limit,
        offset,
        order: 'rand()',
      })
      res.json({ scenes, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single scene by slug or name
  .get('/scene/:slug?', async ({params, query}, res) => {
    try {
      const slug = params.slug
      const name = query.name
      const scene = await Scenes.findOne({
        where: {
          $or: [{slug}, {name}]
        }
      })
      res.json(scene)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // search for scene
  .get('/search/:name/:page?', async (req, res) => {
    try {
      const { page, name } = req.params
      if (!name) return res.boom.badRequest('invalid query')
      const offset = page ? limit * (page -1) : 0
      const where = {
                      name: { $like: '%' + name + '%' }
                    }
      const totalScenes = await Scenes.count({ where })
      const totalPages = Math.round(totalScenes / limit)
      const scenes = await Scenes.findAll({
        limit,
        offset,
        where,
      }) || []
      res.json({ scenes, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // create scene
  .post('/', mustLogin, async ({user, body}, res) => {
    try {
      const UserId = user.id
      const scene = await Scenes.create({ ...body, UserId })
      res.json(scene)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })


  // update scene
  .put('/:SceneId', mustLogin, async ({params, user, body}, res) => {
    try {
      const UserId = user.id
      const SceneId = params.SceneId
      const scene = await Scenes.findById(SceneId)

      if (UserId != scene.UserId) return res.status(401).end()

      res.json(await scene.update(body))
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

export default router