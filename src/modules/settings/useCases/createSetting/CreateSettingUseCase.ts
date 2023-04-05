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
          throw new AppError("User doesn't Exists")
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
              payroll_total_workdays_month: data.payroll_total_workdays_month,
              payroll_total_workhours_day: data.payroll_total_workhours_day,
              overtime: data.overtime,
              absences: data.absences,
              cash_advances: data.cash_advances,
              bonus: data.bonus,
              backpay: data.backpay,
              subsidy: data.subsidy,
            });
        } else {
            // Case Setting doesn't Exists  create new
            data.company_id = user.company_id
            data.payroll_total_workdays_month = data.payroll_total_workdays_month ?? 26
            data.payroll_total_workdays_month = data.payroll_total_workdays_month ?? 8
            data.overtime = data.overtime ??  "true"
            data.absences = data.absences ?? "true"
            data.cash_advances = data.cash_advances ?? "true"
            data.bonus = data.bonus ?? "true"
            data.backpay = data.backpay ?? "true"
            data.subsidy = data.subsidy ?? "true"
          await this.settingRepository.create(data);
        }

    }
}

export { CreateSettingUseCase }