import { Tuser } from './user.interface';
import { User } from './user.model';

const userRegistration = async (payload: Tuser) => {
  const result = await User.create(payload);

  return result;
};

export const userServices = {
  userRegistration,
};
