import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IEmployeesRepository } from "../../../employees/repositories/IEmployeesRepository";
import IPositionsRepository from "../../../positions/repositories/IPositionsRepository";
import IDepartmentsRepository from "../../../departments/repositories/IDepartmentsRepository";
import ISettingRepository from "../../../settings/repositories/ISettingRepository";
import ICompanyRepository from "../../../company/repositories/ICompanyRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IPayrollRepository } from "../../../payrolls/repositories/IPayrollRepository";
import { IPayrollEmployeeRepository } from "../../repositories/IPayrollEmployeeRepository";
import { ICreatePayrollEmployeeDTO } from "../../dtos/ICreatePayrollEmployeeDTO";

export interface ISalario {
  salarioLiquido?: number;
  coeficiente: number;
  limiteNTributavel: number ;
  AResult?: number;
  AxB?: number;
  valorReter?: number;
  impostoPagarIRPS?: number;
}

export interface IPayrollDemo {
  overtime50?: number;
  overtime100?: number;
  month_total_workdays?: number;
  day_total_workhours?: number;
  totalAbsences?: number;
  cash_advances?: number;
  backpay?: number;
  bonus?: number;
  salary_liquid?: number;
  IRPS?: number;
  INSS?: number
}

@injectable()
class CreatePayrollEmployeeUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,

        @inject("PayrollEmployeeRepository")
        private payrollEmployeeRepository: IPayrollEmployeeRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
      
        @inject("EmployeesRepository")
        private employeeRepository: IEmployeesRepository,
        
        @inject("PositionsRepository")
        private positionsRepository: IPositionsRepository,

        @inject("DepartmentsRepository")
        private departmentsRepository: IDepartmentsRepository,

        @inject("SettingsRepository")
        private settingsRepository: ISettingRepository
        ) {}

    async execute(payroll_id: string, month: string, year: number, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const listEmployeesPayrolls: ICreatePayrollEmployeeDTO[] = [];
        // let employeePayroll: ICreatePayrollTO = {}
        const employees = await this.employeeRepository.list(user.company_id);
        const positions = await this.positionsRepository.list(user.company_id)
        const departments = await this.departmentsRepository.list(user.company_id)
        const settings = await this.settingsRepository.list(user.company_id,)
        const payrollYearMonth = await this.payrollRepository.findAllByYearAndByMonth(+year!, month!, user.company_id)
        // const payrollYearMonth = await this.payrollRepository.list(user.company_id)

        // const AlreadyYearMonth = payrollYearMonth.find((data) => ((data.month === month) && (data.year === +year)))
        
       console.log("spdsp", payrollYearMonth)
        // if(AlreadyYearMonth) 
        if(payrollYearMonth) {
          throw new AppError("O mes ja esta Pago")
        }

        if(employees.length <= 0) {
          throw new AppError("Employees Doesn't Exists");
        }

        const payrollCreated = await this.payrollRepository.create({month, year, company_id: user.company_id})

        //initial values
        const overtime50 = 0;
        const overtime100 = 0;
        const absences = 0;
        const cash_advances = 0;
        const backpay = 0;
        const bonus = 0;
        const month_total_workdays = settings?.payroll_month_total_workdays ?? 30;
        const day_total_workhours = settings?.payroll_day_total_workhours ?? 8;
        const syndicate_tax = settings?.payroll_syndicate_tax ?? 1;
       

        console.log("150", month_total_workdays)
        console.log("151", day_total_workhours)

        function positionName(positionId: string) {
          return positions.find((position) => position.id === positionId)
        }

        function departmentName(departmentId: string) {
          return departments.find((department) => department.id === departmentId)
        }

        employees.map((employee) =>{
          let base_day = +calcSalarioEmDias(+month_total_workdays!, +employee.salary).toFixed(2)
          let base_hour = +calcSalarioPorHora(base_day, +day_total_workhours!).toFixed(2)
          let total_overtime = calcTotalHorasExtras(base_hour, overtime50!, overtime100!)
          let total_absences = calcTotalFaltas(absences!, base_day)
          let total_subsidio = ((+employee.subsidy)! + (+employee.subsidy_transport) + (+employee.subsidy_food) + (+employee.subsidy_residence) + 
                            (+employee.subsidy_medical) + (+employee.subsidy_vacation))
          let total_income = +calcTotalSalarioBruto(+employee.salary, total_overtime!, total_absences, +backpay!, +bonus, total_subsidio, +employee.salary_thirteenth).toFixed(2)
          let IRPS = retornarIRPS(+total_income!, employee.dependents) 
          let INSS_Employee = retornarINSS(+total_income!, employee.inss_status)
          let INSS_Company = retornarINSS_Company(total_income)
          let syndicate_employee = retornarSyndicate_Tax(total_income, syndicate_tax, employee.syndicate_status)
          let salary_liquid = calcularSalarioLiquido(+total_income!, IRPS, INSS_Employee, +cash_advances!, syndicate_employee)
          
         let employeePayroll: ICreatePayrollEmployeeDTO = {
            payroll_id: payrollCreated.id, //payroll_id ?? payrollCreated.id,
            employee_id: employee.id,
            company_id: user.company_id,
            employee_name: employee.name,
            dependents: employee.dependents,
            position_name: positionName(employee.position_id!)?.name,
            department_name: departmentName(employee.department_id!)?.name,
            bank_name: employee.bank_name,
            bank_account: employee.bank_account,
            nib: employee.nib,
            social_security: employee.social_security,
            nuit: employee.nuit,
            salary_base: employee.salary, 
            salary_liquid: salary_liquid as any,
            month: month,
            year: year,
            total_income: total_income  as any,
            overtime50,
            overtime100,
            total_overtime: total_overtime as any,
            month_total_workdays: month_total_workdays as any,
            day_total_workhours: day_total_workhours as any,
            base_day: base_day as any,
            base_hour: base_hour as any,
            absences,
            total_absences: total_absences as any,
            cash_advances: cash_advances as any,
            subsidy: employee.subsidy ?? 0,
            bonus: bonus as any,
            backpay: backpay as any,
            irps: IRPS as any,
            inss_employee: INSS_Employee as any,
            inss_company: INSS_Company as any,
            total_inss: (INSS_Employee + INSS_Company) as any,
            syndicate_employee: syndicate_employee as any,
            subsidy_transport: employee.subsidy_transport ?? 0,
            subsidy_food: employee.subsidy_food ?? 0,
            subsidy_residence: employee.subsidy_residence ?? 0,
            subsidy_medical: employee.subsidy_medical ?? 0,
            subsidy_vacation: employee.subsidy_vacation ?? 0,
            salary_thirteenth: employee.salary_thirteenth ?? 0,
            tabelaSalario: retornarTabela(+total_income!, employee.dependents),
            payrollDemo: retornarPayrollDemo(+employee.salary, overtime50,
              overtime100, +month_total_workdays, +day_total_workhours, absences,
              +cash_advances!, +backpay!, bonus, +total_income!, +IRPS!, +INSS_Employee!)

          };

          this.payrollEmployeeRepository.create(employeePayroll).then().
          catch((err) => console.log(err))
          listEmployeesPayrolls.push(employeePayroll)
          //salvar no banco de dados
        })

        return listEmployeesPayrolls
    }
}

