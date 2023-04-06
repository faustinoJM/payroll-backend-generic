import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import ICompanyRepository from "../../../company/repositories/ICompanyRepository";
import ICreatePositionDTO from "../../dtos/ICreatePositionDTO";

import IPositionsRepository from "../../repositories/IPositionsRepository";


@injectable()
class CreatePositionUseCase {

    constructor(@inject("PositionsRepository")
        private positionsRepository: IPositionsRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        
        @inject("CompanyRepository")
        private companyRepository: ICompanyRepository) {}

    async execute({ user_id, name }: ICreatePositionDTO) {
      
      const user = await this.userRepository.findById(user_id as any)

      if (!user) {
        throw new  AppError("User Auth doesn't Exists")
      }

      const positionAlreadyExists = await this.positionsRepository.findByName(name, user.company_id);


        if(positionAlreadyExists) {
            throw new AppError("Position Already Exists");
        }


        await this.positionsRepository.create({ name, company_id: user.company_id });

    }
}

export { CreatePositionUseCase }