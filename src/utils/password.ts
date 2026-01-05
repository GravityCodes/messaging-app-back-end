import bcrypt from "bcrypt";
const saltRounds = 10;

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkPassword(password: string, hash: string) {
  try {
    const isPassword = bcrypt.compare(password, hash);

    return isPassword;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
