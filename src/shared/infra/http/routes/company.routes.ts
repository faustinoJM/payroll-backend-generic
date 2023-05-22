import { Router } from "express";
import { CreateCompanyController } from "../../../../modules/company/useCases/createCompany/CreateCompanyController";
import { CreateuserAndCompanyController } from "../../../../modules/company/useCases/createUserAndCompany/CreateuserAndCompanyController";
import { DeleteCompanyController } from "../../../../modules/company/useCases/deleteCompany/DeleteCompanyController";
import { ListCompanyController } from "../../../../modules/company/useCases/listCompany/ListCompanyController";
import { UpdateCompanyController } from "../../../../modules/company/useCases/updateCompany/UpdateCompanyController";

const companyRouter = Router();
const createCompanyController = new CreateCompanyController();
const listCompanyController = new ListCompanyController()
const deleteCompanyController = new DeleteCompanyController()
const updateCompanyController = new UpdateCompanyController()
const createuserAndCompanyController = new CreateuserAndCompanyController()


companyRouter.post("/", createCompanyController.handle);
companyRouter.get('/', listCompanyController.handle)
companyRouter.delete("/:id", deleteCompanyController.handle);
companyRouter.put("/:id", updateCompanyController.handle)
companyRouter.post("/user-company", createuserAndCompanyController.handle)





export { companyRouter };
