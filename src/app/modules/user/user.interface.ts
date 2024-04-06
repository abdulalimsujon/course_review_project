import { USER_ROLE } from './user.const';

export type Tuser = {
  username: string;
  email: string;
  password: string;
  role: {
    type: string;
    enum: ['user', 'admin'];
  };
};

export type TUserRole = keyof typeof USER_ROLE;
