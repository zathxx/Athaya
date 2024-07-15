const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.game.createMany({
    data: [
      {
        title: "Cyberpunk 2077",
        genre: "Action RPG",
        releaseDate: new Date("2020-12-10"),
        rating: 7.2,
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
