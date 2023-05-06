import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreatePayrollDTO } from "../../../dtos/ICreatePayrollDTO";
import { ICreatePayrollDTO2 } from "../../../dtos/ICreatePayrollDTO2";
import { IPayrollRepository } from "../../../repositories/IPayrollRepository";
import { Payroll } from "../entities/Payroll";

class PayrollRepository implements IPayrollRepository {
    private repository: Repository<Payroll>;

    constructor() {
        this.repository = AppDataSource.getRepository(Payroll);
    }
    
    async create({ id,
      company_id,
      month,
      year,
      total_employee,
      flag}: ICreatePayrollDTO): Promise<Payroll> {
        const payroll =  this.repository.create({
          id,
          company_id,
          month,
          year,
          total_employee,
          flag
        });
        
       const payrollCreated = await this.repository.save(payroll);

       return payrollCreated;
        
    }
    
   
    async findById(id: string, company_id: string): Promise<Payroll | null> {
        const payroll = await this.repository.findOne({
          where: { id, company_id }
        });
        // console.log("ByyyyyyyyyyyyID:  ", payroll)
        return payroll;
    }

    async findByMonth(month: string, company_id: string): Promise<Payroll | null> {
      const  payroll = await this.repository.findOne({
        where: { month, company_id}
      })

      return payroll;
    }

    async findByYear(year: number, company_id: string): Promise<Payroll | null> {
      const  payroll = await this.repository.findOne({
        where: { year, company_id}
      })

      return payroll;
    }


    async findAllByYear(year: number, company_id: string): Promise<Payroll[] | null> {
      const  payrolls = await this.repository.find({
        where: { year, company_id}
      })

      return payrolls;
    }

    async findAllByMonth(month: string, company_id: string): Promise<Payroll[] | null> {
      const  payrolls = await this.repository.find({
        where: { month, company_id }
      })

      return payrolls;
    }
    async findAllByYearAndByMonth(year: number, month: string, company_id: string): Promise<Payroll[] | []> {
      const  payrolls = await this.repository.find({
        where: { month, year, company_id}
      })

      return payrolls;
      }
  
    async list(company_id: string): Promise<Payroll[]> {
        const list = await this.repository.find({
          where: { company_id }
        });

        return list;
    }

    
    async listAll(): Promise<Payroll[]> {
      const list = await this.repository.find();

      return list;
  }

    async delete(id: string): Promise<void> {
      await this.repository.delete(id)
    }

    async deleteAllByYearAndMonth(year: number, month: string, company_id: string): Promise<void> {
      await this.repository.delete({year: year, month: month, company_id: company_id})

    }
}

export { PayrollRepository };






