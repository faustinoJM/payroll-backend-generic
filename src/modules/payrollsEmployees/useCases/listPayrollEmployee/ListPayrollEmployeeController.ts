import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPayrollEmployeeUseCase } from "./ListPayrollEmployeeUseCase";


class ListPayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const id = request.params.id || request.body
        console.log(id)

        const listPayrollEmployeeUseCase = container.resolve(ListPayrollEmployeeUseCase);

        const payrollEmployee = await listPayrollEmployeeUseCase.execute(id, user_id)

      return response.json(payrollEmployee);
    }
}

export { ListPayrollEmployeeController }