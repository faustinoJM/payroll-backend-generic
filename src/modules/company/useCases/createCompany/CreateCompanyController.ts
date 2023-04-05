import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

class CreateCompanyController {

    async handle(request: Request, response: Response) {
        const { 
          company_name, 
          company_contact,
          company_email,
          company_address,
          company_city,
          company_province,
        } = request.body;


        const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

        await createCompanyUseCase.execute({ 
          company_name, 
          company_contact,
          company_email,
          company_address,
          company_province,
          company_city,
         })

        return response.status(201).send();
    }
}

export { CreateCompanyController }


