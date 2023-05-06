import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { companyRouter } from "./company.routes";
import { departmentRouter } from "./department.routes";
import { employeeRouter } from "./employee.routes";
import { payrollRouter } from "./payroll.routes";
import { payrollEmployeeRouter } from "./payrollEmployee.routes";
import { positionRouter } from "./position.routes";
import { settingRouter } from "./setting.routes";
import { userRouter } from "./user.routes";


const routes = Router();

routes.use("/company", companyRouter)
routes.use("/users", userRouter)
routes.use("/employees", employeeRouter)
routes.use("/payroll", payrollRouter)
routes.use("/payrolls", payrollEmployeeRouter)
routes.use("/departments", departmentRouter)
routes.use("/positions", positionRouter)
routes.use("/settings", settingRouter)
routes.use(authenticateRoutes)



export default routes;