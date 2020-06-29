const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes/routes')
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info('connecting to', config.DB_URL)

mongoose
    .connect(config.DB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.info('error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.json())

routes(app)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})