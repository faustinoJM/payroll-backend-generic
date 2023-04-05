import { inject, injectable } from "tsyringe";
import ICompanyRepository from "../../repositories/ICompanyRepository";


@injectable()
class ListCompanyUseCase {

    constructor(@inject("CompanyRepository")
        private companyRepository: ICompanyRepository) {}
       
    async execute() {
    
        const companies = await this.companyRepository.list();
  
        return companies;

    }
}

export { ListCompanyUseCase }

