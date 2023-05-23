import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import AppError  from "../../../../shared/errors/AppError";
import ISettingRepository from "../../repositories/ISettingRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";


@injectable()
class ListSettingUseCase {

    constructor(@inject("SettingsRepository")
        private settingsRepository: ISettingRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        ) {}
       
    async execute(user_id: string) {
        const user  = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new AppError("User Auth doesn't Exists")
        }
        const settings = await this.settingsRepository.list(user.company_id);
        
        if (settings)
        settings.companyLogoURL = settings.getCompanyLogoURL()
  
        return settings;

    }
}

export { ListSettingUseCase }

