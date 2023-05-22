import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDepartmentUseCase } from "./CreateDepartmentUseCase";

class CreateDepartmentController {

    async handle(request: Request, response: Response) {
        const user_id = request.user.id;
        const { name, description } = request.body;

        const createDepartmentUseCase = container.resolve(CreateDepartmentUseCase);

        await createDepartmentUseCase.execute({ name, description, user_id })

        return response.status(201).send();
    }
}

export { CreateDepartmentController }