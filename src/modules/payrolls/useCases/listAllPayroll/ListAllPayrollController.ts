import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllPayrollUseCase } from "./ListAllPayrollUseCase";


class ListAllPayrollController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { year, month } = request.body

        const listAllPayrollUseCase = container.resolve(ListAllPayrollUseCase);

        const payrolls = await listAllPayrollUseCase.execute(year, month, user_id)

        return response.json(payrolls);
    }
}

export { ListAllPayrollController }