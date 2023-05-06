import { Request, Response } from "express";
import { container } from "tsyringe";
import { OutputPayrollEmployeeUseCase } from "./OutputPayrollEmployeeUseCase";


class OutputPayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { year, month } = request.body

        const outputPayrollUseCase = container.resolve(OutputPayrollEmployeeUseCase);

        const payrolls = await outputPayrollUseCase.execute(year, month, user_id)

        return response.json(payrolls);
    }
}

export { OutputPayrollEmployeeController }