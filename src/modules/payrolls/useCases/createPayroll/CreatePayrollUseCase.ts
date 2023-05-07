import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IPayrollEmployeeRepository } from "../../../payrollsEmployees/repositories/IPayrollEmployeeRepository";
import { ICreatePayrollDTO2 } from "../../dtos/ICreatePayrollDTO2";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../category/repositories/IDepartmentsRepository";
import ISettingRepository from "../../../settings/repositories/ISettingRepository";
import { ICreatePayrollEmployeeDTO } from "../../../payrollsEmployees/dtos/ICreatePayrollEmployeeDTO";

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
class CreatePayrollUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        ) {}

    async execute(month: string, year: number, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }
        // user.company_id

        // const payrollYearMonth = await this.payrollRepository.findAllByYearAndByMonth(year!, month!, user.company_id)
        const payrollYearMonth = await this.payrollRepository.list(user.company_id)

        const PayrollAlreadyExists = payrollYearMonth.find((data) => ((data.month === month) && (data.year === +year)))
        

      //  console.log("spdsp", PayrollAlreadyExists)
        if(PayrollAlreadyExists) {
          throw new AppError("O mes ja esta Pago")
        }
        const payroll = await this.payrollRepository.create({month, year, company_id: user.company_id})
        
        return payroll;
      }
}

export { CreatePayrollUseCase }

