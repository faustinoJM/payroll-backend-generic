import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDepartmentUseCase } from "./ListDepartmentUseCase";

class ListDepartmentController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const listDepartmentUseCase = container.resolve(ListDepartmentUseCase);

        const departments = await listDepartmentUseCase.execute(user_id)

      return response.json(departments);
    }
}

export { ListDepartmentController }