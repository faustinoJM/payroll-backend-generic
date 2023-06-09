import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePositionUseCase } from "./UpdatePositionUseCase";

class UpdatePositionController {
  async handle(request: Request, response: Response) {
    const {name, description} = request.body;
    const id = request.params.id;

    const updatePositionUseCase = container.resolve(UpdatePositionUseCase)

    const position = await updatePositionUseCase.execute({id, name, description})

    return response.status(204).json(position)
  }
}


export { UpdatePositionController }