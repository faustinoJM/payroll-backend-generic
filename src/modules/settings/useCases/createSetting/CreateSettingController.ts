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
          company_logo_name,
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          overtime_status,
          absences_status,
          cash_advances_status,
          bonus_status,
          backpay_status,
          syndicate_status,
          subsidy_status, 
          flag,
          payroll_syndicate_tax,
          payroll_inss_employee_tax,
          payroll_inss_company_tax
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
          company_logo_name,
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          overtime_status,
          absences_status,
          cash_advances_status,
          bonus_status,
          backpay_status,
          subsidy_status,flag,
          syndicate_status,
          payroll_syndicate_tax,
          payroll_inss_employee_tax,
          payroll_inss_company_tax
         })

        return response.status(201).send();
    }
}

export { CreateSettingController }


