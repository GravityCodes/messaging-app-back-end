import bcrypt from "bcrypt";
const saltRounds = 10;

async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { hashPassword };
