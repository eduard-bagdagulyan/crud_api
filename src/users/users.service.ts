import { User } from '../common/interfaces/user'
import * as uuid from 'uuid'
import { Database } from '../database/database'

export class UsersService {
    private readonly db: Database

    constructor() {
        this.db = new Database()
    }

    async getUsers(): Promise<User[]> {
        return this.db.getRecords()
    }

    async getUserById(id): Promise<User> {
        const users = await this.db.getRecords()
        return users.find(user => user.id === id)
    }

    async createNewUser(body: User): Promise<User> {
        const id = uuid.v4()
        const users = await this.db.getRecords()
        const user = new User(id, body.username, body.age, body.hobbies)
        users.push(user)

        await this.db.saveRecords(users)

        return user
    }

    async updateUser(id, body): Promise<User | null> {
        const users = await this.db.getRecords()
        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            return null
        }

        const newUser = { ...users[userIndex], ...body }
        users[userIndex] = newUser
        await this.db.saveRecords(users)

        return newUser
    }

    async deleteUser(id): Promise<{ deleted: boolean }> {
        const users = await this.db.getRecords()
        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            return null
        }

        users.splice(userIndex, 1)
        await this.db.saveRecords(users)

        return { deleted: true }
    }
}
