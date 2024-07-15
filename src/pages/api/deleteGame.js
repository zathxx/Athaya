// src/pages/api/deleteGame.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const deletedGame = await prisma.game.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(deletedGame);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete game" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
