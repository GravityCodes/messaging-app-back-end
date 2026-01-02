import { Repository } from "../repositories/user";
import { hashPassword } from "../utils/password";

export class Service {
  constructor(private repo: Repository) {}

  async createUser(userName: string, password: string, email: string) {
    const hashedPassword = await hashPassword(password);

    return this.repo.createUser(userName, email, hashedPassword);
  }
}
