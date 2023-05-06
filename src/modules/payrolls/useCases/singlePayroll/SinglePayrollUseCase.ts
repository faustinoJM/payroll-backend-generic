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

      //   const employee = await this.employeeRepository.findById(payroll.employee_id, user.company_id)
      
      //   if(employee) {
      //     const positionName = await this.positionsRepository.findById(employee.position_id)
      //     const departmentName = await this.departmentsRepository.findById(employee.department_id)

      //     let employeePayroll: ICreatePayrollDTO2 = {
      //       id: payroll.id,
      //       employee_id: employee.id,
      //       employee_id: employee.employee_id,
      //       employee_name: employee.name,
      //       dependents: employee.dependents,
      //       position_name: positionName?.name,
      //       departament_name: departmentName?.name,
      //       nib: employee.nib,
      //       nuit: employee.nuit,
      //       social_security: employee.social_security,
      //       vacation: employee.vacation,
      //       salary_base: payroll.salary_base, 
      //       salary_liquid: payroll.salary_liquid,
      //       month: payroll.month,
      //       year: payroll.year,
      //       total_income: payroll.total_income ,
      //       overtime50: payroll.overtime50,
      //       totalOvertime50: payroll.overtime50 * (+payroll.base_hour) * 1.5,
      //       overtime100: payroll.overtime100,
      //       totalOvertime100: payroll.overtime100 * (+payroll.base_hour) * 2,
      //       total_overtime: payroll.total_overtime,
      //       month_total_workdays: payroll.month_total_workdays,
      //       day_total_workhours: payroll.day_total_workhours,
      //       base_day: payroll.base_day,
      //       base_hour: payroll.base_hour,
      //       absences: payroll.absences,
      //       total_absences: payroll.total_absences as any,
      //       cash_advances: payroll.cash_advances,
      //       subsidy: payroll.subsidy,
      //       bonus: payroll.bonus,
      //       backpay: payroll.backpay,
      //       irps: payroll.irps,
      //       inss_employee: payroll.inss_employee,
      //       inss_company: payroll.inss_company,
      //       syndicate_employee: payroll.syndicate_employee,
      //       tabelaSalario: payroll.tabelaSalario,
      //       payrollDemo: payroll.payrollDemo
      //     };
      //   return employeePayroll;

      // } else {
      //   let employeePayroll: ICreatePayrollDTO2 = {
      //     id: payroll.id,
      //     employee_id: null as any,
      //     employee_id: null as any,
      //     employee_name: payroll.employee_name,
      //     dependents: payroll.dependents,
      //     position_name: payroll.position_name,
      //     departament_name: payroll.departament_name,
      //     nib: payroll.nib,
      //     nuit: payroll.nuit,
      //     social_security: payroll.nuit,
      //     vacation: 0,
      //     salary_base: payroll.salary_base, 
      //     salary_liquid: payroll.salary_liquid,
      //     month: payroll.month,
      //     year: payroll.year,
      //     total_income: payroll.total_income ,
      //     overtime50: payroll.overtime50,
      //     totalOvertime50: payroll.overtime50 * (+payroll.base_hour) * 1.5,
      //     overtime100: payroll.overtime100,
      //     totalOvertime100: payroll.overtime100 * (+payroll.base_hour) * 2,
      //     total_overtime: payroll.total_overtime,
      //     month_total_workdays: payroll.month_total_workdays,
      //     day_total_workhours: payroll.day_total_workhours,
      //     base_day: payroll.base_day,
      //     base_hour: payroll.base_hour,
      //     absences: payroll.absences,
      //     total_absences: payroll.total_absences as any,
      //     cash_advances: payroll.cash_advances,
      //     subsidy: payroll.subsidy,
      //     bonus: payroll.bonus,
      //     backpay: payroll.backpay,
      //     irps: payroll.irps,
      //     inss_employee: payroll.inss_employee,
      //     inss_company: payroll.inss_company,
      //     syndicate_employee: payroll.syndicate_employee,
      //     tabelaSalario: payroll.tabelaSalario,
      //     payrollDemo: payroll.payrollDemo
      //   };
      // return employeePayroll;

      // }
        
      return payroll

        

    }
}

export { SinglePayrollUseCase }