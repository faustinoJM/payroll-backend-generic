import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEmployeeUseCase } from "./ListEmployeeUseCase";


class ListEmployeeController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const listEmployeeUseCase = container.resolve(ListEmployeeUseCase);

        const employees = await listEmployeeUseCase.execute(user_id)

      return response.json(employees);
    }
}

export { ListEmployeeController }