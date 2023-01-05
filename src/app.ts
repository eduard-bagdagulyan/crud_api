import * as http from 'http'
import * as url from 'url'
import { UsersController } from './users/users.controller'
import { HttpStatus } from './common/enums/http-status.enum'
import { ResponseMessages } from './common/messages/response-messages.enum'
import { parseBody } from './common/utils/utils'

export class AppFactory {
    private usersController: UsersController
    private server: http.Server

    constructor() {
        this.usersController = new UsersController()
    }

    create() {
        this.server = http.createServer(async (req, res) => {
            const result = await this.handleRequest(req)

            res.writeHead(result?.status || 200, {
                'Content-Type': 'application/json',
            })
            res.write(JSON.stringify(result))
            res.end()
        })

        return this.server
    }

    async handleRequest(req) {
        try {
            const { query, pathname } = url.parse(req.url, true)

            if (pathname === '/api/users') {
                switch (req.method) {
                    case 'GET':
                        if (query?.userId === undefined) {
                            return this.usersController.getUsers()
                        } else {
                            return this.usersController.getUserById(
                                query.userId
                            )
                        }
                    case 'POST':
                        const body = await parseBody(req)
                        return this.usersController.createNewUser(body)
                    default:
                        return {
                            status: HttpStatus.NOT_FOUND,
                            data: null,
                            error: ResponseMessages.NOT_FOUND,
                        }
                }
            } else {
                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    error: ResponseMessages.NOT_FOUND,
                }
            }
        } catch (e) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: e?.message || ResponseMessages.INTERNAL_ERROR,
                data: null,
            }
        }
    }
}
