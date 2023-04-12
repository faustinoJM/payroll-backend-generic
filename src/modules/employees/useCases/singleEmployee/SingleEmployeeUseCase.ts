import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import format from 'date-fns/format'
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";



@injectable()
class SingleEmployeeUseCase {

    constructor(@inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("PositionsRepository")
        private positionRepository: IPositionsRepository,

        @inject("DepartmentsRepository")
        private departmentRepository: IDepartmentsRepository) {}

    async execute(id: string, user_id: string) {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const employee = await this.employeeRepository.findById(id, user.company_id);
       

        if (!employee) {
          throw new AppError("Employee doesn't exists")
        }
        const position = await this.positionRepository.findById(employee.position_id)
        const department = await this.departmentRepository.findById(employee.department_id)
       
        employee.position_id ? employee.position_name = position?.name! : ""
        employee.department_id ? employee.department_name = department?.name! : ""
       
        return employee;

        

    }
}

export { SingleEmployeeUseCase }