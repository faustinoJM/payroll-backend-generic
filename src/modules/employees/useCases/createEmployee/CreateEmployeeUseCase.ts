import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";


@injectable()
class CreateEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        ) {}

    async execute(data: ICreateEmployeeDTO) {
        const user = await this.userRepository.findById(data.user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }
        
        const employeeAlreadyExists = await this.employeeRepository.findByName(data.name, data.bi, user.company_id);

        if(employeeAlreadyExists) {
            throw new AppError("Employee Already Exists");
        }

        data.dependents = data.dependents ?? 0
        data.subsidy = data.subsidy ?? 0 as any;
        data.vacation = data.vacation ?? 0 as any;
        data.subsidy_transport = data.subsidy_transport ?? 0 as any
        data.subsidy_food = data.subsidy_food ?? 0 as any
        data.subsidy_vacation = data.subsidy_vacation ?? 0 as any
        data.subsidy_medical = data.subsidy_medical ?? 0 as any
        data.subsidy_residence = data.subsidy_residence ?? 0 as any
        data.salary_thirteenth = data.salary_thirteenth ?? 0 as any
        data.company_id = user.company_id;
        data.inss_status = data.inss_status ?? "true";
        data.syndicate_status = data.syndicate_status ?? "false";

        await this.employeeRepository.create(data);

    }
}

export { CreateEmployeeUseCase }