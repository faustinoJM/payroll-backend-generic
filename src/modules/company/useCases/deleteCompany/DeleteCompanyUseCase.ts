import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import ICompanyRepository from "../../repositories/ICompanyRepository";

@injectable()
class DeleteCompanyUseCase {

    constructor(@inject("CompanyRepository")
        private companyRepository: ICompanyRepository) {}

    async execute(id: string) {
        
        const company = await this.companyRepository.findById(id);

        if(!company) {
          throw new AppError("Company doesn't exists")
        }

        await this.companyRepository.delete(id)

        return company;

    }
}

export { DeleteCompanyUseCase }