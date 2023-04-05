import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";



@injectable()
class DeleteEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,) {}

    async execute(id: string, user_id: string) {
        const user = await this.userRepository.findById(user_id)

      if (!user) {
          throw new  AppError("User doesn't Exists")
      }
        const employee = await this.employeeRepository.findById(id, user.company_id);

        if (!employee) {
          throw new AppError("Employee doesn't exists")
        }

        await this.employeeRepository.delete(id)

        return employee;
    }
}

export { DeleteEmployeeUseCase }