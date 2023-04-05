import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePositionUseCase } from "./CreatePositionUseCase";

class CreatePositionController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;
        const { name } = request.body;

        const createPositionUseCase = container.resolve(CreatePositionUseCase);

        await createPositionUseCase.execute({ user_id, name })

        return response.status(201).send();
    }
}

export { CreatePositionController }