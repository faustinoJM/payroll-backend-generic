import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserAndCompanyUseCase } from "./CreateUserAndCompanyUseCase";

class CreateuserAndCompanyController {

    async handle(request: Request, response: Response) {
        const { 
          name,
          email,
          password,
          company_name, 
          company_contact,
          company_email,
          company_address,
          company_city,
          company_province,
        } = request.body;


        const createUserAndCompanyUseCase = container.resolve(CreateUserAndCompanyUseCase);

        const company = await createUserAndCompanyUseCase.execute({ 
          name,
          email,
          password,
          company_name, 
          company_contact,
          company_email,
          company_address,
          company_province,
          company_city,
         })

        return response.status(201).json(company);
    }
}

export { CreateuserAndCompanyController }


