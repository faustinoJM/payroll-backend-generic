import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

@injectable()
class UpdateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository,

    @inject("UsersRepository")
        private userRepository: IUsersRepository,
  ) {}
  
   async execute({id, user_id, employee_id, name, dependents, salary, position_id, department_id, birth_date, 
    place_birth,
    nationality,
    bi,
    marital_status,
    gender,
    address,
    contact,
    contact2,
    email,
    nuit,
    vacation,
    subsidy,
    department,
    position,
    start_date,
    employee_status,
    bank_name,
    bank_account,
    nib,
    social_security,
    syndicate_status, inss_status}: ICreateEmployeeDTO) {

    const user = await this.userRepository.findById(user_id as any)

      if (!user) {
        throw new  AppError("User Auth doesn't Exists")
      }

    const employee = await this.employeesRepository.findById(id as string, user.company_id)

    if(!employee) {
      throw new AppError("Employee doesn't exists")
    }

    // employee.birth_date = birth_date as Date

    await this.employeesRepository.create({id, employee_id, name, dependents, salary, position_id, department_id, birth_date, 
      place_birth,
      nationality,
      bi,
      marital_status,
      gender,
      address,
      contact,
      contact2,
      email,
      nuit,
      vacation,
      subsidy,
      department,
      position,
      start_date,
      employee_status,
      bank_name,
      bank_account,
      nib,
      social_security,
      syndicate_status, inss_status
    })

    return employee;
  }

}

export { UpdateEmployeeUseCase }