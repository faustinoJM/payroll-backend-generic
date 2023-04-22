import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

class CreateEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { employee_id, name, dependents, salary, position_id, department_id, birth_date,
          place_birth,
          nationality,
          bi,
          marital_status,
          gender,
          address,
          contact,
          contact2,
          email,
          nuit,
          vacation,
          subsidy,
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

        await createEmployeeUseCase.execute({user_id, employee_id, name, dependents, salary, position_id, department_id, birth_date,
          place_birth,
          nationality,
          bi,
          marital_status,
          gender,
          address,
          contact,
          contact2,
          email,
          nuit,
          vacation,
          subsidy,
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
