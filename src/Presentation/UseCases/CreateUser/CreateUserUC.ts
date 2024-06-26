import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists !== null) {
            throw new Error('O Usuário já existe')
        } 
        const NewUser: User = new User(data)
        console.log('Cadastrando novo Usuário...')
        await this.usersRepository.save(NewUser)
    }
}