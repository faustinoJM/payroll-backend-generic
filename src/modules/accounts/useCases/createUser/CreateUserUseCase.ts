import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import ICompanyRepository from "../../../company/repositories/ICompanyRepository";


// interface IRequest {
//     name: string;
//     username: string;
//     password: string;
//     email: string;
//     driver_licence: string;
// }

@injectable()
class CreateUserUseCase {

    constructor(@inject("UsersRepository")
        private userRepository: IUsersRepository,
        
        @inject("CompanyRepository")
        private companyRepository: ICompanyRepository
        ) {}

    async execute({ name, email, password, company_id }: ICreateUserDTO) {
        
        const UserAlreadyExists = await this.userRepository.findByEmail(email);

        const companyExists = await this.companyRepository.findById(company_id as any)

        if (!companyExists) {
          throw new AppError("Company Doesnt Exists");
        }

        if(UserAlreadyExists) {
            throw new AppError("User Already Exists");
        }

        const passwordCHash = await hash(password, 8);
        await this.userRepository.create({ name, password: passwordCHash, email, company_id});

    }
}

export { CreateUserUseCase }