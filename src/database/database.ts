import fs from 'fs/promises'
import { User } from '../common/interfaces/user'
import process from 'process'
import path from 'path'

export class Database {
    private readonly dbPath: string

    constructor() {
        this.dbPath = path.resolve(process.cwd(), 'src/database/users.json')
    }

    async getRecords() {
        const result: User[] = await fs
            .readFile(this.dbPath, { encoding: 'utf-8' })
            .then(data => JSON.parse(data))
            .then(data => Array.from(data))

        return result
    }

    async saveRecords(data) {
        await fs.writeFile(this.dbPath, JSON.stringify(data), {
            encoding: 'utf-8',
        })
    }
}
