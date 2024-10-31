import { randomUUID } from 'crypto';

export class Store<T extends { id: string }> {
  private data: Map<string, T>;

  constructor() {
    this.data = new Map();
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const id = randomUUID();
    const timestamp = new Date();
    const newItem = {
      ...item,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
    } as unknown as T;

    this.data.set(id, newItem);
    return newItem;
  }

  async findById(id: string): Promise<T | null> {
    const item = this.data.get(id);
    return item || null;
  }

  async find(filter: Partial<T> = {}): Promise<T[]> {
    return Array.from(this.data.values()).filter((item) => {
      return Object.entries(filter).every(([key, value]) => {
        return item[key as keyof T] === value;
      });
    });
  }

  async findOne(filter: Partial<T> = {}): Promise<T | null> {
    const items = await this.find(filter);
    return items[0] || null;
  }

  async update(id: string, updateData: Partial<T>): Promise<T | null> {
    const existingItem = this.data.get(id);
    if (!existingItem) return null;

    const updatedItem = {
      ...existingItem,
      ...updateData,
      id,
      updatedAt: new Date(),
    };

    this.data.set(id, updatedItem);
    return updatedItem;
  }

  async delete(id: string): Promise<T | null> {
    const item = this.data.get(id);
    if (item) {
      this.data.delete(id);
    }
    return item || null;
  }
}
