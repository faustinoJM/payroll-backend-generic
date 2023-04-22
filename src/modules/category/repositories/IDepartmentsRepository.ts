import ICreateDepartmentDTO from "../dtos/ICreateDepartmentDTO";
import Department from "../infra/typeorm/entities/Department";

export default interface IDepartmentsRepository {
  create( data: ICreateDepartmentDTO): Promise<Department>;
  findByName(name: string, company_id: string): Promise<Department | null>;
  findById(id: string): Promise<Department | null>;
  list(company_id: string): Promise<Department[] | []>;
  listAll(): Promise<Department[] | []>;
  delete(id: string): Promise<void>
}
