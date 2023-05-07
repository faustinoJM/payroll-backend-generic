import { inject, injectable } from "tsyringe";
import AppError  from "../../../../shared/errors/AppError";
import { IPayrollRepository } from "../../repositories/IPayrollRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";



@injectable()
class DeletePayrollUseCase {

    constructor(@inject("PayrollRepository")
        private payrollRepository: IPayrollRepository,
    
        @inject("UsersRepository")
        private userRepository: IUsersRepository,) {}

    async execute(id: string, year: number, month: string, user_id: string) {
        const user = await this.userRepository.findById(user_id as any)

        if (!user) {
          throw new  AppError("User Auth doesn't Exists")
        }

        const payrollExists = await this.payrollRepository.findById(id, user.company_id);

        if (!payrollExists)
          throw new AppError("Payroll doesn't exists")

        const payroll = await this.payrollRepository.findById(id, user.company_id);

        // const payroll = await this.payrollRepository.findAllByYearAndByMonth(year, month, user.company_id);
        // console.log(payroll)
        // if (payroll?.length! <= 0) {
        //   throw new AppError("Payroll doesn't exists")
        // }

        // await this.payrollRepository.deleteAllByYearAndMonth(year, month, user.company_id)
        await this.payrollRepository.delete(id)

        return payroll;
    }
}

export { DeletePayrollUseCase }