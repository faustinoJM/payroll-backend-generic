import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";

@injectable()
class SinglePayrollUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
      ) {}

    async execute(id: string, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }
        
        const payroll = await this.payrollRepository.findById(id, user.company_id);

        if (!payroll) {
          throw new AppError("Payroll doesn't exists")
        }

      return payroll

        

    }
}

export { SinglePayrollUseCase }