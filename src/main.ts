import { AppFactory } from './app'
import * as dotenv from 'dotenv'
import * as process from 'process'

dotenv.config()

function bootstrap() {
    const app = new AppFactory().create()
    const APP_PORT = process.env.APP_PORT || 8999

    app.listen(APP_PORT)
    console.log(`The server starts listening on http://localhost:${APP_PORT}`)
}

bootstrap()
