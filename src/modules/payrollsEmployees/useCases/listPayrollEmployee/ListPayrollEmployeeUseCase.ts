import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IPayrollRepository } from "../../../payrolls/repositories/IPayrollRepository";
import { IPayrollEmployeeRepository } from "../../repositories/IPayrollEmployeeRepository";

interface ICreatePayrollDTO2 {
  id?: string;
  employee_id?: string;
  employee_number?: number;
  employee_name?: string;
  dependents?: number;
  position_name?: string;
  departament_name?: string;
  nib?: number,
  nuit?: number,
  social_security?: number,
  vacation?: number,
  salary_base?: string;
  salary_liquid?: string;
  month?: string;
  year?: number;
  overtime50?: number;
  overtime100?: number;
  totalOvertime50?: number;
  totalOvertime100?: number;
  total_overtime?: string;
  month_total_workdays?: number;
  day_total_workhours?: number;
  base_day?: string;
  base_hour?: string;
  absences?: number;
  total_absences?: string;
  cash_advances?: string;
  backpay?: string;
  subsidy?: string;
  bonus?: string;
  irps?:  string;
  inss?: string;
  inss_employee?: string;
  inss_company?: string;
  total_income?: string;
  syndicate_employee?: string;

}



@injectable()
class ListPayrollEmployeeUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,

        @inject("PayrollEmployeeRepository")
        private payrollEmployeeRepository: IPayrollEmployeeRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
      
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("PositionsRepository")
        private positionsRepository: IPositionsRepository,

        @inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository) {}

    async execute(id: string, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        // const payroll = await this.payrollRepository.findById(id, user.company_id);

        // if (!payroll) {
        //   throw new AppError("Payroll doesn't exists")
        // }
        
        // const singlePayrolls = await this.payrollEmployeeRepository.findAllByPayroll_Id(payroll.id, user.company_id);
        const singlePayrolls = await this.payrollEmployeeRepository.list(user.company_id);


        return singlePayrolls;

    }
}

export { ListPayrollEmployeeUseCase }
