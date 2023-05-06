import { Router } from "express";
import { CreatePayrollEmployeeController } from "../../../../modules/payrollsEmployees/useCases/createPayroll/CreatePayrollEmployeeController";
import { DeletePayrollEmployeeController } from "../../../../modules/payrollsEmployees/useCases/deletePayroll/DeletePayrollEmployeeController";
import { ImportExcelController } from "../../../../modules/payrollsEmployees/useCases/importExcel/ImportExcelController";
import { InputPayrollEmployeeController } from "../../../../modules/payrollsEmployees/useCases/inputPayroll/InputPayrollEmployeeController";
import { OutputAllController } from "../../../../modules/payrollsEmployees/useCases/listAllSAP/OutputAllController";
import { ListInputPayrollEmployeeController } from "../../../../modules/payrollsEmployees/useCases/ListInputPayroll/ListInputPayrollEmployeeController";
import { OutputPayrollEmployeeController } from "../../../../modules/payrollsEmployees/useCases/ListOutputPayroll/OutputPayrollEmployeeController";
import { SinglePayrollEmployeeController } from "../../../../modules/payrollsEmployees/useCases/singlePayroll/SinglePayrollEmployeeController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const payrollEmployeeRouter = Router();
const createPayrollController = new CreatePayrollEmployeeController();
const listInputPayrollController = new ListInputPayrollEmployeeController()
const outputPayrollController = new OutputPayrollEmployeeController();
const inputPayrollController = new InputPayrollEmployeeController();
const singlePayrollController = new SinglePayrollEmployeeController()
const deletePayrollController = new DeletePayrollEmployeeController()
const importExcelController = new ImportExcelController()
const outputAllController = new OutputAllController()

payrollEmployeeRouter.get("/all", outputAllController.handle);
payrollEmployeeRouter.use(ensureAuthenticated)


payrollEmployeeRouter.post("/", createPayrollController.handle);
payrollEmployeeRouter.get("/", outputPayrollController.handle);
payrollEmployeeRouter.get("/input", listInputPayrollController.handle);
payrollEmployeeRouter.get("/:id", singlePayrollController.handle);
payrollEmployeeRouter.put("/:id", inputPayrollController.handle);
payrollEmployeeRouter.delete("/", deletePayrollController.handle)
payrollEmployeeRouter.post("/excel/import", importExcelController.handle)







export { payrollEmployeeRouter };
