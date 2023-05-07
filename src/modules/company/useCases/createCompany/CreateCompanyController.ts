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
          company_address2,
          company_street,
          company_city,
          company_province,
          company_nuit,
          company_bank_name,
          company_bank_account,
        } = request.body;


        const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

        await createCompanyUseCase.execute({ 
          company_name, 
          company_contact,
          company_email,
          company_address,
          company_address2,
          company_street,
          company_city,
          company_province,
          company_nuit,
          company_bank_name,
          company_bank_account,
         })

        return response.status(201).send();
    }
}

export { CreateCompanyController }


