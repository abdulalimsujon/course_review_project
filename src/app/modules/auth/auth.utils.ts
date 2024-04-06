import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
export const createToken = (
  Payload: Record<string, unknown>,
  secreate: string,
  expiresIn: string,
) => {
  return Jwt.sign(
    {
      expiresIn,
      Payload,
    },
    secreate,
  );
};
export const comparePassword = async (
  plainText: string,
  hash: string,
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  } catch (error) {
    return false;
  }
};
