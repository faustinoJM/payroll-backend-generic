import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IDepartmentsRepository from "../../repositories/IDepartmentsRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";

@injectable()
class ListDepartmentUseCase {

    constructor(@inject("DepartmentsRepository")
        private departmentRepository: IDepartmentsRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository) {}

    async execute(user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new AppError("User Auth doesn't Exists")
        }
        
        const departments = await this.departmentRepository.list(user.company_id);
        const employeeList = await this.employeeRepository.list(user.company_id);

        departments.map(department => {
          department.total_employee = (employeeList.filter(employee => 
            employee.department_id === department.id)).length
        })

        return departments;

    }
}

export { ListDepartmentUseCase }