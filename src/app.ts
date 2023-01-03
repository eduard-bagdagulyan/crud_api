import * as http from 'http'
import * as url from 'url'
import { UsersController } from './users/users.controller'
import { HttpStatus } from './common/enums/http-status.enum'
import { ResponseMessages } from './common/messages/response-messages.enum'

export class AppFactory {
    private usersController: UsersController
    private server: http.Server

    constructor() {
        this.usersController = new UsersController()
    }

    create() {
        this.server = http.createServer(
            async (req, res) => {
                const result = await this.handleRequest(req)

                res.writeHead(result?.status || 200, {
                    'Content-Type': 'application/json',
                })
                res.write(JSON.stringify(result))
                res.end()
            }
        )

        return this.server
    }

    handleRequest(req) {
        try {
            const { query, pathname } = url.parse(
                req.url,
                true
            )

            if (
                pathname === '/users' &&
                req.method === 'GET' &&
                query?.userId === undefined
            ) {
                return this.usersController.getUsers()
            } else if (
                pathname === '/users' &&
                req.method === 'GET' &&
                query?.userId
            ) {
                return this.usersController.getUserById(
                    query.userId
                )
            }
        } catch (e) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error:
                    e?.message ||
                    ResponseMessages.INTERNAL_ERROR,
                data: null,
            }
        }
    }
}
