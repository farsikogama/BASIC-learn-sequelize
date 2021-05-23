const express = require('express')
const app = express()
const { sequelize, User, Post } = require('./models')

app.use(express.json())

// user
app.post('/users', async (req, res) => {
  const { name, email, role } = req.body

  try {
    const user = await User.create({ name, email, role })
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err.message)
  }
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: { id },
      include: [{ model: Post, as: 'post' }],
    })
    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err.message)
  }
})

// post
app.post('/posts', async (req, res) => {
  const { userUuid, body } = req.body

  try {
    const user = await User.findOne({ where: { uuid: userUuid } })

    const post = await Post.create({ body, userId: user.id })

    return res.json(post)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err)
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [{ model: User, as: 'user' }] }) //include berfungsi untuk join table User dan Post. kalau tidak diberi include maka akan menarik semua Post yang ada tanpa join table. // as user berfungsi untuk mengganti nama kolom di response menjadi 'user'

    return res.json(posts)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen({ port: 5000 }, async () => {
  console.log('server up on http://localhost:5000')

  await sequelize.authenticate()

  console.log('Database synced')
})
