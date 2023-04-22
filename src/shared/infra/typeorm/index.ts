import { DataSource} from "typeorm"
import { User } from "../../../modules/accounts/infra/typeorm/entities/User"
import { UserTokens } from "../../../modules/accounts/infra/typeorm/entities/UserTokens"
import Company from "../../../modules/company/infra/typeorm/entities/Company"
import Department from "../../../modules/departments/infra/typeorm/entities/Department"
import { Employee } from "../../../modules/employees/infra/typeorm/entities/Employee"
import { Payroll } from "../../../modules/payrolls/infra/typeorm/entities/Payroll"
import Position from "../../../modules/positions/infra/typeorm/entities/Position"
import Setting from "../../../modules/settings/infra/typeorm/entities/Setting"


const options:  any = {
    type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "12345",
    // database: "payroll_single2",
    // url: "postgres://jhkdfoxm:q_zM2AjeX07zyuWXgCpRLLEMxnX3b-v0@raja.db.elephantsql.com/jhkdfoxm",
    url: "postgres://elint:uYQvjaysQl0dhEvkcUj8Gxe1p8jsMTLD@dpg-cgj809mbb6mo06k1h0rg-a.oregon-postgres.render.com/payroll_render?ssl=true",
    // url: "postgres://postgres:12345678@payroll-aws.chtitsruotfr.eu-north-1.rds.amazonaws.com/payroll_aws_db", 
    logging: true,
    synchronize: false,
    entities: [
      Company, User, UserTokens, Employee, Department, Position, Payroll, Setting
        // "./src/modules/users/infra/typeorm/entities/.ts",
        // "./src/modules/appointments/infra/typeorm/entities/.ts"

    ],
    subscribers: [
        "subscriber/*.js"
    ],
    entitySchemas: [
        "schema/*.json"
    ],
    migrations: [
        // "./src/shared/infra/typeorm/migrations/*.ts"
        `${__dirname}/**/migrations/*.{ts,js}`
    ],
    cli: {
        entitiesDir: "entity",
        migrationsDir: "src/database",
        subscribersDir: "subscriber"
    }
}

 export const AppDataSource = new DataSource(options)


