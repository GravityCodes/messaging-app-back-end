import { Repository } from "../repositories/message";

export class Service {
  constructor(private repo: Repository) { };

  async logMessage(messageContent: string, chatRoomId: number, userId: number) {
    const message = this.repo.logMessage(messageContent, chatRoomId, userId);

    return message;
  }

}
