import ICreatePositionDTO from "../dtos/ICreatePositionDTO";
import Position from "../infra/typeorm/entities/Position";

export default interface IPositionsRepository {
  create( data: ICreatePositionDTO): Promise<Position>;
  findByName(name: string, company_id: string): Promise<Position | null>;
  findById(id: string): Promise<Position | null>;
  list(company_id: string): Promise<Position[] | []>;
  listAll(): Promise<Position[] | []>;
  delete(id: string): Promise<void>
}
