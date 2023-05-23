import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IPayrollEmployeeRepository } from "../../repositories/IPayrollEmployeeRepository";



@injectable()
class DeletePayrollEmployeeUseCase {

    constructor(@inject("PayrollEmployeeRepository")
        private payrollRepository: IPayrollEmployeeRepository,
    
        @inject("UsersRepository")
        private userRepository: IUsersRepository,) {}

    async execute(payroll_id: string, year: number, month: string, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const allPayrolls = await this.payrollRepository.findAllByPayroll_Id(payroll_id, user.company_id);
        console.log(allPayrolls)
        if (allPayrolls?.length! <= 0) {
          throw new AppError("Payroll doesn't exists")
        }

        await this.payrollRepository.deleteByPayroll_Id(payroll_id, user.company_id)

        return allPayrolls;
    }
}

export { DeletePayrollEmployeeUseCase }