function calcularSalario(salary: number, dependents: number) {
  let coeficiente = CalcCoeficiente(salary)
  let limiteNTributavel = CalcLimiteNaoTributavel(salary)
  let AResult = salary - limiteNTributavel!
  let AxB = AResult * coeficiente!
  let valorReter = CalcValorReter(limiteNTributavel!, dependents)
  let impostoPagarIRPS = calcImpostoPagarIRPS(AxB, valorReter!)
  let salarioLiquido = salary - impostoPagarIRPS - (salary * 0.03)
  
  return salarioLiquido;
}

function retornarTabela(salary: number, dependents: number) {
  let coeficiente = CalcCoeficiente(salary)
  let limiteNTributavel = CalcLimiteNaoTributavel(salary)
  let AResult = salary - limiteNTributavel!
  let AxB = AResult * coeficiente!
  let valorReter = CalcValorReter(limiteNTributavel!, dependents)
  let impostoPagarIRPS = calcImpostoPagarIRPS(AxB, valorReter!)
  let salarioLiquido = calcularSalario(salary, impostoPagarIRPS)

  const salario: ISalario = {
    coeficiente:  coeficiente!,
    limiteNTributavel: limiteNTributavel!,
    AResult: AResult,
    AxB: AxB,
    valorReter: valorReter!,
    impostoPagarIRPS: impostoPagarIRPS,
    salarioLiquido: salarioLiquido

  }
  
  return salario;
}

