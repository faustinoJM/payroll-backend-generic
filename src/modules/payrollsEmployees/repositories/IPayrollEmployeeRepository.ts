import { ICreatePayrollEmployeeDTO } from "../dtos/ICreatePayrollEmployeeDTO";
import { PayrollEmployee } from "../infra/typeorm/entities/PayrollEmployee";

interface IPayrollEmployeeRepository {
    create(data: ICreatePayrollEmployeeDTO): Promise<void>;
    
    findByEmployeeId(employee_id: string): Promise<PayrollEmployee | null>;
    findById(id: string, company_id: string): Promise<PayrollEmployee | null>;
    findByMouth(month: string, company_id: string): Promise<PayrollEmployee | null>;
    findByYear(year: number, company_id: string): Promise<PayrollEmployee | null>;
    findAllByYear(year: number, company_id: string): Promise<PayrollEmployee[] | null>;
    findAllByMonth(month: string, company_id: string): Promise<PayrollEmployee[] | null>;
    findAllByYearAndByMonth(year: number, month: string, company_id: string): Promise<PayrollEmployee[] | null>;
    findAllByPayroll_Id(payroll_id: string, company_id: string): Promise<PayrollEmployee[] | null>;
    delete(payroll_id: string): Promise<void>
    deleteByPayroll_Id(payroll_id: string, company_id: string): Promise<void>
    deleteAllByYearAndMonth(year: number, month: string, company_id: string): Promise<void>
    list(company_id: string): Promise<PayrollEmployee[]>;
    listAll(): Promise<PayrollEmployee[]>;
    
}

export { IPayrollEmployeeRepository }