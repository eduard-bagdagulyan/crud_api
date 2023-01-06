import { User } from '../common/interfaces/user'
import { users } from '../common/mocks/users.mock'
import * as uuid from 'uuid'
import { HttpStatus } from '../common/enums/http-status.enum'

export class UsersService {
    async getUsers(): Promise<User[]> {
        return users
    }

    async getUserById(id): Promise<User> {
        return users.find(user => user.id === id)
    }

    async createNewUser(body: User): Promise<User> {
        const id = uuid.v4()

        const user = new User(id, body.username, body.age, body.hobbies)
        users.push(user)

        return user
    }

    async updateUser(id, body) {
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

        return newUser
    }

    async deleteUser(id): Promise<{ deleted: boolean }> {
        users.splice(
            users.findIndex(user => user.id === id),
            1
        )

        return { deleted: true }
    }
}