function retornarIRPS(salary: number, dependents: number) {
  let coeficiente = CalcCoeficiente(salary)
  let limiteNTributavel = CalcLimiteNaoTributavel(salary)
  let AResult = salary - limiteNTributavel!
  let AxB = AResult * coeficiente!
  let valorReter = CalcValorReter(limiteNTributavel!, dependents)
  let impostoPagarIRPS = calcImpostoPagarIRPS(AxB, valorReter!)
  
  return impostoPagarIRPS;
}
function retornarINSS(salary: number, inss_status: string) {
  return inss_status ==="true" ? salary * 0.03 : 0;
}

function retornarINSS_Company(salary: number) {
  return salary * 0.04;
}

function retornarSyndicate_Tax(salary: number, syndicate_tax: number, syndicate_status: string) {
  syndicate_tax = syndicate_tax / 100;

  return syndicate_status === "true" ? salary * syndicate_tax : 0
}

function retornarPayrollDemo(salary_base: number,  overtime50?: number,
  overtime100?: number,
  month_total_workdays?: number,
  day_total_workhours?: number,
  totalAbsences?: number,
  cash_advances?: number,
  backpay?: number,
  bonus?: number,
  salary_liquid?: number,
  IRPS?: number,
  INSS?: number) {
  let daySalary = calcSalarioEmDias(month_total_workdays!, salary_base)
  let hourSalary = calcSalarioPorHora(daySalary, day_total_workhours!)
  overtime50 = calcTotalHoraExtra50(hourSalary, overtime50!)
  overtime100 = calcTotalHoraExtra100(hourSalary, overtime100!)
  totalAbsences = calcTotalFaltas(totalAbsences!, daySalary)
  cash_advances = cash_advances
  let totalSalario = +calcTotalSalarioBruto(salary_base, overtime100 + overtime50 , totalAbsences, backpay!, bonus!, 0, 0).toFixed(2)
  salary_liquid = calcularSalario(totalSalario, IRPS!)
  backpay = backpay
  bonus = bonus
  // IRPS = IRPS

  const salario: IPayrollDemo = {
    overtime50,
    overtime100,
    month_total_workdays,
    day_total_workhours,
    totalAbsences,
    cash_advances,
    backpay,
    bonus,
    salary_liquid,
    IRPS,
    INSS

  }
  
  return salario;
}

function CalcCoeficiente (salary: number) {
  if (salary <= 20249.99) 
    return 0;
  if (salary < 20750)
    return 0.1;
  if (salary < 21000)
    return 0.1;
  if (salary < 21250)
    return 0.1;
  if (salary < 21750)
    return 0.1;
  if (salary < 22250)
    return 0.1;
  if (salary < 32750)
    return 0.15;
  if (salary < 60750)
    return 0.2;
  if (salary < 144750)
    return 0.25;
  if (salary >= 144750)
    return 0.32;
  
   return null
}

function CalcLimiteNaoTributavel(salary: number) {
  if (salary <= 20249.99) 
    return 20249.99;
  if (salary < 20750)
    return 20250;
  if (salary < 21000)
    return 20750;
  if (salary < 21250)
    return 21000;
  if (salary < 21750)
    return 21250;
  if (salary < 22250)
    return 21750;
  if (salary < 32750)
    return 22250;
  if (salary < 60750)
    return 32750;
  if (salary < 144750)
    return 60750;
  if (salary >= 144750)
    return 144750;
  
  return null
}

