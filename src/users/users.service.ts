import { User } from '../common/interfaces/user'
import * as uuid from 'uuid'
import { HttpStatus } from '../common/enums/http-status.enum'
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

    async updateUser(id, body) {
        const users = await this.db.getRecords()
        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            return {
                status: HttpStatus.NOT_FOUND,
                data: null,
                error: 'user not found',
            }
        }

        const newUser = { ...users[userIndex], ...body }
        users[userIndex] = newUser
        await this.db.saveRecords(users)

        return newUser
    }

    async deleteUser(id): Promise<{ deleted: boolean }> {
        const users = await this.db.getRecords()
        users.splice(
            users.findIndex(user => user.id === id),
            1
        )
        await this.db.saveRecords(users)

        return { deleted: true }
    }
}
