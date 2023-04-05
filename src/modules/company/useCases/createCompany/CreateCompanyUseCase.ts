import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import ICreateCompanyDTO from "../../dtos/ICreateCompanyDTO";
import ICompanyRepository from "../../repositories/ICompanyRepository";



@injectable()
class CreateCompanyUseCase {

    constructor(@inject("CompanyRepository")
        private companyRepository: ICompanyRepository) {}

    async execute(data: ICreateCompanyDTO) {
        
        const companyAlreadyExists = await this.companyRepository.findByName(data.company_name as any);
        
        if(companyAlreadyExists) {
          throw new AppError("Company already Exists")
        } 
        
        await this.companyRepository.create(data);
        

    }
}

export { CreateCompanyUseCase }