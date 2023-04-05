import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPositionUseCase } from "./ListPositionUseCase";

class ListPositionController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const listPositionUseCase = container.resolve(ListPositionUseCase);

        const positions = await listPositionUseCase.execute(user_id)

      return response.json(positions);
    }
}

export { ListPositionController }