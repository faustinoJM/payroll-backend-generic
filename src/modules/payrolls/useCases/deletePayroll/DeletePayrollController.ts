import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePayrollUseCase } from "./DeletePayrollUseCase";


class DeletePayrollController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        // const id = request.params.id
        const { year, month } = request.body

        const deletePayrollUseCase = container.resolve(DeletePayrollUseCase);

        const employee = await deletePayrollUseCase.execute(year, month, user_id)

      return response.status(200).json(employee);
    }
}

export { DeletePayrollController }