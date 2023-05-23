import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSettingUseCase } from "./CreateSettingUseCase";

interface IFiles {
  filename: string;
}

class CreateSettingController {

    async handle(request: Request, response: Response) {
      const user_id = request.user?.id;

      const logo = request.files as IFiles[]

        const { 
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
          payroll_inss_employee_tax,
          payroll_inss_company_tax,
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
        } = request.body;

        const filename = logo ? logo.map((file) => file.filename) : []

        console.log("877945",filename)


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
          payroll_inss_employee_tax,
          payroll_inss_company_tax,
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
          company_logo_multer: filename
         })

        return response.status(201).send();
    }
}

export { CreateSettingController }


