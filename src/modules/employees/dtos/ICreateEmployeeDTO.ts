interface ICreateEmployeeDTO {
  id?: string;
  employee_number?: number;
  name: string;
  salary: string;
  dependents: number;
  position_id?: string;
  department_id?: string; 
  birth_date?: Date;
  place_birth?: string;
  nationality?:  string;
  bi: string;
  marital_status?: string;
  gender?: string;
  address?: string;
  contact?:  number;
  contact2?: number;
  email?: string;
  nuit?: number;
  vacation?: number;
  subsidy?:  string;
  subsidy_transport?: string;
  subsidy_food?: string;
  subsidy_residence?: string;
  subsidy_medical?: string;
  subsidy_vacation?: string;
  salary_thirteenth?: string;
  department?: string;
  position?: string;
  start_date?: Date;
  employee_status?: string;
  bank_name?: string;
  bank_account?: number;
  nib?: number;
  social_security?: number;
  user_id?: string;
  company_id?: string;
  syndicate_status?: string;
  inss_status?: string
}

export { ICreateEmployeeDTO };