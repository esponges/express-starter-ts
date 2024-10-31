import { IUser } from '../types/user.types';
import { Store } from './store';

export const db = {
  users: new Store<IUser>(),
};
