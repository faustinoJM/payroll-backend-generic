import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../repositories/IPositionsRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import ICreatePositionDTO from "../../dtos/ICreatePositionDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";

export default interface IRequest {
  id?: string;
  position_id?: number;
  name: string;
  total_employee: number;

}


@injectable()
class ListPositionUseCase {

    constructor(@inject("PositionsRepository")
        private positionRepository: IPositionsRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository) {}

    async execute(user_id: string) {
      const user = await this.userRepository.findById(user_id as any)

      if (!user) {
        throw new  AppError("User doesn't Exists")
      }
        const positions = await this.positionRepository.list(user.company_id);
        // let positions2: IRequest[] = positions
        const listEmployee =  await this.employeeRepository.list(user.company_id)

        positions.map((position) => {
          position.total_employee = (listEmployee.filter(employee => {
              return employee.position_id === position.id
          })).length
          console.log(position.total_employee)
        })

        return positions;

    }
}

export { ListPositionUseCase }