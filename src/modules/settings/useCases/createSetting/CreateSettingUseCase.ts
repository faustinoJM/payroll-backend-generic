import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/provider/StorageProvider/IStorageProvider";
import AppError  from "../../../../shared/errors/AppError";
import { deleteFile } from "../../../../utils/filte";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import ICreateSettingDTO from "../../dtos/ICreateSettingDTO";
import ISettingRepository from "../../repositories/ISettingRepository";


@injectable()
class CreateSettingUseCase {

    constructor(@inject("SettingsRepository")
        private settingRepository: ISettingRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        
        @inject("StorageProvider")
        private storageProvider: IStorageProvider) {}

    async execute(data: ICreateSettingDTO) {
        const user  = await this.userRepository.findById(data.user_id as any)

        if (!user) {
          throw new AppError("User Auth doesn't Exists")
        }
        
        const settingAlreadyExists = await this.settingRepository.findById(user.company_id as any);
        
        if (settingAlreadyExists) {
          console.log("111124",settingAlreadyExists.company_logo_name)
        }
        
        let file_logo_name = null
        if (data.company_logo_multer && data.company_logo_multer.length > 0) {
          if (settingAlreadyExists?.company_logo_name) {
            await deleteFile(`./tmp/company/${settingAlreadyExists.company_logo_name}`);
            await this.storageProvider.delete(settingAlreadyExists.company_logo_name, "company")
            }
          file_logo_name = await this.storageProvider.save(data.company_logo_multer[0] as any, "company")
        }

        console.log("Opa", file_logo_name)

        if(settingAlreadyExists) {
        // Case settingAlreadyExists update
            await this.settingRepository.create({
              id: settingAlreadyExists.id,
              company_id: settingAlreadyExists.company_id,
              company_name: data.company_name, 
              company_telephone: data.company_telephone,
              company_contact: data.company_contact,
              company_email: data.company_email,
              company_website: data.company_website,
              company_fax: data.company_fax,
              company_address: data.company_address,
              company_address_2: data.company_address_2,
              company_street: data.company_street,
              company_province: data.company_province,
              company_city: data.company_city,
              postal_code: data.postal_code,
              company_country: data.company_country,
              company_avatar: data.company_avatar,
              company_nuit: data.company_nuit,
              company_bank_name: data.company_bank_name,
              company_bank_account: data.company_bank_account,
              company_logo_title: data.company_logo_title,
              payroll_month_total_workdays: data.payroll_month_total_workdays,
              payroll_day_total_workhours: data.payroll_day_total_workhours,
              payroll_syndicate_tax: data.payroll_syndicate_tax,
              payroll_inss_employee_tax: data.payroll_inss_employee_tax,
              payroll_inss_company_tax: data.payroll_inss_company_tax,
              column_position_name: data.column_position_name,
              column_department_name: data.column_department_name,
              column_overtime: data.column_overtime,
              column_absences: data.column_absences,
              column_cash_advances: data.column_cash_advances,
              column_backpay: data.column_backpay,
              column_bonus: data.column_bonus,
              column_subsidy: data.column_subsidy,
              column_syndicate: data.column_syndicate,
              column_subsidy_transport: data.column_subsidy_transport,
              column_subsidy_food: data.column_subsidy_food,
              column_subsidy_residence: data.column_subsidy_residence,
              column_subsidy_medical: data.column_subsidy_medical,
              column_subsidy_vacation: data.column_subsidy_vacation,
              column_salary_thirteenth: data.column_salary_thirteenth,
              language_options: data.language_options,              
              flag: data.flag,
              company_logo_name: file_logo_name ?? settingAlreadyExists.company_logo_name,
              // payroll_inss_employee_tax: data.payroll_inss_employee_tax,
              // payroll_inss_company_tax: data.payroll_inss_company_tax
            });
        } else {
            // if Setting doesn't Exists  create new
            data.company_id = user.company_id
            data.payroll_month_total_workdays = data.payroll_month_total_workdays ?? 30
            data.payroll_day_total_workhours = data.payroll_day_total_workhours as any ?? 8
            data.payroll_syndicate_tax = data.payroll_syndicate_tax ?? 1
            data.payroll_inss_employee_tax = data.payroll_inss_employee_tax ?? 3
            data.payroll_inss_company_tax = data.payroll_inss_company_tax ?? 4
            data.column_position_name = data.column_position_name ??  "true",
            data.column_department_name = data.column_department_name ?? "true",
            data.column_overtime =  data.column_overtime ??  "true"
            data.column_absences =  data.column_absences ?? "true"
            data.column_cash_advances =  data.column_cash_advances ?? "true"
            data.column_bonus =  data.column_bonus ?? "true"
            data.column_backpay =  data.column_backpay ?? "true"
            data.column_subsidy =  data.column_subsidy ?? "true"
            data.column_syndicate =  data.column_syndicate ?? "true"
            data.column_subsidy_transport = data.column_subsidy_transport ?? "false"
            data.column_subsidy_food = data.column_subsidy_food ?? "false"
            data.column_subsidy_residence = data.column_subsidy_residence ?? "false"
            data.column_subsidy_medical = data.column_subsidy_medical ?? "false"
            data.column_subsidy_vacation = data.column_subsidy_vacation ?? "false"
            data.column_salary_thirteenth = data.column_salary_thirteenth ?? "false"
          await this.settingRepository.create(data);
        }

    }
}

export { CreateSettingUseCase }