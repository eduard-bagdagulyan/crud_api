export async function parseBody(req) {
    return new Promise((resolve, reject) => {
        try {
            let chunks = []

            req.on('data', chunk => {
                chunks.push(chunk)
            })

            req.on('end', () => {
                resolve(JSON.parse(Buffer.concat(chunks).toString()))
            })
        } catch (e) {
            reject(e)
        }
    })
}
