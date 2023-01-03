import { UsersService } from './users.service'
import { APICommonResponse } from '../common/interfaces/api-common-response'
import { IUser } from '../common/interfaces/user'
import { HttpStatus } from '../common/enums/http-status.enum'
import * as uuid from 'uuid'
import { ResponseMessages } from '../common/messages/response-messages.enum'

export class UsersController {
    private usersService: UsersService

    constructor() {
        this.usersService = new UsersService()
    }

    async getUsers(): Promise<APICommonResponse<IUser[]>> {
        let result: APICommonResponse<IUser[]>

        const users = await this.usersService.getUsers()

        result = {
            status: HttpStatus.OK,
            data: users,
            error: null,
        }

        return result
    }

    async getUserById(
        id
    ): Promise<APICommonResponse<IUser>> {
        let result: APICommonResponse<IUser>

        if (!uuid.validate(id)) {
            throw new Error(
                `property 'userId' must be of type uuid, received ${typeof id}`
            )
        }

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
                error: ResponseMessages.NOT_FOUND,
            }
        }

        return result
    }
}
