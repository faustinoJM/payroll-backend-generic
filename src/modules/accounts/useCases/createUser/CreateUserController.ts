import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, password, email, company_id} = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({ name, email, password, company_id })

        return response.status(201).send();
    }
}

export { CreateUserController }