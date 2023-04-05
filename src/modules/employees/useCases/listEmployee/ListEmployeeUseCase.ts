import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";


@injectable()
class ListEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        ) {}
       
    async execute(user_id: string) {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
          throw new  AppError("User doesn't Exists")
        }
     
        const users = await this.employeeRepository.list(user.company_id);

        return users;

    }
}

export { ListEmployeeUseCase }

