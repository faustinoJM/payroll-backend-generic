import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4  } from 'uuid';

@Entity('company')
class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  company_name: string;

  @Column()
  company_contact: number;

  @Column()
  company_email: string;

  @Column()
  company_address: string;
  
  @Column()
  company_address2: string;

  @Column()
  company_street: string;

  @Column()
  company_city: string;
  
  @Column()
  company_province: string;

  @Column()
  company_nuit: string;

  @Column()
  company_bank_name: string;

  @Column()
  company_bank_account: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = uuidv4();
  }

}

export default Company;

