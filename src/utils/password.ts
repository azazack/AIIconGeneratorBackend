import { HASHING_SALT_ROUNDS } from '../constants/hashing';
import * as bcrypt from 'bcrypt';

export const passwordHash = async (
  password: string,
  saltRounds = HASHING_SALT_ROUNDS,
): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const checkPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