function CalcValorReter(LimiteNTributavel: number, dependents: number) {
  if (LimiteNTributavel == 20249.99) 
    return 0;
  if (LimiteNTributavel == 20250)
    return 0;
  if (LimiteNTributavel == 20750) {
    if(dependents == 0)
      return 50;
    else 
      return 0
  } 
  if (LimiteNTributavel == 21000) {
    if(dependents == 0)
      return 75;
    if(dependents == 1)
      return 25;
    else 
      return 0;
  }
  if (LimiteNTributavel == 21250) {
    if(dependents == 0)
      return 100;
    if(dependents == 1)
      return 50;
    if(dependents == 2)
      return 25;
    else 
      return 0;
  }
  if (LimiteNTributavel == 21750) {
    if(dependents == 0)
      return 150;
    if(dependents == 1)
      return 100;
    if(dependents == 2)
      return 75;
    if(dependents == 3)
      return 50;
    else 
      return 0;
  }
  if (LimiteNTributavel == 22250) {
    if(dependents == 0)
      return 200;
    if(dependents == 1)
      return 150;
    if(dependents == 2)
      return 125;
    if(dependents == 3)
      return 100;
    if(dependents == 4)
      return 50;
    else 
      return 50;
  }
  if (LimiteNTributavel == 32750) {
    if(dependents == 0)
      return 1775;
    if(dependents == 1)
      return 1725;
    if(dependents == 2)
      return 1700;
    if(dependents == 3)
      return 1675;
    if(dependents == 4)
      return 1625;
    else 
      return 1625;
  }
  if (LimiteNTributavel == 60750) {
    if(dependents == 0)
      return 7375;
    if(dependents == 1)
      return 7325;
    if(dependents == 2)
      return 7300;
    if(dependents == 3)
      return 7275;
    if(dependents == 4)
      return 7225;
    else 
      return 7225;
  }
  if (LimiteNTributavel == 144750) {
    if(dependents == 0)
      return 28375;
    if(dependents == 1)
      return 28325;
    if(dependents == 2)
      return 28300;
    if(dependents == 3)
      return 28275;
    if(dependents == 4)
      return 28225;
    else 
      return 28225;
  }
  return  null
}

function calcImpostoPagarIRPS(axb: number, valorReter: number) {
  return axb + valorReter
}

function calcSalarioEmDias(totalDiasTrabalhoMes: number, salario_base: number) {
  return salario_base / totalDiasTrabalhoMes
}

function calcSalarioPorHora(salarioEmDias: number, totalHorasTrabalhoDia: number) {
  return salarioEmDias / totalHorasTrabalhoDia
}

function calcTotalHoraExtra50(salarioPorHora: number, horasExtras50: number) {
  return  horasExtras50 * salarioPorHora * 1.5
}
function calcTotalHoraExtra100(salarioPorHora: number, horasExtras100: number) {
  return  horasExtras100 * salarioPorHora * 2
}
function calcTotalHorasExtras(salarioPorHora: number, horasExtras50: number, horasExtras100: number) {
  horasExtras50 = horasExtras50 * salarioPorHora * 1.5
  horasExtras100 = horasExtras100 * salarioPorHora * 2
  return horasExtras50 + horasExtras100;
}

function calcTotalFaltas(faltas: number, salarioEmDias: number) {
    return faltas * salarioEmDias
}

function calcTotalSalarioBruto(salario_base: number, totalHorasExtras: number,
   totalDescontoFaltas: number, totalRetroativos: number, bonus: number, total_subsidio: number, salario_decimo_terceiro: number,) {
    
  return salario_base + totalHorasExtras - totalDescontoFaltas + totalRetroativos + bonus + total_subsidio + salario_decimo_terceiro;
}

function calcularSalarioLiquido(totalSalario: number, IRPS: number, INSS_Employee: number, totalAdiantamento: number, syndicate_employee: number) {
  return totalSalario - IRPS - INSS_Employee - totalAdiantamento - syndicate_employee;
}


export { CreatePayrollEmployeeUseCase }

