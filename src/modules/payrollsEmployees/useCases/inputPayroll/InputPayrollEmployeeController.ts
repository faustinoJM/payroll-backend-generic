import { Request, Response } from "express";
import { container } from "tsyringe";
import { InputPayrollEmployeeUseCase } from "./InputPayrollEmployeeUseCase";

class InputPayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { 
          overtime50, 
          overtime100,
          absences, 
          month_total_workdays, 
          day_total_workhours,
          cash_advances,
          backpay,
          bonus,
          subsidy,
          subsidy_transport,
          subsidy_food,
          subsidy_residence,
          subsidy_medical,
          subsidy_vacation,
          salary_thirteenth,
          syndicate_employee} = request.body;
          const id = request.params.id;


        const inputPayrollUseCase = container.resolve(InputPayrollEmployeeUseCase);

        const payrolls = await inputPayrollUseCase.execute({ 
          id,
          user_id,
          overtime50, 
          overtime100,
          absences,
          month_total_workdays, 
          day_total_workhours,
          cash_advances,
          backpay,
          bonus,
          subsidy,
          subsidy_transport,
          subsidy_food,
          subsidy_residence,
          subsidy_medical,
          subsidy_vacation,
          salary_thirteenth,
          syndicate_employee})

        return response.json(payrolls);
    }
}

export { InputPayrollEmployeeController }