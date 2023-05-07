import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCompanyUseCase } from "./DeleteCompanyUseCase";

class DeleteCompanyController {

    async handle(request: Request, response: Response) {
        const id = request.params.id;
        
        const deleteCompanyUseCase = container.resolve(DeleteCompanyUseCase);

        const department = await deleteCompanyUseCase.execute(id)

      return response.json(department);
    }
}

export { DeleteCompanyController }