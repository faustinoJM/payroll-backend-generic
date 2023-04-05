import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDepartmentUseCase } from "./CreateDepartmentUseCase";

class CreateDepartmentController {

    async handle(request: Request, response: Response) {
        const user_id = request.user.id;
        const { name } = request.body;

        const createDepartmentUseCase = container.resolve(CreateDepartmentUseCase);

        await createDepartmentUseCase.execute({ name, user_id })

        return response.status(201).send();
    }
}

export { CreateDepartmentController }