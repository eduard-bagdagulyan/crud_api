import { AppFactory } from './app'
import process from 'process'
import http from 'http'
import cluster from 'cluster'
import { parseBody, setupServers } from './common/utils/utils'

const args = process.argv.slice(2)
const APP_PORT = process.env.APP_PORT || 8999

if (args.includes('--multi') && cluster.isMaster) {
    const servers = setupServers(APP_PORT)
    let current = 0

    http.createServer(async (req, res) => {
        current === servers.length - 1 ? (current = 0) : current++
        const { method, url } = req
        const body = await parseBody(req)

        const result = await fetch(`${servers[current]}${url}`, {
            method,
            body: body ? JSON.stringify(body) : null,
        }).then(response => response.json())

        res.writeHead(result?.status || 200, {
            'Content-Type': 'application/json',
        })
        res.write(JSON.stringify(result))
        res.end()
    })
        .listen(APP_PORT)
        .on('listening', () => {
            console.log(
                `Load balancer starts listening on http://localhost:${APP_PORT}`
            )
        })
} else {
    bootstrap(APP_PORT)
}

function bootstrap(port) {
    return new AppFactory()
        .create()
        .listen(port)
        .on('listening', () => {
            console.log(
                `The server starts listening on http://localhost:${port}`
            )
        })
}
