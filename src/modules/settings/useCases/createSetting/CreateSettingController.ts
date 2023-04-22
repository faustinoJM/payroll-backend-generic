import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSettingUseCase } from "./CreateSettingUseCase";

class CreateSettingController {

    async handle(request: Request, response: Response) {
      const user_id = request.user?.id;

        const { 
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
          payroll_total_workdays_month,
          payroll_total_workhours_day,
          overtime,
          absences,
          cash_advances,
          bonus,
          backpay,
          subsidy, flag,
          syndicate_status,
          syndicate_tax,
          company_logo_name
        } = request.body;


        const createSettingUseCase = container.resolve(CreateSettingUseCase);

        await createSettingUseCase.execute({ 
          user_id,
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
          payroll_total_workdays_month,
          payroll_total_workhours_day,
          overtime,
          absences,
          cash_advances,
          bonus,
          backpay,
          subsidy,flag,
          syndicate_status,
          syndicate_tax,
          company_logo_name
         })

        return response.status(201).send();
    }
}

export { CreateSettingController }


