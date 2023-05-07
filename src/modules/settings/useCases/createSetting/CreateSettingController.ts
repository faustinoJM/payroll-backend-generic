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
          company_address2,
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
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          payroll_syndicate_tax,
          payroll_inss_employee_tax,
          payroll_inss_company_tax,
          column_position_name,
          column_departament_name,
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
          flag,
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
          company_address2,
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
          payroll_month_total_workdays,
          payroll_day_total_workhours,
          payroll_syndicate_tax,
          payroll_inss_employee_tax,
          payroll_inss_company_tax,
          column_position_name,
          column_departament_name,
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
          flag,
         })

        return response.status(201).send();
    }
}

export { CreateSettingController }


