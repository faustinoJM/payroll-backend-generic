import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreatePayrollEmployeeDTO } from "../../../dtos/ICreatePayrollEmployeeDTO";
import { IPayrollEmployeeRepository } from "../../../repositories/IPayrollEmployeeRepository";
import { PayrollEmployee } from "../entities/PayrollEmployee";


class PayrollEmployeeRepository implements IPayrollEmployeeRepository {
    private repository: Repository<PayrollEmployee>;

    constructor() {
        this.repository = AppDataSource.getRepository(PayrollEmployee);
    }
    
    async create({ id,
      employee_id,
      payroll_id,
      company_id,
      employee_number,
      employee_name,
      dependents,
      position_name,
      department_name,
      salary_base,
      salary_liquid,
      month,
      year,
      overtime50,
      overtime100,
      total_overtime,
      month_total_workdays,
      day_total_workhours,
      base_day,
      base_hour,
      absences,
      total_absences,
      cash_advances,
      backpay,
      subsidy,
      subsidy_transport,
      subsidy_food,
      subsidy_residence,
      subsidy_medical,
      subsidy_vacation,
      salary_thirteenth,
      bonus,
      irps,
      inss_employee,
      inss_company,
      total_inss,
      total_income,
      syndicate_employee,
      bank_name,
      bank_account,
      nib,
      social_security,
      nuit,}: ICreatePayrollEmployeeDTO): Promise<void> {

      const payroll =  this.repository.create({
          id,
          company_id,
          employee_id,
          payroll_id,
          employee_number,
          dependents,
          employee_name,
          position_name,
          department_name,
          salary_base,
          salary_liquid,
          month,
          year,
          overtime50,
          overtime100,
          total_overtime,
          month_total_workdays,
          day_total_workhours,
          base_day,
          base_hour,
          total_absences,
          absences,
          cash_advances,
          backpay,
          subsidy,
          subsidy_transport,
          subsidy_food,
          subsidy_residence,
          subsidy_medical,
          subsidy_vacation,
          salary_thirteenth,
          bonus,
          irps,
          inss_employee,
          inss_company,
          total_inss,
          total_income,
          syndicate_employee,
          bank_name,
          bank_account,
          nib,
          social_security,
          nuit,
        });
        
        await this.repository.save(payroll);
        
    }
    
    async findByEmployeeId(employee_id: string): Promise<PayrollEmployee | null> {
        const payroll = await this.repository.findOne({ 
          where: { employee_id }
         });

        return payroll;
    }

    async findById(id: string, company_id: string): Promise<PayrollEmployee | null> {
        const payroll = await this.repository.findOne({
          where: { id, company_id }
        });
        // console.log("ByyyyyyyyyyyyID:  ", payroll)
        return payroll;
    }

    async findByMouth(month: string, company_id: string): Promise<PayrollEmployee | null> {
      const  payroll = await this.repository.findOne({
        where: { month, company_id}
      })

      return payroll;
    }

    async findByYear(year: number, company_id: string): Promise<PayrollEmployee | null> {
      const  payroll = await this.repository.findOne({
        where: { year, company_id}
      })

      return payroll;
    }


    async findAllByYear(year: number, company_id: string): Promise<PayrollEmployee[] | null> {
      const  payrolls = await this.repository.find({
        where: { year, company_id}
      })

      return payrolls;
    }

    async findAllByMonth(month: string, company_id: string): Promise<PayrollEmployee[] | null> {
      const  payrolls = await this.repository.find({
        where: { month, company_id }
      })

      return payrolls;
    }
    async findAllByYearAndByMonth(year: number, month: string, company_id: string): Promise<PayrollEmployee[] | null> {
      const  payrolls = await this.repository.find({
        where: { month, year, company_id}
      })

      return payrolls;
      }

     async findAllByPayroll_Id(payroll_id: string, company_id: string): Promise<PayrollEmployee[] | []> {
        const  payrolls = await this.repository.find({
          where: { payroll_id, company_id}
        })
  
        return payrolls;
      }
  
    async list(company_id: string): Promise<PayrollEmployee[]> {
        const list = await this.repository.find({
          where: { company_id }
        });

        return list;
    }

    
    async listAll(): Promise<PayrollEmployee[]> {
      const list = await this.repository.find();

      return list;
    }

    async delete(id: string): Promise<void> {
      await this.repository.delete(id)
    }

    async deleteByPayroll_Id(payroll_id: string, company_id: string): Promise<void> {
      await this.repository.delete({ payroll_id: payroll_id, company_id: company_id })
    }

    async deleteAllByYearAndMonth(year: number, month: string, company_id: string): Promise<void> {
      await this.repository.delete({year: year, month: month, company_id: company_id})

    }
}

export { PayrollEmployeeRepository };






