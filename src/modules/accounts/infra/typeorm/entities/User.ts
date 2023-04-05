import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4} from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    company_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_admin: boolean;

    // @Column()
    // avatar: string;

    company_name: string;

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

export { User };