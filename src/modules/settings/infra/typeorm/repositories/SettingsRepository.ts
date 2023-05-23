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
          company_address_2,
          company_street,
          company_province,
          company_city,
          postal_code,
          company_country,
          company_avatar,
          company_nuit,
          company_bank_name,
          company_bank_account,
          company_logo_name,
          company_logo_title,
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          payroll_syndicate_tax,
          payroll_inss_company_tax,
          payroll_inss_employee_tax,
          column_position_name,
          column_department_name,
          column_overtime,
          column_absences,
          column_cash_advances,
          column_backpay,
          column_bonus,
          column_subsidy,
          column_syndicate,
          column_subsidy_transport,
          column_subsidy_food,
          column_subsidy_residence,
          column_subsidy_medical,
          column_subsidy_vacation,
          column_salary_thirteenth,
          language_options,
          flag,

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
          company_address_2,
          company_street,
          company_province,
          company_city,
          postal_code,
          company_country,
          company_avatar,
          company_nuit,
          company_bank_name,
          company_bank_account,
          company_logo_name,
          company_logo_title,
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          payroll_syndicate_tax,
          payroll_inss_company_tax,
          payroll_inss_employee_tax,
          column_position_name,
          column_department_name,
          column_overtime,
          column_absences,
          column_cash_advances,
          column_backpay,
          column_bonus,
          column_subsidy,
          column_syndicate,
          column_subsidy_transport,
          column_subsidy_food,
          column_subsidy_residence,
          column_subsidy_medical,
          column_subsidy_vacation,
          column_salary_thirteenth,
          language_options,
          flag,
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
