import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const games = await prisma.game.findMany();
  res.status(200).json(games);
}
