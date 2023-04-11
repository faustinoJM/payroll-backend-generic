import { Request, Response } from "express";
import { container } from "tsyringe";
import { OutputAllUseCase } from "./OutputAllUseCase";


class OutputAllController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const { year, month } = request.body

        const outputAllUseCase = container.resolve(OutputAllUseCase);

        const payrolls = await outputAllUseCase.execute(year, month)

        return response.json(payrolls);
    }
}

export { OutputAllController }