import bcrypt from "bcrypt";

export const generateHash = async (cad: string) => {
  //   const salt = await bcrypt.genSalt();
  const hashedCad = await bcrypt.hash(`${cad}`, 10);
  return hashedCad;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
