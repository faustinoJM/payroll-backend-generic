import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import ICreateCompanyDTO from "../../dtos/ICreateCompanyDTO";
import ICompanyRepository from "../../repositories/ICompanyRepository";


@injectable()
class UpdateCompanyUseCase {
  constructor(@inject("CompanyRepository")
  private companyRepository: ICompanyRepository) {}
  
   async execute({
    id, 
    company_name, 
    company_contact,
    company_email,
    company_address,
    company_address_2,
    company_street,
    company_city,
    company_province,
    company_nuit,
    company_bank_name,
    company_bank_account, }: ICreateCompanyDTO) {
    const company = await this.companyRepository.findById(id as string)

    if(!company) {
      throw new AppError("Company doesn't exists")
    }

    await this.companyRepository.create({
      id, 
      company_name, 
      company_contact,
      company_email,
      company_address,
      company_address_2,
      company_street,
      company_city,
      company_province,
      company_nuit,
      company_bank_name,
      company_bank_account,})

    return company;
  }

}

export { UpdateCompanyUseCase }