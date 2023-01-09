import os from 'os'
import cluster from 'cluster'

export async function parseBody(req) {
    return new Promise((resolve, reject) => {
        try {
            let chunks = []

            req.on('data', chunk => {
                chunks.push(chunk)
            })

            req.on('end', () => {
                if (chunks.length) {
                    resolve(JSON.parse(Buffer.concat(chunks).toString()))
                } else {
                    resolve(null)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function setupServers(port) {
    const servers = []

    for (let i = 1; i <= os.cpus().length; i++) {
        cluster.fork({ APP_PORT: port + i })
        servers.push(`http://localhost:${port + i}`)
    }

    return servers
}
