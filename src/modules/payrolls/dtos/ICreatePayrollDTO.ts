
interface ICreatePayrollDTO {
  id?: string;
  company_id?: string;
  month?: string;
  year?: number;
  payroll_status?: string;
  total_employee?: number;
  flag?: string
}

export { ICreatePayrollDTO };
