import { Column, CreateDateColumn, Double, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import Department from "../../../../departments/infra/typeorm/entities/Department";
import Position from "../../../../positions/infra/typeorm/entities/Position";

@Entity("employees")
class Employee {
    @PrimaryColumn('uuid')
    id?: string;

    @Column()
    company_id: string;
  
    @Column()
    employee_number: number;

    @Column()
    name: string;

    @Column()
    salary: string;

    @Column()
    dependents: number;

    @Column()
    birth_date: Date;
    
    @Column()
    place_birth: string;

    @Column()
    nationality:  string;

    @Column()
    bi: string;

    @Column()
    marital_status: string;
    
    @Column()
    gender: string;

    @Column()
    address: string;

    @Column()
    contact_1: string;

    @Column()
    contact_2: string;

    @Column()
    email: string;

    @Column()
    nuit: number;

    @Column()
    vacation: number;

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
    start_date: Date;

    @Column()
    employee_status: string;

    @Column()
    bank_name: string;

    @Column()
    bank_account: number;

    @Column()
    nib: number;

    @Column()
    social_security: number;
    
    @Column()
    position_id: string;
    
    @ManyToOne(() => Position)
    @JoinColumn({ name: "position_id"})
    position: Position;

    position_name: string;

    @Column()
    department_id: string; 

    @ManyToOne(() => Department)
    @JoinColumn({ name: "department_id"})
    department: Department;

    department_name: string;

    @Column()
    syndicate_status: string;

    @Column()
    inss_status: string;

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

export { Employee };


   