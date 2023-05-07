import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import { IPayrollEmployeeRepository } from "../../../payrollsEmployees/repositories/IPayrollEmployeeRepository";

@injectable()
class ListAllPayrollUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("PayrollEmployeeRepository")
        private payrollEmployeeRepository: IPayrollEmployeeRepository,
    
        ) {}

    async execute(year: number, month: string, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const payrolls = await this.payrollRepository.list(user.company_id)
        const payrollEmployees = await this.payrollEmployeeRepository.list(user.company_id)



        payrolls.map(payroll => {
          payroll.total_employee = (payrollEmployees.filter(payrollEmployee => 
            payrollEmployee.payroll_id === payroll.id)).length
        })

        return payrolls;

    }
}
export { ListAllPayrollUseCase }

