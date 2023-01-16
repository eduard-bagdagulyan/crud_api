export class User {
    id: string
    username: string
    age: number
    hobbies: Array<string>

    constructor(id, username, age, hobbies) {
        this.id = id
        this.username = username
        this.age = age
        this.hobbies = hobbies
    }
}
