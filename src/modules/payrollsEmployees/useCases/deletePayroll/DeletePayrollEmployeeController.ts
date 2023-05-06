import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePayrollEmployeeUseCase } from "./DeletePayrollEmployeeUseCase";


class DeletePayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const id = request.params.id
        const { year, month } = request.body

        const deletePayrollUseCase = container.resolve(DeletePayrollEmployeeUseCase);

        const PayrollEmployee = await deletePayrollUseCase.execute(id, year, month, user_id)

      return response.status(200).json(PayrollEmployee);
    }
}

export { DeletePayrollEmployeeController }