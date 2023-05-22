import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

class CreateEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { employee_number, name, dependents, salary, position_id, department_id, birth_date,
          place_birth,
          nationality,
          bi,
          marital_status,
          gender,
          address,
          contact_1,
          contact_2,
          email,
          nuit,
          vacation,
          subsidy,
          subsidy_transport,
          subsidy_food,
          subsidy_residence,
          subsidy_medical,
          subsidy_vacation,
          salary_thirteenth,
          department,
          position,
          start_date,
          employee_status,
          bank_name,
          bank_account,
          nib,
          social_security,
          syndicate_status, inss_status} = request.body;


        const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

        await createEmployeeUseCase.execute({user_id, employee_number, name, dependents, salary, position_id, department_id, birth_date,
          place_birth,
          nationality,
          bi,
          marital_status,
          gender,
          address,
          contact_1,
          contact_2,
          email,
          nuit,
          vacation,
          subsidy,
          subsidy_transport,
          subsidy_food,
          subsidy_residence,
          subsidy_medical,
          subsidy_vacation,
          salary_thirteenth,
          department,
          position,
          start_date,
          employee_status,
          bank_name,
          bank_account,
          nib,
          social_security,
          syndicate_status, inss_status})

        return response.status(201).send();
    }
}

export { CreateEmployeeController }




