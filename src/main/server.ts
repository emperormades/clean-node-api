import { MongoHelper } from '../infrastructure/db/mongodb/helpers'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port)
  })
  .catch()

