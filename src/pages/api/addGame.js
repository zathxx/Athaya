import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, genre, releaseDate, rating } = req.body;

    try {
      const newGame = await prisma.game.create({
        data: {
          title,
          genre,
          releaseDate: new Date(releaseDate),
          rating: parseFloat(rating),
        },
      });
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ error: "Gagal euy" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
