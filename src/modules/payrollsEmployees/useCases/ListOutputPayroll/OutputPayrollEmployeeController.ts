import { Request, Response } from "express";
import { container } from "tsyringe";
import { OutputPayrollEmployeeUseCase } from "./OutputPayrollEmployeeUseCase";


class OutputPayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;
        
        const id = request.params.id || request.body
        console.log(id)

        const { year, month } = request.body

        const outputPayrollUseCase = container.resolve(OutputPayrollEmployeeUseCase);

        const payrolls = await outputPayrollUseCase.execute(id, year, month, user_id)

        return response.json(payrolls);
    }
}

export { OutputPayrollEmployeeController }