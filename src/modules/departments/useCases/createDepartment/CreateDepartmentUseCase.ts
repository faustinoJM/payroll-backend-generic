import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import ICreateDepartmentDTO from "../../dtos/ICreateDepartmentDTO";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";


// interface IRequest {
//     name: string;
//     username: string;
//     password: string;
//     email: string;
//     driver_licence: string;
// }

@injectable()
class CreateDepartmentUseCase {

    constructor(@inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        ) {}

    async execute({ name, user_id }: ICreateDepartmentDTO) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new AppError("User Auth doesn't Exists")
        }
        
        const departmentAlreadyExists = await this.departmentsRepository.findByName(name, user.company_id);

        if(departmentAlreadyExists) {
            throw new AppError("Department Already Exists");
        }
        await this.departmentsRepository.create({ name, company_id: user.company_id });

    }
}

export { CreateDepartmentUseCase }