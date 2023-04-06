import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import ICompanyRepository from "../../../company/repositories/ICompanyRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUserUseCase {
  constructor(@inject("UsersRepository")
  private userRepository: IUsersRepository,
  
  @inject("CompanyRepository")
  private companyRepository: ICompanyRepository
  ) {}
  
   async execute({id, name, email, password, company_id}: ICreateUserDTO) {
    const user = await this.userRepository.findById(id as string)

    // const companyExists = await this.companyRepository.findById(company_id)

    // if (!companyExists) {
    //   throw new AppError("Company Doesnt Exists");
    // }

    if(!user) {
      throw new AppError("User Auth doesn't Exists")
    }

    // const passwordCHash = await hash(password, 8);

    user.password  = await hash(password, 8)
    
    await this.userRepository.create({id, name, email, password: user.password, company_id: user.company_id})

    return user;
  }

}

export { UpdateUserUseCase }