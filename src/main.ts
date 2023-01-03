import { AppFactory } from './app'

function bootstrap() {
    const app = new AppFactory().create()

    app.listen(8999) // TODO change to env var
    console.log('Application starts listening on PORT') // TODO change to env var
}

bootstrap()
