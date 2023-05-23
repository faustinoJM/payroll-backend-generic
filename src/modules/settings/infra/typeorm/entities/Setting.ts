import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4  } from 'uuid';

@Entity('settings')
class Setting {
  @PrimaryColumn()
  id: string;

  @Column()
  company_id: string;

  @Column()
  company_name: string;

  @Column()
  company_telephone: number;

  @Column()
  company_contact: number;

  @Column()
  company_email: string;

  @Column()
  company_website: string;

  @Column()
  company_fax: string;

  @Column()
  company_address: string;

  @Column()
  company_address_2: string;

  @Column()
  company_street: string;

  @Column()
  company_province: string;
  
  @Column()
  company_city: string;
  
  @Column()
  postal_code: number
  
  @Column()
  company_country: string;
  
  @Column()
  company_avatar: string

  @Column()
  company_nuit: string;

  @Column()
  company_bank_name: string;

  @Column()
  company_bank_account: string;

  @Column()
  company_logo_name: string;

  @Column()
  company_logo_title?: string;

  @Column()
  payroll_month_total_workdays: number;
  
  @Column()
  payroll_day_total_workhours: string;

  @Column()
  payroll_syndicate_tax: number;

  @Column()
  payroll_inss_employee_tax: number;

  @Column()
  payroll_inss_company_tax: number;

  @Column()
  column_position_name: string

  @Column()
  column_department_name: string

  @Column()
  column_overtime: string

  @Column()
  column_absences: string

  @Column()
  column_cash_advances: string

  @Column()
  column_backpay: string

  @Column()
  column_bonus: string

  @Column()
  column_subsidy: string

  @Column()
  column_syndicate: string

  @Column()
  column_subsidy_transport: string

  @Column()
  column_subsidy_food: string

  @Column()
  column_subsidy_residence: string

  @Column()
  column_subsidy_medical: string

  @Column()
  column_subsidy_vacation: string

  @Column()
  column_salary_thirteenth: string

  @Column()
  language_options: string

  @Column()
  flag: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  companyLogoURL: string;

  getCompanyLogoURL(): string {
    // return `http://localhost:3333/companyy-logo/${this.company_logo_name}`
    return `https://generic-render-production.up.railway.app/companyy-logo/${this.company_logo_name}`
    // return `https://elint-payroll-images.s3.us-east-1.amazonaws.com/company/${this.company_logo_name}`
  }

  constructor() {
    this.id = uuidv4();
  }

}

export default Setting;

