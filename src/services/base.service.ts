import { Store } from '../db/store';

export abstract class BaseService {
  constructor(protected store: Store<any>) {}

  async findAll(filter = {}) {
    return this.store.find(filter);
  }

  async findById(id: string) {
    return this.store.findById(id);
  }

  async create(data: any) {
    return this.store.create(data);
  }

  async update(id: string, data: any) {
    return this.store.update(id, data);
  }

  async delete(id: string) {
    return this.store.delete(id);
  }
}
