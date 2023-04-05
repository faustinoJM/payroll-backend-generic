import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSettingUseCase } from "./ListSettingUseCase";


class ListSettingController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;

        const listSettingUseCase = container.resolve(ListSettingUseCase);

        const settings = await listSettingUseCase.execute(user_id)

      return response.json(settings);
    }
}

export { ListSettingController }