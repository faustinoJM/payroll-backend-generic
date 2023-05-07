import { Request, Response } from "express";
import { container } from "tsyringe";
import { SinglePayrollEmployeeUseCase } from "./SinglePayrollEmployeeUseCase";


class SinglePayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const id = request.params.id || request.body
        console.log(id)

        const singlePayrollUseCase = container.resolve(SinglePayrollEmployeeUseCase);

        const payroll = await singlePayrollUseCase.execute(id, user_id)

      return response.json(payroll);
    }
}

export { SinglePayrollEmployeeController }