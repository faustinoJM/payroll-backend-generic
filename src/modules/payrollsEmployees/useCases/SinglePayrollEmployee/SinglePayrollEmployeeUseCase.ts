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
  payroll_id?: string;
  employee_id?: string;
  employee_number?: number;
  employee_name?: string;
  dependents?: number;
  position_name?: string;
  department_name?: string;
  bank_name?: string;
  bank_account?: number;
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
  total_inss?: string
  total_income?: string;
  syndicate_employee?: string;

}



@injectable()
class SinglePayrollEmployeeUseCase {

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

        const payroll = await this.payrollEmployeeRepository.findById(id, user.company_id);

        if (!payroll) {
          throw new AppError("Payroll doesn't exists")
        }

        const employee = await this.employeeRepository.findById(payroll.employee_id, user.company_id)
      
        if(employee) {
          const positionName = await this.positionsRepository.findById(employee.position_id)
          const departmentName = await this.departmentsRepository.findById(employee.department_id)

          let employeePayroll: ICreatePayrollDTO2 = {
            id: payroll.id,
            payroll_id: payroll.payroll_id,
            employee_id: employee.id,
            employee_number: employee.employee_number,
            employee_name: employee.name,
            dependents: employee.dependents,
            position_name: positionName?.name,
            department_name: departmentName?.name,
            bank_name: employee.bank_name,
            bank_account: employee.bank_account,
            nib: employee.nib,
            nuit: employee.nuit,
            social_security: employee.social_security,
            vacation: employee.vacation,
            salary_base: payroll.salary_base, 
            salary_liquid: payroll.salary_liquid,
            month: payroll.month,
            year: payroll.year,
            total_income: payroll.total_income ,
            overtime50: payroll.overtime50,
            totalOvertime50: payroll.overtime50 * (+payroll.base_hour) * 1.5,
            overtime100: payroll.overtime100,
            totalOvertime100: payroll.overtime100 * (+payroll.base_hour) * 2,
            total_overtime: payroll.total_overtime,
            month_total_workdays: +payroll.month_total_workdays,
            day_total_workhours: +payroll.day_total_workhours,
            base_day: payroll.base_day,
            base_hour: payroll.base_hour,
            absences: payroll.absences,
            total_absences: payroll.total_absences as any,
            cash_advances: payroll.cash_advances,
            subsidy: payroll.subsidy,
            bonus: payroll.bonus,
            backpay: payroll.backpay,
            irps: payroll.irps,
            inss_employee: payroll.inss_employee,
            inss_company: payroll.inss_company,
            total_inss: ((+payroll.inss_employee) + (+payroll.inss_company)) as any,
            syndicate_employee: payroll.syndicate_employee,
          };
          
        return employeePayroll;

      } else {
        let employeePayroll: ICreatePayrollDTO2 = {
          id: payroll.id,
          payroll_id: payroll.payroll_id,
          employee_id: null as any,
          employee_number: null as any,
          employee_name: payroll.employee_name,
          dependents: payroll.dependents,
          position_name: payroll.position_name,
          department_name: payroll.department_name,
          nib: payroll.nib,
          nuit: payroll.nuit,
          social_security: payroll.nuit,
          vacation: 0,
          salary_base: payroll.salary_base, 
          salary_liquid: payroll.salary_liquid,
          month: payroll.month,
          year: payroll.year,
          total_income: payroll.total_income ,
          overtime50: payroll.overtime50,
          totalOvertime50: payroll.overtime50 * (+payroll.base_hour) * 1.5,
          overtime100: payroll.overtime100,
          totalOvertime100: payroll.overtime100 * (+payroll.base_hour) * 2,
          total_overtime: payroll.total_overtime,
          month_total_workdays: +payroll.month_total_workdays,
          day_total_workhours: +payroll.day_total_workhours,
          base_day: payroll.base_day,
          base_hour: payroll.base_hour,
          absences: payroll.absences,
          total_absences: payroll.total_absences as any,
          cash_advances: payroll.cash_advances,
          subsidy: payroll.subsidy,
          bonus: payroll.bonus,
          backpay: payroll.backpay,
          irps: payroll.irps,
          inss_employee: payroll.inss_employee,
          inss_company: payroll.inss_company,
          total_inss: payroll.total_inss,
          syndicate_employee: payroll.syndicate_employee,
          
        };
      return employeePayroll;

      }

    }
}

export { SinglePayrollEmployeeUseCase }
