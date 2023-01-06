import { UsersService } from './users.service'
import { APICommonResponse } from '../common/interfaces/api-common-response'
import { User } from '../common/interfaces/user'
import { HttpStatus } from '../common/enums/http-status.enum'
import * as uuid from 'uuid'

export class UsersController {
    private usersService: UsersService

    constructor() {
        this.usersService = new UsersService()
    }

    async getUsers(): Promise<APICommonResponse<User[]>> {
        let result: APICommonResponse<User[]>

        const users = await this.usersService.getUsers()

        result = {
            status: HttpStatus.OK,
            data: users,
            error: null,
        }

        return result
    }

    async getUserById(id): Promise<APICommonResponse<User>> {
        let result: APICommonResponse<User>

        if (!uuid.validate(id)) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                data: null,
                error: `property 'userId' must be of type uuid, received ${typeof id}`,
            }
        } else {
            const user = await this.usersService.getUserById(id)

            if (user !== undefined) {
                result = {
                    status: HttpStatus.OK,
                    data: user,
                    error: null,
                }
            } else {
                result = {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    error: 'user not found',
                }
            }
        }

        return result
    }

    async createNewUser(body) {
        let result: APICommonResponse<User>

        if (
            !body?.username ||
            !body?.age ||
            !Number.isInteger(body?.age) ||
            !body?.hobbies.length
        ) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                data: null,
                error: 'wrong params supplied',
            }
        } else {
            const user = await this.usersService.createNewUser(body)

            result = {
                status: HttpStatus.OK,
                data: user,
                error: null,
            }
        }

        return result
    }

    async updateUser(id, body) {
        let result: APICommonResponse<User>

        if (!uuid.validate(id)) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                data: null,
                error: `property 'userId' must be of type uuid, received ${typeof id}`,
            }
        } else {
            const updatedUser = await this.usersService.updateUser(id, body)

            result = {
                status: HttpStatus.OK,
                data: updatedUser,
                error: null,
            }
        }

        return result
    }

    async deleteUser(id) {
        let result: APICommonResponse<{ deleted: boolean }>

        if (!id || !uuid.validate(id)) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                data: null,
                error: 'wrong params supplied',
            }
        } else {
            const isDeleted = await this.usersService.deleteUser(id)

            result = {
                status: HttpStatus.OK,
                data: isDeleted,
                error: null,
            }
        }

        return result
    }
}
