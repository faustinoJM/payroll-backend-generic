import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePayrollUseCase } from "./CreatePayrollUseCase";

class CreatePayrollController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { 
              month,
              year,
              } = request.body;

        const createPayrollUseCase = container.resolve(CreatePayrollUseCase);

        const payrolls = await createPayrollUseCase.execute(
                month,
                year,
                user_id,
                )

        return response.status(201).json(payrolls);
    }
}

export { CreatePayrollController }