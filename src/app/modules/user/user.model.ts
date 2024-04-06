import { model } from 'mongoose';
import { Tuser } from './user.interface';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const userModelSchema = new Schema<Tuser>(
  {
    username: String,
    password: String,
    email: String,
    role: {
      type: String,

      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// -----------------pre save middleware:hooks-------------------------------->

userModelSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook we save our data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, 10);

  next();
});

export const User = model<Tuser>('user', userModelSchema);
