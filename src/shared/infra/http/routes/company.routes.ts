import { Router } from "express";
import { CreateCompanyController } from "../../../../modules/company/useCases/createCompany/CreateCompanyController";
import { ListCompanyController } from "../../../../modules/company/useCases/listCompany/ListCompanyController";

const companyRouter = Router();
const createCompanyController = new CreateCompanyController();
const listCompanyController = new ListCompanyController()

companyRouter.post("/", createCompanyController.handle);
companyRouter.get('/', listCompanyController.handle)


export { companyRouter };
