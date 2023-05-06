import { ICreatePayrollDTO } from "../dtos/ICreatePayrollDTO";
import { ICreatePayrollDTO2 } from "../dtos/ICreatePayrollDTO2";
import { Payroll } from "../infra/typeorm/entities/Payroll";

interface IPayrollRepository {
    create(data: ICreatePayrollDTO): Promise<Payroll>;
    
    findById(id: string, company_id: string): Promise<Payroll | null>;
    findByMonth(month: string, company_id: string): Promise<Payroll | null>;
    findByYear(year: number, company_id: string): Promise<Payroll | null>;
    findAllByYear(year: number, company_id: string): Promise<Payroll[] | null>;
    findAllByMonth(month: string, company_id: string): Promise<Payroll[] | null>;
    findAllByYearAndByMonth(year: number, month: string, company_id: string): Promise<Payroll[] | []>;
    delete(id: string): Promise<void>
    deleteAllByYearAndMonth(year: number, month: string, company_id: string): Promise<void>
    list(company_id: string): Promise<Payroll[]>;
    listAll(): Promise<Payroll[]>;
    
}

export { IPayrollRepository }