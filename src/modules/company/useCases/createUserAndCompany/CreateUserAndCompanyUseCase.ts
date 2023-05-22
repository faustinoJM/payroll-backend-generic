import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import ICreateCompanyDTO from "../../dtos/ICreateCompanyDTO";
import ICompanyRepository from "../../repositories/ICompanyRepository";


export default interface ICreateUserCompanyDTO {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  company_name?: string;
  company_contact?: number;
  company_email?: string;
  company_address?: string;
  company_city?: string;
  company_province?: string;
}


@injectable()
class CreateUserAndCompanyUseCase {

    constructor(@inject("CompanyRepository")
        private companyRepository: ICompanyRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        ) {}

    async execute(data: ICreateUserCompanyDTO) {
        
        const UserAlreadyExists = await this.userRepository.findByEmail(data.email as any);

        const companyAlreadyExists = await this.companyRepository.findByName(data.company_name as any);
        
        if(companyAlreadyExists) {
          throw new AppError("Company already Exists")
        } 

        if(UserAlreadyExists) {
            throw new AppError("User Already Exists");
        }

       const company =  await this.companyRepository.create({
        company_name: data.company_name,
        company_email: data.company_email,
        company_address: data.company_address,
        company_city: data.company_city,
        company_contact: data.company_contact,
         company_province: data.company_province
       });

        const passwordCHash = await hash(data.password as any, 8);
        await this.userRepository.create({ 
          name: data.name as any, 
          password: passwordCHash, 
          email: data.email as any, 
          company_id: company.id});

          return company
        
    }
}

export { CreateUserAndCompanyUseCase }