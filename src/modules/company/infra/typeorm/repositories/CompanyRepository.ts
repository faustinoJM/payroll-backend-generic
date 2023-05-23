import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import ICreateCompanyDTO from '../../../dtos/ICreateCompanyDTO';
import ICompanyRepository from '../../../repositories/ICompanyRepository';
import Company from '../entities/Company';



class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(Company);
  }
  
  public async create({ 
      id,
      company_name, 
      company_contact,
      company_email,
      company_address,
      company_address_2,
      company_street,
      company_province,
      company_city,
      company_nuit,
      company_bank_name,
      company_bank_account,
    }: ICreateCompanyDTO): Promise<Company> {

      const company = this.ormRepository.create({
        id,
        company_name, 
        company_contact,
        company_email,
        company_address,
        company_address_2,
        company_street,
        company_province,
        company_city,
        company_nuit,
        company_bank_name,
        company_bank_account,
      })

      await this.ormRepository.save(company);

      return company;
  }
  
  async findByName(company_name: string): Promise<Company | null> {
    const company = await this.ormRepository.findOne({
      where: {company_name}
    })

    return company;
  }

  async findById(id: string): Promise<Company | null> {
     const company = await this.ormRepository.findOne({
      where: { id }
    })

    return company;
  }

  async list(): Promise<Company[] | []> {
    const company = await this.ormRepository.find()

    return company;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default CompanyRepository
