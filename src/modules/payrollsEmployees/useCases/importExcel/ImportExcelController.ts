import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportExcelUseCase } from "./ImportExcelUseCase";


class ImportExcelController {

    async handle(request: Request, response: Response) {
        const user_id = request.user?.id;
        const data = request.body


        const importExcelUseCase = container.resolve(ImportExcelUseCase);

        const payroll = await importExcelUseCase.execute(user_id, data)

      return response.status(201).json("mau");
    }
}

export { ImportExcelController }


  