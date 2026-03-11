import bcrypt from "bcrypt";

const saltRounds = 10;

export async function encrypt(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function compare(inputPassword, hashPass) {
  const result = await bcrypt.compare(inputPassword, hashPass);
  return result;
}
