import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import ICompanyRepository from "../../../company/repositories/ICompanyRepository";

interface IRquest{
    email: string,
    password: string
}

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  tino: string;
}

interface IResponse{
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
    
    constructor(@inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("UsersTokensRepository") 
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        
        @inject("CompanyRepository")
        private companyRepository: ICompanyRepository) {}

    async execute({ email, password }: IRquest): Promise<IResponse> {
        //Usuario existe
        const user = await this.userRepository.findByEmail(email)

        const { expires_in_token, 
            secret_refresh_token, 
            secret_token, 
            expires_in_refresh_token,
            expires_refresh_token} = auth

        if(!user) {
            throw new AppError("Email or Password incorrect!")
        }

        const company = await this.companyRepository.findById(user.company_id)

        if (!company)
          throw new AppError ("Company Doesnt Exists")

        
        //Senha esta correcta
        const passwordMatch = await compare(password, user.password)
        // console.log(passwordMatch)
        if(!passwordMatch) {
            throw new AppError("Email or Password !")
        }
        //Gerar jsonwebtoken
        const token = sign({company_name: company.company_name, company_id: user.company_id}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token)
       // console.log("Days: "+refresh_token_expires_date)
       
        const refresh_token = sign({ 
          email, 
          company_name: company.company_name ,
          company_id: user.company_id
        }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        await this.usersTokensRepository.create({
            user_id: user.id!,
            expires_date: refresh_token_expires_date,
            refresh_token: refresh_token,
            company_id: user.company_id
        })

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token
        }
        const decode = verify(token, "fc7a28507238c5bebe36e038cae648c5")
        const decode2 = verify(refresh_token, "125c41faf66e2c351bff02def3b22cab")

        console.log("token:", decode)
        console.log("Refresh token:", decode2)

       return tokenReturn;
        // return {user: {name: user.name, email: user.email}, token, refresh_token}
    }
}

export { AuthenticateUserUseCase }