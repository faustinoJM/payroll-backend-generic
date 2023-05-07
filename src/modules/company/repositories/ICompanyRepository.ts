import ICreateCompanyDTO from "../dtos/ICreateCompanyDTO";
import Company from "../infra/typeorm/entities/Company";


export default interface ICompanyRepository {
  create( data: ICreateCompanyDTO): Promise<Company>;
  findByName(company_name: string): Promise<Company | null>
  findById(id: string): Promise<Company | null>
  list(): Promise<Company[] | null>
  delete(id: string): Promise<void>

}
