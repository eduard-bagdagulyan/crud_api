import { User } from '../common/interfaces/user'
import { users } from '../common/mocks/users.mock'

export class UsersService {
    async getUsers(): Promise<User[]> {
        return users
    }

    async getUserById(id): Promise<User> {
        return users.find(user => user.id === id)
    }

    async createNewUser(body: User): Promise<User> {
        const user = new User(body.id, body.username, body.age, body.hobbies)
        users.push(user)

        return user
    }
}
