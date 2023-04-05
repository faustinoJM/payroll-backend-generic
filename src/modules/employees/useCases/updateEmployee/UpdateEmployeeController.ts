import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";

class UpdateEmployeeController {
  async handle(request: Request, response: Response) {
    const user_id = request.user?.id;

    const {employee_id, name, dependents, salary, position_id, department_id, birth_date, 
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
      social_security,} = request.body;
    const id = request.params.id;

    const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase)

    const employee = await updateEmployeeUseCase.execute({id, user_id, employee_id, name, dependents, salary, position_id, department_id, birth_date, 
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
      social_security,})
      // console.log("++++++++", employee)

    return response.status(204).json(employee)
  }
}


export { UpdateEmployeeController }