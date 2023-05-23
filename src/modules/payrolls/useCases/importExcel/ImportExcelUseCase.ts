import { container, inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { response } from "express";
import { CreatePositionUseCase } from "../../../positions/useCases/createPosition/CreatePositionUseCase";
import { CreateEmployeeUseCase } from "../../../employees/useCases/createEmployee/CreateEmployeeUseCase";

interface ICreatePayrollDTO2 {
  id?: string;
  employee_id?: string;
  employee_number?: number;
  employee_name?: string;
  dependents?: number;
  position_name?: string;
  department_name?: string;
  nib?: number,
  nuit?: number,
  social_security?: number,
  vacation?: number,
  salary_base?: string;
  salary_liquid?: string;
  month?: string;
  year?: number;
  overtime50?: number;
  overtime100?: number;
  totalOvertime50?: number;
  totalOvertime100?: number;
  total_overtime?: string;
  month_total_workdays?: number;
  day_total_workhours?: number;
  base_day?: string;
  base_hour?: string;
  absences?: number;
  total_absences?: string;
  cash_advances?: string;
  backpay?: string;
  subsidy?: string;
  bonus?: string;
  irps?:  string;
  inss?: string;
  inss_employee?: string;
  inss_company?: string;
  total_income?: string;

}
interface ICreateEmployeeDTO {
  id?: string;
  employee_id?: number;
  name: string;
  salary: string;
  dependents: number;
  position_id?: string;
  department_id?: string; 
  birth_date?: Date;
  place_birth?: string;
  nationality?:  string;
  bi: string;
  marital_status?: string;
  gender?: string;
  address?: string;
  contact?:  number;
  contact2?: number;
  email?: string;
  nuit?: number;
  vacation?: number;
  subsidy?:  string;
  department?: string;
  position?: string;
  start_date?: Date;
  employee_status?: string;
  bank_name?: string;
  bank_account?: number;
  nib?: number;
  social_security?: number;
  user_id?: string;
  company_id?: string;
  syndicate_status?: string;
  inss_status?: string
}


interface INameBi {
  name: string;
  bi: string;
}



@injectable()
class ImportExcelUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
      
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("PositionsRepository")
        private positionsRepository: IPositionsRepository,

        @inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository) {}

    async execute(user_id: string, data: any) {
        const user = await this.userRepository.findById(user_id as any)
        const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);


        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const departments = await this.departmentsRepository.list(user.company_id)
        const positions = await this.positionsRepository.list(user.company_id)
        const employees = await this.employeeRepository.list(user.company_id)

        const employee: any = {};
        const dataDepart: string[] = []
        const dataPosition: string[] = []
        const dataEmployee: ICreateEmployeeDTO[] = []
        const dataEmployeeNameBi: string[] = []
        const dataEmployeeBi: string[] = []

        
        data.map((d: any, index: any)=> {
          Object.entries(keyToPropMap).forEach(([key, prop]) => {
            if (d[key] !== undefined) {
              if(prop === "birth_date" || prop === "start_date")
                  employee[prop] = new Date(Date.UTC(0, 0, d[key] - 1))  
              else
                  employee[prop] = d[key];           
            }
          });

            const findPosition = dataPosition.find((name) => name === employee["position_id"])
            if (!findPosition)
              dataPosition.push(employee["position_id"])

            const findDepartment = dataDepart.find((name) => name === employee["department_id"])
            if (!findDepartment) 
              dataDepart.push(employee["department_id"])

            // const findEmployee = dataEmployee.find((data) => (data.name === Object.values(d)[0]) && (data.bi === Object.values(d)[2]))
            // if (!findEmployee) 
            //   dataEmployee.push(employee)
            // else
            //   console.log("findEmployee")
        })
        
      for(let i = 0; i < dataPosition.length; i++) {
        let findPosition = positions.find(position => position.name === dataPosition[i])

        if (!findPosition)
          await this.positionsRepository.create({name: dataPosition[i], company_id: user.company_id})
        // console.log(i, dataPosition[i])
      }

      for(let i = 0; i < dataDepart.length; i++) {
        let findDepartment = departments.find(department => department.name === dataDepart[i])

        if (!findDepartment)
          await this.departmentsRepository.create({name: dataDepart[i], company_id: user.company_id})
        // console.log(i, dataPosition[i])
      }

      // for(let i = 0; i < dataEmployeeName.length; i++) {
        
      //   console.log(i, dataEmployeeName[i])
      // }
      
      const departments2 = await this.departmentsRepository.list(user.company_id)
      const positions2 = await this.positionsRepository.list(user.company_id)

      data.map(async (d: any)=> {
        Object.entries(keyToPropMap).forEach(([key, prop]) => {
          if (d[key] !== undefined) {
            if(prop === "birth_date" || prop === "start_date")
                employee[prop] = new Date(Date.UTC(0, 0, d[key] - 1))  
            else
                employee[prop] = d[key];           
          }
        });

        // const findEmployee = dataEmployee.find((data) => (data.name === Object.values(d)[0]) && (data.bi === Object.values(d)[2]))
        const findEmployeeByNameBi = dataEmployeeNameBi.find((name) => {
          let [nome, bi] = name.split("/");
          return (nome === Object.values(d)[0]) && (bi ===Object.values(d)[2])
        })

          dataEmployeeNameBi.push(`${Object.values(d)[0] as any}/${Object.values(d)[2] as any}`)

        if (!findEmployeeByNameBi) {
          // let employeeRepo = employees.find(employee => (employee.name === Object.values(d)[0]) && (employee.bi === Object.values(d)[2]))
          let employeeRepo = employees.find(employee => (employee.name === Object.values(d)[0]) && (employee.bi === Object.values(d)[2]))

          if (!employeeRepo){
            let positionId = positions2.find(position => position.name === employee["position_id"])
            let departmentId = departments2.find(department => department.name === employee["department_id"])
            
            if (positionId && departmentId) {
            employee["position_id"] = positionId.id
            employee["department_id"] = departmentId.id
            employee.company_id = user.company_id 
            employee.inss_status = employee.inss_status ?? "true";
            employee.syndicate_status = employee.syndicate_status ?? "false";
            try {
              await this.employeeRepository.create(employee)
            } catch(err){
              console.log(err)
            }
            
            }
          // console.log(i, dataPosition[i])
          } else {
            // console.log(employeeRepo)
            let positionId = positions2.find(position => position.name === employee["position_id"])
            let departmentId = departments2.find(department => department.name === employee["department_id"])
            
            if (positionId && departmentId) {
            employee.id = employeeRepo.id;
            employee["position_id"] = positionId.id;
            employee["department_id"] = departmentId.id;
            employee.company_id = user.company_id ;
            employee.inss_status = employee.inss_status ?? "true";
            employee.syndicate_status = employee.syndicate_status ?? "false";
            try {
              await this.employeeRepository.create(employee)
            } catch(err){
              console.log(err)
            }
            
            }
          }
        }
      })

       
      //  return true
    }
}

export { ImportExcelUseCase }


const keyToPropMap = {
  "Nome": "name",
  "Dependentes": "dependents",
  "Salario Base": "salary",
  "Cargo": "position_id",
  "Departamento": "department_id",
  "Data de Nascimento": "birth_date",
  "Naturalidade": "place_birth",
  "Nacionalidade": "nationality",
  "Numero de BI": "bi",
  "Estado Civil": "marital_status",
  "Sexo": "gender",
  "Residencia": "address",
  "Contacto1": "contact",
  "Contacto2": "contact2",
  "Email": "email",
  "NUIT": "nuit",
  "Subsidio": "subsidy",
  "Data de Inicio": "start_date",
  "Estado do Funcionario": "employee_status",
  "Nome do Banco": "bank_name",
  "Numero da Conta": "bank_account",
  "NIB": "nib",
  "Numero de Seg. Social": "social_security"
};
