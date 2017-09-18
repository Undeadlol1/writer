import { mustLogin } from 'server/services/permissions'
import { Characters } from 'server/data/models'
import express from 'express'
import slugify from 'slug'

// routes
const router = express.Router()
const limit = 12

router

  // get all character for index page
  .get('/:page?', async (req, res) => {
    try {
      const page = req.params.page
      const offset = page ? limit * (page -1) : 0
      const totalCharacters = await Characters.count()
      const totalPages = Math.ceil(totalCharacters / limit)
      const character = await Characters.findAll({
        limit,
        offset,
        order: 'rand()',
      })
      res.json({ character, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single character by slug or name
  .get('/character/:slug?', async ({params, query}, res) => {
    try {
      const slug = params.slug
      const name = query.name
      const character = await Characters.findOne({
        where: {
          $or: [{slug}, {name}]
        }
      })
      res.json(character)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // search for character
  .get('/search/:name/:page?', async (req, res) => {
    try {
      const { page, name } = req.params
      if (!name) return res.boom.badRequest('invalid query')
      const offset = page ? limit * (page -1) : 0
      const where = {
                      name: { $like: '%' + name + '%' }
                    }
      const totalCharacters = await Characters.count({ where })
      const totalPages = Math.round(totalCharacters / limit)
      const character = await Characters.findAll({
        limit,
        offset,
        where,
      }) || []
      res.json({ character, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // create character
  .post('/', mustLogin, async ({user, body}, res) => {
    try {
      const UserId = user.id
      const character = await Characters.create({ UserId, ...body })
      res.json(character)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

export default router