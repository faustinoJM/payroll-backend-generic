export default interface ICreateSettingDTO {
  id?: string;
  company_name?: string;
  company_telephone?: number;
  company_contact?: number;
  company_email?: string;
  company_website?: string;
  company_fax?: string;
  company_address?: string;
  company_province?: string;
  company_city?: string;
  postal_code?: number
  company_country?: string;
  company_avatar?: string;
  company_logo_name?: string;
  payroll_month_total_workdays?: number;
  payroll_day_total_workhours?: number;
  overtime_status?: string
  absences_status?: string
  cash_advances_status?: string
  bonus_status?: string
  backpay_status?: string
  subsidy_status?: string
  syndicate_status?: string;
  flag?: number;
  user_id?: string;
  company_id?: string;
  payroll_syndicate_tax?: number;
  payroll_inss_employee_tax?: number,
  payroll_inss_company_tax?: number,
}



// "company_name"
// "telephone""contact""email""website""fax""company_address""company_province"
// "company_city""postal_code""company_country"
// "avatar""total_month_workdays""total_day_workhours"