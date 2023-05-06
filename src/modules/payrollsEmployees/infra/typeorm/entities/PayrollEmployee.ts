import { Column, CreateDateColumn, Double, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Employee } from "../../../../employees/infra/typeorm/entities/Employee";

@Entity("payrolls_employees")
class PayrollEmployee {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    company_id: string;
  
    @Column()
    employee_id: string;

    @Column()
    payroll_id: string;

    @Column()
    employee_number: number;

    @Column()
    employee_name: string;

    @Column()
    dependents: number;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: "employee_id" })
    employee: Employee

    @Column()
    salary_base: string;

    @Column()
    salary_liquid: string;

    @Column()
    month: string;

    @Column()
    year: number;

    @Column()
    position_name: string;

    @Column()
    departament_name: string;

    @Column()
    nib: number;

    @Column()
    social_security: number;

    @Column()
    nuit: number;
    
    @Column()
    overtime50: number;

    @Column()
    overtime100: number;

    @Column()
    total_overtime: string;

    @Column()
    month_total_workdays: number;

    @Column()
    day_total_workhours: number;

    @Column()
    base_day: string;

    @Column()
    base_hour: string;

    @Column()
    absences: number;

    @Column()
    total_absences: string;

    @Column()
    cash_advances: string;

    @Column()
    backpay: string;

    @Column()
    bonus: string;

    @Column()
    subsidy: string;

    @Column()
    subsidy_transport: string;

    @Column()
    subsidy_food: string;

    @Column()
    subsidy_residence: string;

    @Column()
    subsidy_medical: string;

    @Column()
    subsidy_vacation: string;

    @Column()
    salary_thirteenth: string;

    @Column()
    irps: string;

    @Column()
    inss_employee: string;

    @Column()
    inss_company: string;

    @Column()
    total_income: string;

    @Column()
    syndicate_employee: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { PayrollEmployee };

