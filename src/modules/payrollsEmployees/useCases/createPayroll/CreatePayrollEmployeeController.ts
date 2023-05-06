import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePayrollEmployeeUseCase } from "./CreatePayrollEmployeeUseCase";

class CreatePayrollEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const {id, month, year,} = request.body;

        const createPayrollUseCase = container.resolve(CreatePayrollEmployeeUseCase);

        const payrolls = await createPayrollUseCase.execute(
                id,
                month,
                year,
                user_id,
                )

        return response.status(201).json(payrolls);
    }
}

export { CreatePayrollEmployeeController }