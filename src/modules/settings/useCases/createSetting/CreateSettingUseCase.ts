import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import ICreateSettingDTO from "../../dtos/ICreateSettingDTO";
import ISettingRepository from "../../repositories/ISettingRepository";


@injectable()
class CreateSettingUseCase {

    constructor(@inject("SettingsRepository")
        private settingRepository: ISettingRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository) {}

    async execute(data: ICreateSettingDTO) {
        const user  = await this.userRepository.findById(data.user_id as any)

        if (!user) {
          throw new AppError("User Auth doesn't Exists")
        }
        
        const settingAlreadyExists = await this.settingRepository.findById(user.company_id as any);
        
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
              company_province: data.company_province,
              company_city: data.company_city,
              postal_code: data.postal_code,
              company_country: data.company_country,
              company_avatar: data.company_avatar,
              company_logo_name: data.company_logo_name,
              payroll_month_total_workdays: data.payroll_month_total_workdays,
              payroll_day_total_workhours: data.payroll_day_total_workhours,
              overtime_status: data.overtime_status,
              absences_status: data.absences_status,
              cash_advances_status: data.cash_advances_status,
              bonus_status: data.bonus_status,
              backpay_status: data.backpay_status,
              subsidy_status: data.subsidy_status,
              syndicate_status: data.syndicate_status,
              payroll_syndicate_tax: data.payroll_syndicate_tax,
              // payroll_inss_employee_tax: data.payroll_inss_employee_tax,
              // payroll_inss_company_tax: data.payroll_inss_company_tax
            });
        } else {
            // Case Setting doesn't Exists  create new
            data.company_id = user.company_id
            data.payroll_month_total_workdays = data.payroll_month_total_workdays ?? 30
            data.payroll_day_total_workhours = data.payroll_day_total_workhours ?? 8
            data.overtime_status = data.overtime_status ??  "true"
            data.absences_status = data.absences_status ?? "true"
            data.cash_advances_status = data.cash_advances_status ?? "true"
            data.bonus_status = data.bonus_status ?? "true"
            data.backpay_status = data.backpay_status ?? "true"
            data.subsidy_status = data.subsidy_status ?? "true"
            data.syndicate_status = data.syndicate_status ?? "true"
            data.payroll_syndicate_tax = data.payroll_syndicate_tax ?? 1
          await this.settingRepository.create(data);
        }

    }
}

export { CreateSettingUseCase }