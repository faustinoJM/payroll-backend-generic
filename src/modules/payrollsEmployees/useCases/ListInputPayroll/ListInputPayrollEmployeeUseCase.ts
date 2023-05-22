import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IPayrollRepository } from "../../../payrolls/repositories/IPayrollRepository";
import { IPayrollEmployeeRepository } from "../../repositories/IPayrollEmployeeRepository";
import { ICreatePayrollEmployeeDTO } from "../../dtos/ICreatePayrollEmployeeDTO";
import { PayrollEmployee } from "../../infra/typeorm/entities/PayrollEmployee";

export interface ISalario {
  salarioLiquido?: number;
  coeficiente: number;
  limiteNTributavel: number ;
  AResult?: number;
  AxB?: number;
  valorReter?: number;
  impostoPagarIRPS?: number;
}

export interface IPayrollDemo {
  overtime50?: number;
  overtime100?: number;
  month_total_workdays?: number;
  day_total_workhours?: number;
  totalAbsences?: number;
  cash_advances?: number;
  backpay?: number;
  bonus?: number;
  salary_liquid?: number;
  IRPS?: number;
  INSS?: number
}

@injectable()
class ListInputPayrollEmployeeUseCase {

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
        private departmentsRepository: IDepartmentsRepository
        ) {}

    async execute(id: string, year: number, month: string, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const payroll = await this.payrollRepository.findById(id, user.company_id);

        if (!payroll) {
          throw new AppError("Payroll doesn't exists")
        }

        // const payrolls = await this.payrollEmployeeRepository.list(user.company_id)
        const payrolls = await this.payrollEmployeeRepository.findAllByPayroll_Id(payroll.id, user.company_id)
        const employees = await this.employeeRepository.list(user.company_id);
        const positions = await this.positionsRepository.list(user.company_id)
        const departments = await this.departmentsRepository.list(user.company_id) 
        const listEmployeesPayrolls: ICreatePayrollEmployeeDTO[] = [];
        let payrolls2: PayrollEmployee[] = []

        function positionName(positionId: string) {
          return positions.find((position) => position.id === positionId)
        }

        function departmentName(departmentId: string) {
          return departments.find((department) => department.id === departmentId)
        }

        
        if(month && year && payrolls) {
          payrolls2 = payrolls.filter(payroll => payroll.month === month && payroll.year === year)
          // return payrolls2;
        } else if(!month && year && payrolls) {
          payrolls2 = payrolls.filter(payroll => payroll.year === year)
          // return payrolls2
        } else if(month && !year && payrolls) {
          payrolls2 = payrolls.filter(payroll => payroll.month === month)
          // return payrolls2
        } else {
          payrolls2 = payrolls
        }

        payrolls2.map((payroll) =>{
          const employee =  employees.find(employee => employee.id === payroll.employee_id)
          // console.log(employee)
          // if(!employee) {
          //   throw new AppError("Employee doesn exists")
          // }
         if(employee) {
         let employeePayroll: ICreatePayrollEmployeeDTO = {
            id: payroll.id,
            payroll_id: payroll.payroll_id,
            employee_id: employee.id,
            employee_number: employee.employee_number,
            employee_name: employee.name,
            dependents: employee.dependents,
            position_name: positionName(employee.position_id!)?.name,
            departament_name: departmentName(employee.department_id!)?.name,
            nib: employee.nib,
            social_security: employee.social_security,
            salary_base: payroll.salary_base, 
            salary_liquid: payroll.salary_liquid,
            month: payroll.month,
            year: payroll.year,
            total_income: payroll.total_income ,
            overtime50: payroll.overtime50,
            overtime100: payroll.overtime100,
            total_overtime: payroll.total_overtime,
            month_total_workdays: payroll.month_total_workdays,
            day_total_workhours: payroll.day_total_workhours,
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
            syndicate_employee: payroll.syndicate_employee,
            subsidy_transport: payroll.subsidy_transport ?? 0,
            subsidy_food: payroll.subsidy_food ?? 0,
            subsidy_residence: payroll.subsidy_residence ?? 0,
            subsidy_medical: payroll.subsidy_medical ?? 0,
            subsidy_vacation: payroll.subsidy_vacation ?? 0,
            salary_thirteenth: payroll.salary_thirteenth ?? 0,
            total_inss: ((+payroll.inss_company) + (+payroll.inss_employee)) as any,
            created_at: payroll.created_at,
          };
       
          listEmployeesPayrolls.push(employeePayroll)
        } else {
          //employe doesn exist
        }
        })

        return listEmployeesPayrolls
    }
}
export { ListInputPayrollEmployeeUseCase }
