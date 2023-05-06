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
  company_logo_name: string;

  @Column()
  payroll_month_total_workdays: number;
  
  @Column()
  payroll_day_total_workhours: number;

  @Column()
  overtime_status: string

  @Column()
  absences_status: string

  @Column()
  cash_advances_status: string

  @Column()
  bonus_status: string

  @Column()
  backpay_status: string

  @Column()
  subsidy_status: string

  @Column()
  syndicate_status: string;

  @Column()
  flag: number;
  
  @Column()
  payroll_syndicate_tax: number;

  @Column()
  payroll_inss_employee_tax: number;

  @Column()
  payroll_inss_company_tax: number;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = uuidv4();
  }

}

export default Setting;

