const express = require('express')
const app = express()
const { sequelize, User } = require('./models')

app.use(express.json())

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
    const user = await User.findOne({ where: { id } })
    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err.message)
  }
})

app.listen({ port: 5000 }, async () => {
  console.log('server up on http://localhost:5000')

  await sequelize.authenticate()

  console.log('Database synced')
})
