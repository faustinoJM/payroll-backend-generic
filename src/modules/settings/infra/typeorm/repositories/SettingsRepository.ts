import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import ICreateSettingDTO from '../../../dtos/ICreateSettingDTO';
import ISettingRepository from '../../../repositories/ISettingRepository';
import Setting from '../entities/Setting';



class SettingsRepository implements ISettingRepository {
  private ormRepository: Repository<Setting>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(Setting);
  }
  
  public async create({ id, company_id,
          company_name, 
          company_telephone,
          company_contact,
          company_email,
          company_website,
          company_fax,
          company_address,
          company_province,
          company_city,
          postal_code,
          company_country,
          company_avatar,
          company_logo_name,
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          overtime_status,
          absences_status,
          cash_advances_status,
          bonus_status,
          backpay_status,
          subsidy_status,
          syndicate_status,
          flag,
          payroll_syndicate_tax,
          payroll_inss_company_tax,
          payroll_inss_employee_tax,
    }: ICreateSettingDTO): Promise<Setting> {

      const setting = this.ormRepository.create({
          id, 
          company_id,
          company_name, 
          company_telephone,
          company_contact,
          company_email,
          company_website,
          company_fax,
          company_address,
          company_province,
          company_city,
          postal_code,
          company_country,
          company_avatar,
          company_logo_name,
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          overtime_status,
          absences_status,
          cash_advances_status,
          bonus_status,
          backpay_status,
          subsidy_status,
          syndicate_status,
          flag,
          payroll_syndicate_tax,
          payroll_inss_company_tax,
          payroll_inss_employee_tax,
      })

      await this.ormRepository.save(setting);

      return setting;
  }
  
  async findByName(company_name: string, company_id: string): Promise<Setting | null> {
    const setting = await this.ormRepository.findOne({
      where: { company_name, company_id }
    })

    return setting;
  }

  async findById(company_id: string): Promise<Setting | null> {
     const setting = await this.ormRepository.findOne({
      where: {company_id}
    })

    return setting;
  }

  async list(company_id: string): Promise<Setting | null> {
    const settings = await this.ormRepository.findOne({
      where: {company_id}
    })

    return settings;
  }
}

export default SettingsRepository
