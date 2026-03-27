import { prisma } from "../lib/prisma.js";

export class Repository {
  async logMessage(messageContent: string, chatRoomId: number, userId: number) {
    const message = await prisma.message.create({
      data: {
        content: messageContent,
        user: {
          connect: { id: userId }
        },
        chatRoom: {
          connect: { id: chatRoomId }
        },
      }
    });

    return message;
  }
}
