import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import ICreatePositionDTO from '../../../dtos/ICreatePositionDTO';
import IPositionsRepository from '../../../repositories/IPositionsRepository';
import Position from '../entities/Position';


class PositionsRepository implements IPositionsRepository {
  private ormRepository: Repository<Position>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(Position);
  }
  
  public async create({ id, company_id, position_number, name, description }: ICreatePositionDTO): Promise<Position> {

      const position = this.ormRepository.create({
        id,
        company_id,
        position_number,
        name,
        description
        
      })

      await this.ormRepository.save(position);

      return position;
  }

  public async findByName(name: string, company_id: string): Promise<Position | null> {
       const findPosition = await this.ormRepository.findOne({
      where: { name, company_id }
    });

    return findPosition;
  }

  public async findById(id: string): Promise<Position | null> {
    const findPosition = await this.ormRepository.findOne({
   where: { id }
 });

 return findPosition;
}

  async list(company_id: string): Promise<Position[] | []> {
    const list = await this.ormRepository.find({
      where: { company_id }
    });

        return list;
  }

  async listAll(): Promise<Position[] | []> {
    const list = await this.ormRepository.find();

        return list;
  }

  async delete(id: string) {
    await this.ormRepository.delete(id)
  }
}

export default PositionsRepository
