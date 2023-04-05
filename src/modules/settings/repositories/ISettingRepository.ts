import ICreateSettingDTO from "../dtos/ICreateSettingDTO";
import Setting from "../infra/typeorm/entities/Setting";

export default interface ISettingRepository {
  create( data: ICreateSettingDTO): Promise<Setting>;
  findByName(company_name: string, company_id: string): Promise<Setting | null>
  findById(company_id: string): Promise<Setting | null>
  list(company_id: string): Promise<Setting | null>

}
