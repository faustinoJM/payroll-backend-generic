import { Column, CreateDateColumn, Double, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("payrolls")
class Payroll {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    company_id: string;
  
    @Column()
    month: string;

    @Column()
    year: number;

    @Column()
    payroll_status: string

    @Column()
    total_employee: number;
   
    @Column()
    flag: string;
    

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

export { Payroll };

