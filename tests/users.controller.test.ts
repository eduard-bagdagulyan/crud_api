import { UsersController } from '../src/users/users.controller'
import { HttpStatus } from '../src/common/enums/http-status.enum'

const usersController = new UsersController()

jest.mock('uuid', () => {
    return {
        v4: jest.fn(() => 1),
        validate: jest.fn(() => true),
    }
})

describe('users_controller', () => {
    it('GET/users: Should return an empty array', async () => {
        expect(await usersController.getUsers()).toStrictEqual({
            status: HttpStatus.OK,
            data: [],
            error: null,
        })
    })

    it('POST/user: created user should be returned', async () => {
        expect(
            await usersController.createNewUser({
                username: 'Test',
                age: 65,
                hobbies: ['Football'],
            })
        ).toEqual({
            status: HttpStatus.CREATED,
            data: { username: 'Test', age: 65, hobbies: ['Football'], id: 1 },
            error: null,
        })
    })

    it('GET/user?userId: user with matching id should be returned', async () => {
        expect(await usersController.getUserById(1)).toEqual({
            status: HttpStatus.OK,
            data: { username: 'Test', age: 65, hobbies: ['Football'], id: 1 },
            error: null,
        })
    })

    it('PUT/user?userId: updated user should be returned', async () => {
        expect(
            await usersController.updateUser(1, { username: 'Test', age: 16 })
        ).toEqual({
            status: HttpStatus.OK,
            data: { username: 'Test', age: 16, hobbies: ['Football'], id: 1 },
            error: null,
        })
    })

    it('DELETE/user?userId: delete confirmation should be deleted', async () => {
        expect(await usersController.deleteUser(1)).toEqual({
            status: HttpStatus.OK,
            data: { deleted: true },
            error: null,
        })
    })

    it('GET/user?userId: no found response should be returned', async () => {
        expect(await usersController.getUserById(1)).toEqual({
            status: HttpStatus.NOT_FOUND,
            data: null,
            error: 'user not found',
        })
    })
})
