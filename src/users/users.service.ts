import { IUser } from '../common/interfaces/user'
import { users } from '../common/mocks/users.mock'

export class UsersService {
    async getUsers(): Promise<IUser[]> {
        return users
    }

    async getUserById(id): Promise<IUser> {
        return users.find(user => user.id === id)
    }
}
