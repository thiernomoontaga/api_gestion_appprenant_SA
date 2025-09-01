export default interface IModuleService<T, CreateDTO = T, UpdateDTO = Partial<T>> {

  create(data: CreateDTO): Promise<T>;

  update(id: number, data: UpdateDTO): Promise<T>;

  delete(id: number): Promise<void>;

  findById(id: number): Promise<T | null>;

  findAll(): Promise<T[]>;
}
