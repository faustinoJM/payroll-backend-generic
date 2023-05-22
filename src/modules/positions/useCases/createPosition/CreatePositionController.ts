import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePositionUseCase } from "./CreatePositionUseCase";

class CreatePositionController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;
        const { name, description } = request.body;

        const createPositionUseCase = container.resolve(CreatePositionUseCase);

        await createPositionUseCase.execute({ user_id, name, description })

        return response.status(201).send();
    }
}

export { CreatePositionController }